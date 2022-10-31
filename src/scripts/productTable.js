//BASE DE DATOS
const options = require("../options/mysqlconfig.js");
const knex = require("knex");
const database = knex(options);
//crear tabla si no existe
database.schema.hasTable("products").then(exists => {
	if(!exists) {
		database.schema.createTable("products", table => {
			table.increments("id");
			table.string("name", 20);
			table.integer("price").nullable(true);

		})
		.then(() => console.log("product table created"))
		.catch((err) => console.log(err))
		.finally(() => database.destroy())
	}
})
.catch(err => console.log(err))
.finally(() => database.destroy());
/*
//agregar producto
const product = [{
	name:"regla",
	price: 10
}, {
	name:"goma",
	price: 15
}]

database("products").insert(product)
.then(() => console.log("products added"))
.catch((err) => console.log(err))
.finally(() => database.destroy());
*/
// Conseguir productos
/*
const products = [];
database.from("products").select("*")
.then((result) => {
	products.push(result)
})
.catch((err) => console.log(err))
.finally(() => {
	products.forEach(el => {
		el.forEach(p => {
			console.log({...p})
		})
	})
});
*/
/*
// Conseguir producto
const products = [];
database.from("products").select("*").where("id", 2)
.then((result) => {
	products.push(result)
})
.catch((err) => console.log(err))
.finally(() => {
	products.forEach(el => {
		el.forEach(p => {
			console.log({...p})
		})
	})
});
*/
/*
// Actualizar producto
database.from("products").where("id", 2).update({price: 76})
.then(() => console.log("product updated"))
.catch((err) => console.log(err))
.finally(() => database.destroy());
*/
/*
// Eliminar producto
database.from("products").where("id", 2).del()
.then(() => console.log("product deleted"))
.catch((err) => console.log(err))
.finally(() => database.destroy());
*/





