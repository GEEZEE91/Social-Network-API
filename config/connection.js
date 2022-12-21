const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
