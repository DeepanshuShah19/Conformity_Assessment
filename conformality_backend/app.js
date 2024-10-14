const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://deepanshuyshah:PdFzEAZxH0qrCfPB@cluster0.giwsj.mongodb.net/';

mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB databse');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});
