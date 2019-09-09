const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/secrets', require('./secretsController'));
apiControllers.use('/financialCalculators', require('./financialCalculatorsController'));

module.exports = apiControllers;
