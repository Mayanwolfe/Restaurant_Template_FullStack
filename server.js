const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from public directory

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

//https://nodejs.org/api/events.html#emitteroneventname-listener
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// Define a schema and model for the form data
const contactSchema = new mongoose.Schema({
  name: String,
  people: Number,
  date: Date,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle POST request
app.post('/submit', async (req, res) => {
  const formData = {
    name: req.body.Name,
    people: req.body.People,
    date: new Date(req.body.date),
    message: req.body.Message
  };

  try {
    const newContact = new Contact(formData);
    await newContact.save();
    res.redirect('/?success'); // Redirect back to the original page with success query parameter (the question mark means "this is not a page, this something else")
  } catch (err) {
    res.redirect('/?error');   // Redirect back with error query parameter if there's an issue
  }
});

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});