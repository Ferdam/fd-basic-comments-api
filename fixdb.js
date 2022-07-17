import fs from 'fs';

let commentsFile = fs.readFileSync('./comments.json');
commentsFile = JSON.parse(commentsFile);

fixDates();

function fixDates(params) {
    for (let item of commentsFile.data) {
        if (/\d{2}\/\d{2}\/\d{4}/.test(item.date)) { continue; }
        item.date = new Date(Number.parseInt(item.date?.replaceAll(/[\.,]*/g, ''))).toLocaleString('pt-br', {timeZone: 'UTC'});
    }
    fs.writeFileSync('./comments.json', JSON.stringify(commentsFile));
}
