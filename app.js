import express from 'express';
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js';
import {Server} from 'socket.io';

const app= express();
const httpServer=app.listen(8080,()=>console.log("Server arriba"));
const io= new Server(httpServer); // cambio 

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/',viewRouter);

const message=[]

io.on('connection',socket=>{ // cambio 
    console.log("Tenemos un cliente conectado");
    socket.on('message', data=>{
        message.push(data)
        io.emit("messageLogs",message)
        console.log(data)
    })
})