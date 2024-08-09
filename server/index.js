import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import url from 'url';

// Import components
import Connection from './database/db.js';
import Router from './routes/route.js';

// Setup __dirname equivalent
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config();

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

// Handle React routing, return index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
