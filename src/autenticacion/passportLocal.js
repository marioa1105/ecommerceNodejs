const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsuarioController = require('../api/UsuarioController');

//LOGIN
passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    async function (req, username, password, done) {
        let usuarioService = new UsuarioController();
        let usuario = await usuarioService.getUserByEmail(username);
        if (!usuario) {
            return done(null, false, console.log('mensaje', 'usuario no encontrado'));
        } else {
            if (!usuarioService.isValidPassword(usuario, password)) {
                return done(null, false, console.log('mensaje', 'contraseña invalida'));
            } else {
                return done(null, usuario);
            }
        }
    })
);

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async function (req, newUser, done) {
    let usuarioService = new UsuarioController();
    let usuario = await usuarioService.getUserByEmail(username);

    if (usuario) {
        return done(null, false, console.log('mensaje', 'usuario ya existe'));
    } else {
        await usuarioService.saveUsuario(newUser);
        return done(null, newUser);
    }
})
);

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(async function (id, done) {
    let usuarioService = new UsuarioController();
    let user = await usuarioService.getUserByEmail(id);
    return done(null, user);
});

module.exports = passport;