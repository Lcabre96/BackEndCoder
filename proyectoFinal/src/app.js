const express = require("express");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const { Server } = require("socket.io");
const { correctThumbnails } = require("./config/helpers.js");

const app = express();
const PORT = process.env.PORT || 8080;

// socket server config _______________________________________________________
const httpServer = app.listen(PORT, (err) => {
	if (err) {
		console.error("Error al iniciar el servidor");
	}
	console.log(`Servidor iniciado en el puerto ${PORT}`);
});
const io = new Server(httpServer);
// socket server config _______________________________________________________

// handlebars config _______________________________________________________
const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars.engine({ helpers: { correctThumbnails } }));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// handlebars config _______________________________________________________

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/public"));

app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

app.use("/", viewsRouter);

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");
	socket.on("message", (data) => {
		console.log(data);
	});

	socket.emit(
		"evento_para_socket_individual",
		"Este mensaje sólo lo debe recibir el socket actual"
	);

	socket.broadcast.emit(
		"evento_para_todos_menos_el_socket_actual",
		"Este mensaje lo verán todos los sockets conectados, MENOS el socket actual desde el que se envió el mensaje"
	);

	io.emit(
		"evento_para_todos",
		"Este mensaje lo reciben todos los sockets conectados"
	);
});