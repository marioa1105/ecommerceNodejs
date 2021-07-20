const express = require('express');

const productoRoutes = require('./routes/routeProducto.js');
const carritoRoutes = require('./routes/routeCarrito.js');
const handlebars = require('express-handlebars');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
//Plantillas
app.engine('hbs',
            handlebars({
                extname:".hbs",
                defaultLayout:"index.hbs",
                layoutsDir: __dirname + '/views/layouts/',
                partialsDir: __dirname + '/views/partials/'
            })
    );
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//API

app.use('/api',productoRoutes);
app.use('/api',carritoRoutes);

app.get('/',(req,res)=>{   
    res.render('layouts/index');
});

app.use((err, req, res, next) => {
    
    res.status(401).json({ error: -1, descripcion: err.message });
});

server.listen(PORT, () =>{
    console.log(`Escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});

