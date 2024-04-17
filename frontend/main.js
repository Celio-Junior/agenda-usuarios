import "regenerator-runtime/runtime";
import "core-js/stable";
import ValidForm from "./assets/modules/validForm";
const body = document.querySelector("body");
const formRegister = new ValidForm(".form-cadastro")
const formLogin = new ValidForm(".form-login");
const formContato = new ValidForm(".form-contato")
formRegister.initValid();
formLogin.initValid();
formContato.initValid();
console.log("Essa é a minha agenda")