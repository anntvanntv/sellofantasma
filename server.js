const express = require('express'); //1. Amb això node.js allows me to import something that I installed and then I can use it
const path = require('path'); //amb això node.js allows us to import what we installed before
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const app = express(); //2.To be able to use express

const publicDirectory = path.join(__dirname, './public');  //així li diem al node.js on està el directori = "I want join (path.join) this current folder (_dirname) and this will be concatened with ./public". So, this is our public directory
//console.log(__dirname);
//console.log(publicDirectory);
app.use(express.static(publicDirectory)); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs'); //per a renderitzar 

//app.get("/", (req, res) => {  //3.
//    res.render('index') })

//app.get("/cart", (req, res) => {    //4. http message that is: .get, we use it by default always when we want to load the page, el "/" especifica la ruta, el reques, response són una funció.  Res.send envia el missatge "hola", per exemple
//    res.render("cart");
//})

app.use('/', require('./routes/pages'));
app.use('/index', require('./routes/pages'));
app.use('/cart', require('./routes/pages'));
app.use('/products', require('./routes/products'));
app.use('/grupos', require('./routes/pages'));
app.use('/silenciosepulcral', require('./routes/pages'));
app.use('/elsa', require('./routes/pages'));
app.use('/news', require('./routes/pages'));
app.use('/about', require('./routes/pages'));
app.use('/checkout', require('./routes/checkout'));
app.use('/terms&conditions', require('./routes/pages'));

app.listen(5000, ()=>{   //4. La funció és per veure el console.log quan comencem el server (start our server)
    console.log("server is running on localhost:5000");
})