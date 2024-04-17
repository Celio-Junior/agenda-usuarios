require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const routes = require("./routes");
const helmet = require("helmet");
const csrf = require("csurf")
const mongoose = require("mongoose");

const {checkCsrfError, checkCsrf, datesGlobal} = require("./src/middlewares/middleware");

mongoose.connect(process.env.string_agenda_teste).then(()=>{
    console.log("conectando na base de dados");

    app.emit("connect-server")
})

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const sessioOptions = session({
    secret:"isso é secreto meu nobre, não conta pra niguem",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.string_agenda_teste}),
    cookie: {
        maxAge: 1000 * 60 * 4,
        httpOnly: false
    }
})

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// app.use(helmet());

app.use(sessioOptions);
app.use(flash());

app.use(csrf());
app.use(checkCsrfError)
app.use(checkCsrf)
app.use(datesGlobal)
app.use(routes)

app.on("connect-server", ()=>{
    app.listen(333, function(){
        console.log("Servidor está sendo executado");
        console.log("Acesse os site http://localhost:333");
    })
})