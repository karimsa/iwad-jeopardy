'use strict';

const SHEETS = ['0', '341307307', '754769795', '208246205'];
const sheetUrl = 'https://docs.google.com/spreadsheets/d/1ZkHtnXyrsu-mX6wOJy2Dd2j9R50mRDZmCFRctwdtu58/export?gid=%s&format=csv';

const fs = require('fs'),
      path = require('path'),
      request = require('request'),
      util = require('util'),
      csv = require('csv-stream'),
      list = [];

for ( let sheet of SHEETS ) {
    list.push(new Promise((resolve, reject) => {
        let stream = csv.createStream({
            columns: ['points', 'question', 'answer'],
            escapeChar : '"',
            enclosedChar : '"'
        }), category, questions = {};

        //request(util.format(sheetUrl, sheet)).pipe(process.stdout);
        request(util.format(sheetUrl, sheet))
            .pipe(stream)
            .on('error', reject)
            .on('data', row => {
                //console.log(row);
                if (row.points.indexOf('Category') !== -1) {
                    category = row.points.split(':')[1].trim();
                } else if (row.points.replace(/[0-9]/g, '') === '') {
                    questions[row.points] = {
                        question: row.question,
                        answer: row.answer
                    };
                }
            })
            .on('end', () => resolve({
                category: category,
                questions: questions
            }));
    }));
}

Promise.all(list).then(results => {
    let questions = {};

    results.forEach(res => {
        questions[res.category] = res.questions;
    });

    fs.writeFile(path.resolve(__dirname, 'src', 'questions.json'), JSON.stringify(questions, null, 2));
}, err => {
    console.log(err);
    process.exit(-1);
});