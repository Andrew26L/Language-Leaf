function submitReport(type, language, guess) {
  let instance;
  if (type === 'word') {
    instance = await Word.findById(req.body._id);
  }
  else if (type === 'sentence') {
    instance = await Sentence.findById(req.body._id);
  } else {
    throw 'Reported word/sentence does not exist in database'
  }
  await instance.reports.push({language, guess})
  let reportCount = instance.reports.filter()
  word[req.body.lang].push(req.body.guess);
  await word.save();
  res.send(word);
}

module.exports = { submitReport }
