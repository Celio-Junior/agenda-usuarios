const Login = require("./../models/loginModel")
exports.index = function(req, res){
    if(req.session.user) return res.render("index")
    res.render("login")
}
exports.register = async (req, res)=>{
    try{
        const login = new Login(req.body);
        await login.register();
        if(login.erros.length !== 0){
        req.flash("erros", login.erros);
        req.session.save(()=> res.redirect("back"));
        return;
        }

        req.flash("sucess", "Cadastro concluido");
        req.session.save(()=> res.redirect("back"))
   
    }catch(err){
        console.log("erro em login controller:", err)
        res.render("error")
    }
   
}
//verficar user no middleware e view(nav)
exports.login = async (req, res)=>{
    try{
        const login = new Login(req.body);
        await login.login();
        if(login.erros.length !== 0){
            req.flash("erros", login.erros)
            req.session.save(()=> res.redirect("back"));
            return;
        }
        req.flash("sucess", "Usuário logado com sucesso");
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect("/");
        })
    }catch(err){
        console.log(err);
        res.render("error")
    }
}
exports.logout = (req, res)=>{
    req.session.destroy();
    res.redirect("/")
}