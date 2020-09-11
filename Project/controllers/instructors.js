const fs = require('fs')
const data = require('../data.json')
const { age, date_ptBR_now, date} = require('../utils')


exports.index = function(req, res) {
    let instructors = []
    
    data.instructors.forEach(function(instructorArr){
        instructors.push({
            ...instructorArr,
            services: instructorArr.services.split(',')
        })
    })
    return res.render('instructors/index', { instructors })
}

exports.show = function(req, res) {
    //req.query; req.body; req.params
    const { id } = req.params
    
    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        age : age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        // created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
    } 


    return res.render('instructors/show', { instructor })
}

exports.create = function(req, res) {
    return res.render('instructors/create')
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

    let { avatar_url, name, birth, gender, services} = req.body
    
    birth = Date.parse(req.body.birth)
   /*  // Não estava dando certo para converter em formato de data pt-BR
    const created_at = Date.now() */
    const created_at = date_ptBR_now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    }) // [{...}, {...}]

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(error){
        if (error) return res.send ('Write file error')

        return res.redirect('/instructors')
    })

    // return res.send(req.body) 
}

exports.edit =  function(req, res){
    const { id } = req.params
    
    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    //Para não alterar dados no objeto original
    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    
    const foundInstructor = data.instructors.find(function(instructor, foundedIndex) {
        if (instructor.id == id) {
            index = foundedIndex
            return true                                                                                         
        }
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    
    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body
    
    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect(`/instructors`)
    })
}

