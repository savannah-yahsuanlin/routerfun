const Sequelize = require('sequelize');
require('dotenv').config()
const conn = new Sequelize(process.env.DATABASE_URL)

const User = conn.define('user', {
	id: {
		type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,	
		allowNull: false
	}
})

const Thing = conn.define('thing', {
	id: {
		type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		 validate: {
      len: [2, 255]
    }
	},
	rating: {
		type: Sequelize.INTEGER,
		defaultValue: 5,
		allowNull: false
	}
})

module.exports = {
	conn,
	User,
	Thing
}