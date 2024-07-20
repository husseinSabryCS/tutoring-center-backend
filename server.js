const app = require('./app');
const cors = require('cors')
const sequelize = require('./config/database');

const PORT = process.env.PORT || 5000;
app.use(cors())
sequelize.authenticate().then(() => {
  console.log('Database connected...');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.log('Error: ' + err);
});
  