// Required imports
const { Client, GatewayIntentBits } = require('discord.js');
const utils = require('./utils.js');
const config = require('./config.json');

utils.validateConfig();

const botClient = new Client({
	intents: [GatewayIntentBits.Guilds],
});

botClient.on('ready', (data) => {
	console.log('Ready to ping all channels!');
	utils.funcPingLoop(data);
});

botClient.login(config.token);
