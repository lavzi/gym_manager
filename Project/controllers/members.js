const fs = require('fs')
const data = require('../data.json')
const {date, bloodType, date_to_htmlFormat} = require('../utils')

exports.index = function(req, res) {
    let members = []
    
    data.members.forEach(function(memberArr){
        members.push({
            ...memberArr
        })
    })
    return res.render('members/index', { members })
}

exports.show = function(req, res) {
    //req.query; req.body; req.params
    const { id } = req.params
    
    const foundMember = data.members.find(function(member) {
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        blood: bloodType(foundMember.blood)
        // created_at: new Intl.DateTimeFormat('pt-BR').format(foundMember.created_at)
    } 


    return res.render('members/show', { member })
}

exports.create =  function(req, res) {
    return res.render('members/create')
}

exports.post = function(req, res) {
    //req.query => usado quando get
    //req.body => POST

    //Tranforma o corpo da requisitação em um vetor somente com as chaves
    const keys = Object.keys(req.body)


    for (key of keys) {
        if (req.body[key] == "")
            return res.send('Please, fill all the fields')
    }
    
    birth = Date.parse(req.body.birth)
   /*  // Não estava dando certo para converter em formato de data pt-BR
    const created_at = Date.now() */
    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if ( lastMember ) {
        id = lastMember.id  + 1
    }

    data.members.push({
        id,
        ...req.body,
        birth
    }) // [{...}, {...}]

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(error){
        if (error) return res.send ('Write file error')

        return res.redirect('/members')
    })

    // return res.send(req.body) 
}

exports.edit =  function(req, res){
    const { id } = req.params
    
    const foundMember = data.members.find(function(member) {
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")

    //Para não alterar dados no objeto original
    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', { member })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    
    const foundMember = data.members.find(function(member, foundedIndex) {
        if (member.id == id) {
            index = foundedIndex
            return true                                                                                         
        }
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    
    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body
    
    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })
    
    data.members = filteredMembers
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")
        
        return res.redirect(`/members`)
    })
}

