const express = require("express");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

const app = express();
const PORT = process.env.PORT || 8080;

// handlebars config _______________________________________________________
const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// handlebars config _______________________________________________________

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/public"));

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

app.get("/", (req, res) => {
	let testUser = {
		name: "Martín",
		last_name: "Fernandez",
		style: "index.css",
	};
	res.render("index", testUser);
});

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error al iniciar el servidor");
	}
	console.log(`Servidor iniciado en el puerto ${PORT}`);
});