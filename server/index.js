const express = require("express");
const app = express();

// Middleware to parse incoming requests with JSON payloads into JavaScript objects
app.use(express.json());

// Middleware to allow requests from all origins
const cors = require("cors");
app.use(cors());

const Contact = require("./models/contact");

const morgan = require("morgan");
app.use(morgan("tiny"));

let contacts = [
  {
    id: 1,
    name: "John Doe",
    number: "1234",
  },
  {
    id: 2,
    name: "Jane Doe",
    number: "1234",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Phonebook app</h1>");
});

// app.get("/info", (request, response) => {
//   const total = contacts.length;
//   const date = new Date();
  
//   response.send(`Phonebook has ${total} contacts as of ${date}`);
// });

app.get("/info", (request, response) => {
  const date = new Date();

  Contact.countDocuments()
    .then((total) => {
      response.send(`Phonebook has ${total} contacts as of ${date}`);
    }) 
    // .catch((error) => {
    //   console.log(error);
    //   response.status(400).send();
    //   // --> Bad request
    // });
    .catch((error) => next(error));
});

// app.get("/api/contacts", (request, response) => {
//   response.json(contacts);
// });

app.get("/api/contacts", (request, response) => {
  Contact.find()
    .then((contacts) => {
      response.json(contacts);
    })
    // .catch((error) => {
    //   console.log(error);
    //   response.status(400).send();
    //   // --> Bad request
    // });
    .catch((error) => next(error));
});

// app.get("/api/contacts/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const contact = contacts.find((contact) => contact.id === id);

//   if (contact) {
//     response.json(contact);
//   } else {
//     response.status(404).end();
//   }
// });

app.get("/api/contacts/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
        // --> Not found
      }
    })
    // .catch(error => {
    //   console.log(error)
    //   response.status(400).end({ error: 'Malformatted id' })
    //   // --> Bad request
    // })
    .catch((error) => next(error));
});

// app.delete("/api/contacts/:id", (request, response) => {
//   const id = Number(request.params.id);
//   contacts = contacts.filter((contact) => contact.id !== id);

//   response.status(204).end();
// });

app.delete("/api/contacts/:id", (request, response) => {
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
      // --> No Content
    })
    // .catch((error) => {
    //   console.log(error);
    //   response.status(400).end();
    //   // --> Bad request
    // });
    .catch((error) => next(error));
});

// app.post("/api/contacts", (request, response) => {
//   const body = request.body;

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: "Info missing",
//     });
//   }

//   const existingContact = contacts.find(
//     (contact) => contact.name === body.name
//   );

//   if (existingContact) {
//     return response.status(403).json({
//       error: "Name must be unique",
//     });
//   }

//   const contact = {
//     id: Math.floor(Math.random() * 1000),
//     name: body.name,
//     number: body.number,
//   };

//   contacts = contacts.concat(contact);
//   response.json(contact);
// });

app.post("/api/contacts", (request, response, next) => {
  const body = request.body;
  console.log(request.body);

  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     // --> Bad request
  //     error: "Info missing",
  //   });
  // }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact.save().then((savedContact) => {
    response.json(savedContact);
  })
  .catch(error => next(error))
});

app.put("/api/contacts/:id", (request, response) => {
  const body = request.body;
  // console.log(request.body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Info missing",
    });
  }

  const updatedContact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(request.params.id, updatedContact, { new: true })
    .then((updatedContact) => {
      // ---> By default, the updatedNote parameter receives the original document without the modifications. Optional { new: true } parameter causes the event handler to be called with the new modified document instead of the original.
      response.json(updatedContact);
    })
    // .catch((error) => {
    //   console.log(error);
    //   response.status(400).end();
    //   // --> Bad request
    // });
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
  } else if (error.name === 'ValidationError') {
    console.log("Validation error");
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
