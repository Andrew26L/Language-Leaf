const app = require('./app');
const {db} = require('./db');

const PORT = process.env.PORT || 3000;

db.sync()
  .then(function() {
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
  })
});
