require('dotenv').config();
const Discord = require('discord.js');
const countries = require('./places.json');
const gods = require('./gods.json');

const client = new Discord.Client();
const prefix = '!oracle';

client.once('ready', () => {
    console.log('Oracle started.');
});

client.on('message', message => {
    console.log(message.content);
    if (message.channel.name === 'bug-reports' && !message.author.bot) {
        message.channel.send(`${message.author} thank you, I have brought this matter to the attention of Poseidon of Yucatan`);
    }
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.split(/ +/).slice(1);
    const command = args.shift().toLowerCase();

    switch(command) {
        case 'name-me':
            if (args.length === 2) {
                newNickname = `${args[0]} of ${args[1]}`;
                message.channel.send(`${message.author} from now on you shall be known as ${newNickname}`)
                message.member.setNickname(newNickname);
            }
            break;
        case 'random-name':
            const randomName = `${gods[Math.floor(Math.random() * gods.length)]} of ${countries[Math.floor(Math.random() * countries.length)]}`;
            message.channel.send(`doth thou like the name: ${randomName}?`);
            break;
        case 'maxims':
            message.channel.send(`know thyself.\nNothing to excess.\nSurety brings ruin.`);
            break;
        case 'help':
            message.channel.send(`I :heart: Apollo\n commands:\n \`\`\`name-me [god] [place] \nrandom-name\nmaxims\`\`\``);
            break;
        default:
            message.channel.send(`Dear ${message.author}, you pose the wrong question. ask for !oracle help`);
    }
});

client.login(process.env.TOKEN);