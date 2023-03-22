const {conn, User, Thing } = require('./db')

const seed = async() => {
	await conn.sync({force: true})

		const [moe, larry, lucy] = await Promise.all([
			['moe', 'larry', 'lucy'].map((name) => User.create({name})) 
		])
		const [wash, clean, mop, dry] = await Promise.all([
			['wash', 'clean', 'mop', 'dry'].map(name => Thing.create({name}))
		])

  console.log(`
    Seeding successful!
    Time to work!
  `)
}

seed().catch(err => {
  console.log(`
    Error seeding:
    ${err.message}
    ${err.stack}
  `)
})

module.exports = seed