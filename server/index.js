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

app.get('/api/switch', (req, res) => {
    res.json(board)
});

app.post('/api/switch', (req, res)=>{
    switch_value = req.body.switch_value
    res.json({success:true, msg:"Update value successfully"});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(port, ()=>{
    console.log('Server is started at port : ' + port);
});
