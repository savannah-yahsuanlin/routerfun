'use strict'
const express = require('express');
const app = express();
const path = require('path');
const { User, Thing, conn } = require('./db');

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/things', async(req, res, next) => {
	try {
		res.send(await Thing.findAll())
	} catch (error) {
		next(error);	
	}
})

app.post('/api/things', async(req, res, next) =>{
	try {
		res.status(201).send(await Thing.create(req.body))
	} catch (error) {
		next(error);	
	}
})


app.put('/api/things/:id', async(req, res, next) =>{
	try {
		const thing = await Thing.findByPk(req.params.id)
		res.send(await thing.update(req.body))
	} catch (error) {
		next(error);
	}
})

app.delete('/api/things/:id', async(req, res, next) => {
	try {
		const thing = await Thing.findByPk(req.params.id)
		await thing.destroy()
		res.sendStatus(204)
	} catch (error) {
		next(error);
	}
})

app.get('/api/users', async(req, res, next) => {
	try {
		res.send(await User.findAll())
	} catch (error) {
		next(error);
	}
})

app.delete('/api/users/:id', async(req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id)
		await user.destroy()
		res.sendStatus(204)
	} catch (error) {
		next(error);
	}
})

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=> {
  try {
    await conn.sync({ force: true });
    const [moe, larry, lucy] = await Promise.all(
      ['moe', 'larry', 'lucy'].map( name => User.create({ name }))
    );
    const [foo, bar, bazz] = await Promise.all(
      ['foo', 'bar', 'bazz', 'quq'].map( name => Thing.create({ name }))
    );
    console.log(`listening on port ${PORT}`)
  }
  catch(ex){
    console.log(ex);
  }
});