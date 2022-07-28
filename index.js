// Required imports
const { Client, GatewayIntentBits} = require("discord.js")
const config = require("./config.js")

// Create a new Discord client
const botClient = new Client({
    intents: [GatewayIntentBits.Guilds]
})

// Below are the channels that the bot will listen to and send pings.
// To add more channels, simply add more entries to the array and update the IDs.

const pong1 = "998463593274151002";
const pong2 = "998461387191889991";
const pong3 = "998461408326975508";
const pong4 = "998464898851930162";
const pong5 = "998464911615201322";
const pong6 = "998464923980021810";
const pong7 = "998465031995932773";
const pong8 = "998465044343963659";
const pong9 = "998465055555330179";
const pong10 = "998465071346880642";

// This is the ID of the role that will be pinged.

const formattedRoleId = `<@&998457751225257984>`;

// Array of channels to ping.
const allChannels = [pong1, pong2, pong3, pong4, pong5, pong6, pong7, pong8, pong9, pong10];

// This event runs on bot startup. Its a nodejs event, 
botClient.on("ready", (data) => {
    console.log("Ready to ping all channels!")

    setInterval(() => {
        // Endless loop that runs every second.
        for (const channel of allChannels) {
            const c = data.channels.cache.get(channel);

            // Checks if the channel is valid.
            if (c) {
                c.send(formattedRoleId);
            }
        }
    }, 1000)
})

// Authenticates with the discord api websocket and logs in.
botClient.login(config.token)