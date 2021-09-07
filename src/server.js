const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

const productoRoutes = require('./routes/routeProducto.js');
const carritoRoutes = require('./routes/routeCarrito.js');
const passport = require('./autenticacion/passportLocal.js');

dotenv.config();

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
    cookie:{
        httpOnly:false,
        secure:false,
        maxAge:10000
    },
    resave: true,
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
app.get('/',(req,res)=>{   
    res.render('layouts/index');
});

//LOGIN
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }),(req,res)=>{
    let { userName } = req.body;
    req.session.userName = userName;  
    res.redirect('/');    
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/faillogin', (req, res) => {
    res.status(400).render('faillogin');
});

//SIGNUP
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), (req, res) => {
    res.redirect('/login');
});
app.get('/signup',(req,res)=>{
    res.render('signup');
});
app.get('/failsignup', (req, res) => {    
    res.status(400).render('failssignup');
});

app.get('/logout',auth,(req,res)=>{
    let user = req.user.UserName;
    req.logout();
    res.render('logout',{'userName':  user});        
});

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

