const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const playerRouter = require('./routes/player-router');
const path = require('path')

require('dotenv').config();
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use('/', playerRouter);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));    //Relative path
    });
}


app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));