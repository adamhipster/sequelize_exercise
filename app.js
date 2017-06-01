const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const db = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost/sequelize_fun`)



const Person = db.define('person', {
  name: Sequelize.STRING,
})

db.sync({force: true})
.then( () => {
	Person.create({
		name: "Santa Claus"
	})
	.then( () => {
		Person.findAll()
		.then((result) => {
			console.log('my query is: ')
			console.log(result[0].dataValues)
			console.log('his name is: ')
			console.log(result[0].dataValues.name)
		})
	})


})




//install --save express pg sequelize pug
//create database sequelize_fun;