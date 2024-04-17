exports.checkCsrfError = (error, req, res, next)=>{
    if(error){
        return res.render("error") 
    }
    next();
}

exports.checkCsrf = (req, res, next)=>{
    res.locals.csrfToken = req.csrfToken();
    next()
}

exports.datesGlobal = (req, res, next)=>{
    res.locals.erros = req.flash("erros");
    res.locals.sucess = req.flash("sucess");
    res.locals.user = req.session.user;

    next()
}

exports.checkUser = function(req, res, next){
    if(!req.session.user){
        req.flash("erros", "Precisa ter logado no site");
        req.session.save(()=> res.redirect("/"));
        return;
    }
    next()
}