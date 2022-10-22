// IMPORTS
const express = require("express");
const path = require("path")
const Container = require("./container.js")

//GLOBAL VARIABLES
const APP = express();
const VIEWFOLDER = path.join(__dirname, "views")
const HANDLEBARS = require("express-handlebars");
const container = new Container("products.json")

APP.use(express.json());
APP.use(express.urlencoded({extended: true}));
APP.use(express.static(path.join(__dirname, 'public')));

APP.engine("handlebars", HANDLEBARS.engine())


APP.set("views", VIEWFOLDER)

APP.set("view engine", "handlebars")



APP.get("/", (req, res) => {
	res.redirect("products")
})

APP.get("/products", (req, res) => {
	container.getAll().then(p => {
		res.render("products", {products: p})
	})
})

APP.get("/form", (req, res) => {
	res.render("form");
})

APP.post("/products", (req, res) => {
	let product = req.body;
	Object.assign(product, {price: parseInt(product.price)})
	container.save(product).then(ret => {
		console.log(ret);
	})
	res.redirect("/products")
})



APP.listen(4000, ()=>{"server listening on port 4000"});
