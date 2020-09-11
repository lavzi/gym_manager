const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')


routes.get('/', function(req, res) {
    return res.redirect('/instructors')
})


routes.get('/instructors', instructors.index)
routes.post('/instructors', instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id/edit', instructors.edit)
routes.get('/instructors/:id', instructors.show)



routes.get('/members', members.index)
routes.post('/members', members.post)
routes.put("/members", members.put)
routes.delete("/members", members.delete)
routes.get('/members/create', members.create)
routes.get('/members/:id/edit', members.edit)
routes.get('/members/:id', members.show)


module.exports = routes