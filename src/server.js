const express = require('express');
const productoRoutes = require('./routes/routeProductos.js');
const carritoRoutes = require('./routes/routeCarrito.js');
const handlebars = require('express-handlebars');



const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Plantillas
app.engine('hbs',
            handlebars({
                extname:".hbs",
                defaultLayout:"index.hbs",
                layoutsDir:__dirname + '/views/layouts/',
                partialsDir:__dirname + '/views/partials/'
            })
    );
app.set('view engine', 'hbs');
app.set('views', './views');

//API
app.use('/api',productoRoutes);
app.use('/api',carritoRoutes);

app.get('/',(req,res)=>{

});

server.listen(PORT, () =>{
    console.log(`Escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});