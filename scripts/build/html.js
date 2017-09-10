var buildAction = require('./buildAction').buildAction;
var pathConfig = require('../config/path.config');

buildAction({
	file: 'scripts/templates/html/index.html',
	out: 'output/' + (pathConfig.outputPath || 'local') + '/index.html',
	replaceArr: [
		{
			reg: 'random',
			value: Math.random()
		}
	]
});

buildAction({
	file: 'scripts/templates/js/show_index.js',
	out: 'output/' + (pathConfig.outputPath || 'local') + '/show_index.js',
	replaceArr: [
		{
			reg: 'publicPath',
			value: pathConfig.publicPath
		},
		{
			reg: 'random',
			value: Math.random()
		}
	]
});