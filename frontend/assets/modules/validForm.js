import validator from "validator";
export default class{
    constructor(className){
        this.form = document.querySelector(className);
    }

    initValid(){
        if(this.form){
            this.form.addEventListener("submit", (event)=>{
                event.preventDefault();
                this.valid(event)
            })
        }
    };
    
    valid(event){
        const elemento = event.target;
        let error = false;
        for(const erro of this.form.querySelectorAll(".error")){
            erro.remove();
        }

        for(const input of elemento.querySelectorAll("input")){
            if(input.getAttribute("name") === "_csrf") continue;

            const label = input.previousElementSibling.innerText;

            if(this.form.classList.contains("form-cadastro") || this.form.classList.contains("form-login")){
                if(!input.value){
                    this.createError(input, `O campo <strong>${label}</strong> está em branco`)
                    error = true;
                }
                if(input.getAttribute("name") === "email"){
                    if(this.validEmail(input, label)) error = true
                }
                if(input.getAttribute("name" === "password")){
                    if(input.value.length < 3 || input.value.length > 20){
                        this.createError(input, `O campo <strong>${label}</strong> precisa ter entre 3 a 20 caracteres`)
                        error = true;
                    }
                }
                
            }
            if(this.form.classList.contains("form-contato")){ 
                if(input.getAttribute("name") === "nome" && !input.value){
                    this.createError(input, `O campo <strong>${label}</strong> está em branco`);
                    error = true;
                }

                if(input.getAttribute("name") === "email" && input.value){
                    if(this.validEmail(input, label)) error = true
                }
                if(!this.form.querySelector("input[name='telefone']").value && input.getAttribute("name") === "email" && !input.value){
                    this.createError(this.form.querySelector("input[name='telefone']"), "pelo menos o campo tem que ser preenchido")
                    this.createError(input, "pelo menos o campo tem que ser preenchido")
                    error = true
                }
                
            }
        }
        if(!error) elemento.submit();
    }
    createError(campo, mensagem){
        const p = document.createElement("p");
        p.innerHTML = mensagem;
        p.classList.add("error");
        p.classList.add("text-danger");
        campo.insertAdjacentElement("afterend", p);
    }
    validEmail(input, label){
        let error = false;
        if(!validator.isEmail(input.value)){
            this.createError(input, `O campo <strong>${label}</strong> está inválido`)
            error = true;
        }
        return error;
    }
}