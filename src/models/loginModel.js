const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const LoginModel = mongoose.model("login", LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.erros = [];
        this.user = null;
    }
    async login(){
        this.validar();
        if(this.erros.length !== 0) return;

        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user){
            this.erros.push("Usuário não existe");
            this.user = null;
            return;
        }
        
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.erros.push("Senha inválida");
            this.user = null;
            return;
        }
    }
    async register(){
        this.validar()
        if(this.erros.length !== 0) return;

        await this.userExist();

        if(this.erros.length !== 0) return 

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body);
    }

    validar(){
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) this.erros.push("E-mail inválido");

        if(this.body.password.length < 6 || this.body.password > 20) this.erros.push("Senha precisa ter 6 a 20 caracteres")
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== "string") this.body[key] = "";
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
    async userExist(){
        this.user = await LoginModel.findOne({email: this.body.email});
        if(this.user) this.erros.push("Usuário já existe")
    }
}

module.exports = Login;