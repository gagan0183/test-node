let https = require('https');

module.exports = {
    printName(person) {
        return `${person.last}, ${person.first}`;
    },
    load(person, cb) {
        https.get(`https://en.wikipedia.org/wiki/${person.first}_${person.last}`, function(result) {
            let p = '';

            result.on('data', (val) => {
                p += val;
            });

            result.on('end', () => {
                cb(p);
            });
        });
    }
}