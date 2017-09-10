var buildAction = require('./buildAction').buildAction;

var arguments = process.argv.splice(2);
var pathKey = arguments[0] || 'local';
var path = {
		test: {
			outputPath: 'test',
			publicPath: '/',
			apiHost: ''
		},
		online: {
			outputPath: 'online',
			publicPath: '/',
			apiHost: ''
		},
		local: {
			outputPath: 'local',
			publicPath: '/',
			apiHost: ''
		},
	};

buildAction({
	file: 'scripts/templates/js/path.config.js',
	out: 'scripts/config/path.config.js',
	replaceArr: [
		{
			reg: 'outputPath',
			value: path[pathKey].outputPath
		},
		{
			reg: 'publicPath',
			value: path[pathKey].publicPath
		}
	]
});
	
buildAction({
	file: 'scripts/templates/js/env.config.js',
	out: 'src/common/js/env.config.js',
	replaceArr: [
		{
			reg: 'apiHost',
			value: path[pathKey].apiHost
		},
		{
			reg: 'publicPath',
			value: path[pathKey].publicPath
		}
	]
});


