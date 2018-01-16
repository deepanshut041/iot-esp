const express = require('express')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');



const app = express()
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client/public')))


app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
});

server.listen(port, ()=>{
    console.log('Server is started at port : ' + port);
});
