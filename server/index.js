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
app.use(express.static(path.join(__dirname, '../client/dist')))

let switch_value = 0;

app.get('/api/switch', (req, res) => {
    res.json({"switch_value":switch_value})
});

app.post('/api/switch', (req, res)=>{
    switch_value = req.body.switch_value
    res.json({success:true, msg:"Update value successfully"});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

server.listen(port, ()=>{
    console.log('Server is started at port : ' + port);
});
