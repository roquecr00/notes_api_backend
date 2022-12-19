const mongoose = require("mongoose");



const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
});

noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});



const Note = mongoose.model("Note", noteSchema);

module.exports = Note;



/* Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
});

const note = new Note({
    content: "Mongoose es la hostia tio",
    date: new Date(),
    important: true
});

note.save().then(result => {
    console.log(result, "note saved!");
    mongoose.connection.close();
}).catch(error => {
    console.log(error);
});
 */
