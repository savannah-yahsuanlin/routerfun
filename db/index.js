const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db', {dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },})

const User = conn.define('user', {
	id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
	name: {
		type: Sequelize.STRING,
		unique: true,	
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
		unique: true,
		allowNull: false,
		 validate: {
      len: [2, 255]
    }
	},
	rating: {
		type: Sequelize.INTEGER,
		defaultValue: 5
	}
})

module.exports = {
	conn,
	User,
	Thing
}