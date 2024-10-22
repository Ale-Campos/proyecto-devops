const dotenv = require('dotenv');
dotenv.config();

exports.config = {
    app_name:['proyecto-devops'],
    license_key: process.env.NEW_RELIC_LICENSE_KEY,
    logging: {
        level: 'info'
    },
}