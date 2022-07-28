const config = require("./config.json");
const { Client } = require("discord.js");

/**
 * Validates the config file and throws an error if it is invalid.
 */
function validateConfig() {
	if (!config.token) throw new Error("No token provided to login to Discord");
	if (!config.role)
		throw new Error("No role provided to ping in config.js file");
	if (!config.channels || config.channels.length < 1)
		throw new Error("No channels provided to ping in config.js file");

	if (config.role.length > 18)
		throw new Error(
			"Role ID should be 18 characters. Make sure the ID was copied correctly."
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
		for (const channel of config.channels) {
			const chan = data.channels.cache.get(channel);
            const role = formatRoleId(config.role);
			if (chan) {
				chan.send(role);
			}
		}
	}, 1000);
}

module.exports = {
	validateConfig,
	formatRoleId,
	funcPingLoop,
};
