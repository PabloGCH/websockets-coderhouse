//BASE DE DATOS
const options = require("../options/mysqlconfig.js");
const knex = require("knex");
const database = knex(options);


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

database("product").insert(product)
.then(() => console.log("products added"))
.catch((err) => console.log(err))
.finally(() => database.destroy());
*/
