const { Sentence } = require('./db');
const { Word } = require('./db');

async function submitReport(type, id, language, guess) {
  let instance;
  if (type === 'word') {
    instance = await Word.findById(id);
  }
  else if (type === 'sentence') {
    instance = await Sentence.findById(id);
  } else {
    throw 'Reported word/sentence does not exist in database'
  }
  console.log('inside submitReport', instance)
  await instance.reports.push({language, guess})
  console.log('inside submitReport2', instance)
  let reportCount = instance.reports.filter((report) => report.guess === guess && report.language === language).length;
  console.log('Report Count', reportCount)
  if (reportCount === 3) {
    instance[language].push(guess);
  }
  await instance.save();
  return instance;
}

module.exports = submitReport;
