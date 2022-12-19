require("dotenv").config();  

require("./mongo");


const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/Note");


app.use(cors());
app.use(express.json());



let notes = [];



const logger = require("./loggerMiddleware");

app.use(logger);


app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {

  Note.find({}).then(notes => {
    res.json(notes);
  });
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});



app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
    console.log("Error : 404");
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
