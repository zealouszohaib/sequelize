const app = require('../app');
const sequelize = require('../config/sequelize');

// Sync all models
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => console.error('Unable to connect to the database:', error));

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
