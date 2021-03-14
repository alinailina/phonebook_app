const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

app.use(express.static("client/build"));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

const Contact = require("./models/contact");

app.get("/", (request, response) => {
  response.send("<h1>Phonebook app</h1>");
});

app.get("/info", (request, response, next) => {
  const date = new Date();
  Contact.countDocuments()
    .then((total) => {
      response.send(`Phonebook has ${total} contacts as of ${date}`);
    })
    .catch((error) => next(error));
});

app.get("/api/contacts", (request, response, next) => {
  Contact.find()
    .then((contacts) => {
      response.json(contacts);
    })
    .catch((error) => next(error));
});

app.get("/api/contacts/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
        // --> 404 Not found
      }
    })
    .catch((error) => next(error));
});

app.post("/api/contacts", (request, response, next) => {
  const { name, number } = request.body;
  const { image } = request.files;

  image.mv("../client/public/uploads/" + image.name);

  const contact = new Contact({
    name: name,
    number: number,
    path: "/uploads/" + image.name,
  });

  contact
    .save()
    .then((savedContact) => {
      response.json(savedContact);
      console.log(savedContact);
    })
    .catch((error) => next(error));
});

app.put("/api/contacts/:id", (request, response, next) => {
  const body = request.body;
  console.log(request.body);

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      // --> 400 Bad request
      error: "Info missing",
    });
  }

  const updatedContact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(request.params.id, updatedContact, { new: true })
    // ---> By default, the updatedContact parameter receives the original document without the modifications. Optional { new: true } parameter causes the event handler to be called with the new modified document instead of the original.
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

app.delete("/api/contacts/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
      // --> 204 No Content
    })

    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ Error: "Unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    console.log("Cast error");
    return response.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    console.log("Validation error");
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
