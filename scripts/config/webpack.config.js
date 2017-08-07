const path = require('path');

// pages
const pages = {
    index: 'index',
};

//entryList
const entryList = Object.assign({}, pages);

//entryArr
const entryArr = {};
for (var i in entryList) {
    entryArr[i] = path.join(__dirname, '../../src/entry/' + entryList[i] + '/index.js');
}

//exports
exports.entryArr = entryArr;
