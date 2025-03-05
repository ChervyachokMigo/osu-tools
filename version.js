const { readFileSync, writeFileSync } = require("fs-extra");
const package = 'package.json';
const encoding = {encoding: 'utf8'};
const version_inc = () => {
    try {
        let data = JSON.parse(readFileSync(package, encoding));
        if (data && data.version) {
            console.log('old version: ', data.version);
			data.version = data.version.split('.').map( (v, i, arr) => i == arr.length - 1? Number(v) + 1 : v ).join('.');
            console.log('new version: ', data.version);
            writeFileSync(package, JSON.stringify(data, null, 4), encoding);
            console.log('saved.');
        }
    } catch (e) {
        console.error(e);
    }
}

version_inc();