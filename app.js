const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const db = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost/sequelize_fun`)

const Hat = db.define('hat', {
	name: Sequelize.STRING,
	material: Sequelize.STRING,
	height: Sequelize.INTEGER,
	brim: Sequelize.BOOLEAN
})

const Person = db.define('person', {
  name: Sequelize.STRING,
})

Hat.belongsTo(Person)
Person.hasMany(Hat)

app.get('/persons', (req, res) => {
	Person.findAll()
	.then((persons) => {
		const sendThisStuffToClient = []
		for (var i = 0; i < persons.length; i++) {
			sendThisStuffToClient.push(persons[i].dataValues)
		}
		res.send(sendThisStuffToClient)
	})
})

app.get('/hats', (req, res) => {
	Hat.findAll()
	.then((hats) => {
		const sendThisStuffToClient = []
		for (var i = 0; i < hats.length; i++) {
			sendThisStuffToClient.push(hats[i].dataValues)
		}
		res.send(sendThisStuffToClient)
	})
})

db.sync({force: true})
.then( () => {
	Person.bulkCreate([
		{
			name: "Santa Claus"
		},
		{
			name: "Mojo Jojo"
		},
		{
			name: "Daisy Duck"
		},	
	])
	.then( () => {
		Hat.bulkCreate([
				{
					name: 'Tricorn hat',
					material: 'leather',
					height: 5,
					brim: false
				},
				{
					name: 'Hoofddeksel',
					material: 'cardboard',
					height: 50,
					brim: false
				},
				{
					name: 'Fez',
					material: 'gold',
					height: 5,
					brim: true
				},
			])
			.then(() => {
				Person.findAll()
				.then((result) => {
					console.log('my query is: ')
					console.log(result[0].dataValues)
					console.log('his name is: ')
					console.log(result[0].dataValues.name)
				})
				.then( () => {
					const server = app.listen(3000, () => {
						console.log(`server has started ${server.address().port}`)
					})
				})
			})
	})
})



//install --save express pg sequelize pug
//create database sequelize_fun;