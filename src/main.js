import config from '../config.json';

import { Client, IntentsBitField } from 'discord.js';
import { funcPingLoop, validateConfig } from './utils';

export async function main() {
	validateConfig(config);

	const client = new Client({
		intents:
			IntentsBitField.Flags.MessageContent |
			IntentsBitField.Flags.Guilds |
			IntentsBitField.Flags.GuildMessages,
	});

	funcPingLoop(client);

	await client.login(config.token).catch((err) => {
		console.error(err);
		process.exit(1);
	});
}

main();
