module.exports = {
	name: 'ready',
	once: true,
	execute() {
		console.timeEnd('bot start');
        console.log(`hello`);
	},
};