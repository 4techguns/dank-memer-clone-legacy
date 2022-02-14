module.exports = {
	name: 'ready',
	once: true,
	execute() {
		console.timeEnd('bot start');
        	console.log(`hello`);
		client.user.setPresence({
        		status: "online",  // You can show online, idle... Do not disturb is dnd
        		game: {
            			name: "LEGACY VERSION; WILL BE MIGRATED SOON",  // The message shown
            			type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        		}
    		});
	},
};
