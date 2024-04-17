const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ""},
    email: {type: String, required: false, default: ""},
    telefone: {type: String, required: false, default: ""},
    criadoEm: {type: Date, default: Date.now}
});

const ContatoModel = mongoose.model("contato", ContatoSchema);

function Contato(body){
    this.body = body;
    this.erros = [];
    this.contato = null;
}

Contato.prototype.register = async function(){
    this.validar();
    if(this.erros.length !== 0) return;

    this.contato = await ContatoModel.create(this.body);
}
Contato.prototype.validar = function(){
    this.cleanUp();

    if(!this.body.nome) this.erros.push("O campo nome é requerido");

    if(this.body.email && !validator.isEmail(this.body.email)) this.erros.push("E-mail inválido");

    if(!this.body.email && !this.body.telefone) this.erros.push("Pelo menos um dos campos precisa ser enviado: E-mail e telefone")
}
Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== "string") this.body[key] = "";
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
}

Contato.searchById = async function(id){
    if(typeof id !== "string") return;
    
    const contato = await ContatoModel.findById(id);
    return contato;
}

Contato.prototype.edit = async function(id){
    if(typeof id !== "string") return;
    this.validar();
    if(this.erros.length) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
}

Contato.searchContatos = async function(){
    const contatos = await ContatoModel.find().sort({criadoEm: -1});
    return contatos;
}

Contato.delete = async function(id){
    if(typeof id !== "string") return;
    const contatoDel = await ContatoModel.findByIdAndDelete(id);
    return contatoDel;
}

module.exports = Contato;