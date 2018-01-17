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
app.use(express.static(path.join(__dirname, 'dist')))

let board = {
    "fan_switch":false,
    "fan_slider":1,
    "ac_switch":false,
    "ac_slider":1,
    "light_switch":false,
    "light_slider":1
};

app.get('/api/board', (req, res) => {
    res.json(board)
});

app.post('/api/board', (req, res)=>{
    board['fan_switch'] = req.body.fan_switch
    board['fan_slider'] = req.body.fan_slider
    board['ac_switch'] = req.body.ac_switch
    board['ac_slider'] = req.body.ac_slider
    board['light_switch'] = req.body.light_switch
    board['light_slider'] = req.body.light_slider
    res.json({success:true, value:board});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(port, ()=>{
    console.log('Server is started at port : ' + port);
});
