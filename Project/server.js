const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended: true }))
//Usando express.static numa pasta, a ideia é que arquivos statics não farão parte da URL.
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, () => {
    console.log('The server has started at port localhost:5000')
})

/* server.use(function(req, res) {
    res.status(404).render("not-found");
}); */