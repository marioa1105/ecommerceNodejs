module.exports.auth = function (req, res, next) {
    
    if (req.isAuthenticated()) {
        console.log('Autenticado');
        
        return next();
    } else {
        console.log('No Autenticado');
        res.redirect('/login');
    }
}