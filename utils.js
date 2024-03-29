const config = require('./config.json');
const { Client, Collection } = require('discord.js');

const ratelimit = new Collection();

/**
 * Validates the config file and throws an error if it is invalid.
 */
function validateConfig() {
	if (!config.token) throw new Error('No token provided to login to Discord');
	if (!typeof config.interval === 'number')
		throw new Error('config Interval is not a number');
	if (!config.role)
		throw new Error('No role provided to ping in config.js file');
	if (!config.channels || config.channels.length < 1)
		throw new Error('No channels provided to ping in config.js file');
	if (config.role.length > 19)
		throw new Error(
			'Role ID should be 19 characters. Make sure the ID was copied correctly.'
		);
}

/**
 * Formats the role ID to be used in a ping.
 * @param {id} id to reformat
 * @returns
 */
function formatRoleId(id) {
	return `<@&${id}>`;
}

/**
 * Runs the spam logic for the bot.
 * @param {Client<true>} data from the discord client object
 */
function funcPingLoop(data) {
	setInterval(() => {
		if (ratelimitManager(Date.now()) === false) return;

		for (const channel of config.channels) {
			const chan = data.channels.cache.get(channel);
			const role = formatRoleId(config.role);
			if (chan) {
				chan.send(role);
			}
		}
	}, config.interval);
}

/**
 * Controls when the bot should pause from pinging channels.
 * @param {number} time current time in milliseconds
 * @returns {Boolean} true if the bot should ping, false if it should pause.
 */
function ratelimitManager(time) {
	let limit_count = ratelimit.get(time);

	if (!limit_count) {
		limit_count = 0;
		ratelimit.set(time, limit_count);
		return true;
	}

	// console.debug(`[1] ${limit_count}/${config.ratelimit}/${time}`);

	if (limit_count >= config.ratelimit) {
		// console.debug(`[2] ${limit_count}/${config.ratelimit}/${time}`);
		setTimeout(() => {
			ratelimit.delete(time);
		}, 5000);
		return false;
	}

	ratelimit.set(time, limit_count + 1);
	return true;
}

module.exports = {
	validateConfig,
	formatRoleId,
	funcPingLoop,
	ratelimitManager,
};
