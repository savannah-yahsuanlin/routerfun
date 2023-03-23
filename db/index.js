const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db')

const User = conn.define('user', {
	name: {
		type: Sequelize.STRING,	
		allowNull: false
	}
})

const Thing = conn.define('thing', {
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