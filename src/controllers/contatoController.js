const Contato = require("./../models/contatoModel")
exports.index = function(req, res){
    res.render("contato", {contato: {}});
}
exports.register = async function(req, res){
    try{
        const contato = new Contato(req.body);
        await contato.register();
        if(contato.erros.length !== 0){
            req.flash("erros", contato.erros);
            req.session.save(()=> res.redirect(`back`))
            return;
        }
        req.flash("sucess", "Contato foi salvo com sucesso");
        req.session.save(()=> res.redirect(`/contato/index/${contato.contato._id}`))
    }catch(err){
        console.log(err);
        res.render("error");
    }

}
exports.editIndex = async (req, res)=>{
    try{
        if(!req.params.id) return res.render("error");

        const contato = await Contato.searchById(req.params.id);

        if(!contato) return res.render("error");
        res.render("contato", {contato});
    }catch(err){
        console.log(err);
        res.render("error")
    }
    
}
exports.edit = async function(req, res){
    try{
        if(!req.params.id) return res.render("error");
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
        if(contato.erros.length){
            req.flash("erros", contato.erros);
            req.session.save(()=> res.redirect("back"));
            return;
        }
        req.flash("sucess", `Usuário foi atualizado com sucesso`);
        req.session.save(()=> res.redirect(`/contato/index/${contato.contato._id}`))
    }catch(err){
        console.log(err);
        res.render("error");
    }
}

exports.delete = async (req, res)=>{
    try{
        if(!req.params.id) return res.render("error");
        
        const contatoDelete = await Contato.delete(req.params.id);
        if(!contatoDelete) return res.render("error");
        req.flash("sucess", "Contado deletado com sucesso");
        req.session.save(()=> res.redirect("/"));
    }catch(err){
        console.log("Error", err);
        res.render("error");
    }
}