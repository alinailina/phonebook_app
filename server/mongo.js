const mongoose = require("mongoose");

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://user:${password}@cluster0.sysyf.gcp.mongodb.net/phonebook_app?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

if (newName && newNumber) {
  const contact = new Contact({
    name: newName,
    number: newNumber,
  });

  contact.save().then((contact) => {
    console.log(`${contact.name} ${contact.number} was added to the phonebook`);
    mongoose.connection.close();
  });
} else {
  Contact.find({}).then((contact) => {
    contact.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
}

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
