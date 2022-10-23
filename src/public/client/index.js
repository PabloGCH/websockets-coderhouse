const socket = io();
const content = document.getElementById("content");
//FUNCTIONS
const productForm = async() => {
	const response = await fetch("../templates/form.handlebars");
	const result = await response.text();
	const template = Handlebars.compile(result);
	const html = template();
	return html;
}

const productTable = async(data) => {
	const response = await fetch("../templates/products.handlebars");
	const result = await response.text();
	const template = Handlebars.compile(result);
	const html = template(data)
	return html;
}

const productFormSubmit = () => {
	const form = document.getElementById("product-form");
	const inputs = form.getElementsByTagName("input");
	let newProduct = {
		name: inputs[0].value,
		price: inputs[1].value,
		imgUrl: inputs[2].value
	};
	socket.emit("newProduct", newProduct)
}


//ROUTES
if(window.location.pathname == "/stock") {
	socket.on("products", data => {
		productTable(data).then(res => {
			content.innerHTML = res;
		})
	})
}
if(window.location.pathname == "/form") {
	productForm().then(res => {
		content.innerHTML = res;
	})
}


