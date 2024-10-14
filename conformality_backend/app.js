const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
const mongoURI = 'mongodb+srv://deepanshuyshah:PdFzEAZxH0qrCfPB@cluster0.giwsj.mongodb.net/Conformity';

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB databse');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

const schema = new mongoose.Schema({}, { strict: false });
const Database = mongoose.model("customerData", schema, "customerData");

app.get('/data', async (req, res) => {
    try {
        const data = await Database.find();
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});