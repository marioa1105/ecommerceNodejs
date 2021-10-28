const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);



const productoRoutes = require('./routes/routeProducto.js');
const carritoRoutes = require('./routes/routeCarrito.js');
const passport = require('./autenticacion/passportLocal.js');
const authUser = require('./middleware/authUser');
const ProductosController = require('./api/ProductoController');
const CarritoController = require('./api/CarritoController');


const PORT = 8080;

//configuracion server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));

//cookies
app.use(cookieParser());
app.use(session({              
    secret: 'secreto',
    store:new FileStore({ path:'../sesiones', ttl: 10000, retries:0}),    
    resave: false,
    saveUninitialized: false
}));

//autenticacion
app.use(passport.initialize());
app.use(passport.session());

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

//INDEX
app.get('/',authUser.auth, (req,res)=>{   
    console.log('Index render listado')
    res.redirect('productos/listado');    
});

//LOGIN
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }),(req,res)=>{
    let { username } = req.body;
    req.session.username = username;  
    console.log('Post loggin');
    res.redirect('/');    
});
app.get('/login', (req, res) => {
    
    res.render('autenticacion/login');
});
app.get('/faillogin', (req, res) => {
    res.status(400).render('faillogin');
});

//SIGNUP
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), (req, res) => {
    res.redirect('/login');
});
app.get('/signup',(req,res)=>{
    res.render('autenticacion/signup');
});
app.get('/failsignup', (req, res) => {    
    res.status(400).json({error : "Error al registrar usuario"});
    
});

app.get('/logout',(req,res)=>{    
    req.session.destroy((err) => {
        if (err) return next(err)
        res.redirect('/');
    })
    
    //res.render('logout',{'userName':  user});        
});

//PRODUCTOS
app.get('/productos/nuevo',authUser.auth,(req,res) => {
    res.render('productos/nuevoProducto');
})
app.get('/productos/listado',authUser.auth, async(req,res) => {
    let productos = new ProductosController();
    let listado = await productos.getProductos();
    let hayProductos = listado.length == 0? false: true;
    console.log('render detalleProductos');
    res.render('productos/detalleProductos',{hayProductos: hayProductos, productos: listado});
})

//CARRITO
app.get('/carrito/listado',authUser.auth, async(req,res) => {
    let controller = new CarritoController();
    let carrito = await controller.getProductosCarritoById(req.session.username);
    let hayProductos = false;
    let productos = [];
    if(carrito.length > 0){
        if(carrito[0].productos.length > 0){
            hayProductos = true;
            productos = carrito[0].productos.map(x => {
                return {
                    title: x.nombre,
                    price: x.precio,
                    thumbnail: x.foto
                }
            })
        }
    }     
    res.render('carrito/listado',{hayProductos: hayProductos, productos: productos});
})

//middleware
app.use((err, req, res, next) => {    
    res.status(401).json({ error: -1, descripcion: err.message });
});

server.listen(PORT, () =>{
    console.log(`Escuchando en puerto http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});

