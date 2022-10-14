var authController = require('../controllers/authController.js');
module.exports = function(app) {
    app.get('/register', authController.register);
};