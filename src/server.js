const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const configEnv = require('./config/config');


const productoRoutes = require('./routes/routeProducto.js');
const carritoRoutes = require('./routes/routeCarrito.js');
const routeDoc = require('./routes/routeApiDoc');
const viewProductosRoutes = require('./routes/routeViewProductos');
const viewCarritoRoutes = require('./routes/routeViewCarrito');
const passport = require('./autenticacion/passportLocal.js');
const authUser = require('./middleware/authUser');
const jwt = require('jsonwebtoken');


const PORT = configEnv.PORT;

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
app.use(`/${configEnv.V_API}`,productoRoutes);
app.use(`/${configEnv.V_API}`,carritoRoutes);
app.use('/productos',viewProductosRoutes);
app.use('/carrito',viewCarritoRoutes);
//app.use('/api-doc',routeDoc);
app.use(routeDoc)
//INDEX
app.get('/',    
    authUser.auth
    , (req,res)=>{   
    
    res.redirect('productos/listado');    
});

//LOGIN
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }),    
    (req,res)=>{
    let { username } = req.body;
    let token = jwt.sign({ data: username }, configEnv.JWT_SECRET, { expiresIn: '10m' });
    req.session.username = username;  
    req.session.token = token;
   
    res.send({token: token});
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
app.get('/failsignup', (err,req, res) => {    
    res.status(400).json({error : "Error al registrar usuario"});
    
});

app.get('/logout',(req,res)=>{    
    req.session.destroy((err) => {
        if (err) return next(err)
        res.redirect('/');
    })
    
    //res.render('logout',{'userName':  user});        
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

