const mongoose = require('mongoose')
var print = false
if (process.argv.length == 3) {
  print = true
} else if (process.argv.length < 5) {
  console.log('give password, name and number as arguments')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://manki:${password}@cluster0.hecbh.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (print) {
  console.log("Phonebook:")
  Person
    .find({})
    .then(persons => {
      persons.map(person => {
        console.log(person.name + " " + person.number)
      })
      mongoose.connection.close()
    })
} else {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
