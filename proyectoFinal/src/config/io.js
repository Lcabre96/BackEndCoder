const { Server } = require("socket.io");
const { productMgr } = require("../Daos/ProductDaos/ProductManager.js");

const generateIoServer = (httpServer) => {
	const io = new Server(httpServer);
	io.on("connection", (socket) => {
		console.log("Nuevo cliente conectado");
		socket.on("message", (data) => {
			console.log(data);
		});

		// socket.emit(
		// 	"evento_para_socket_individual",
		// 	"Este mensaje sólo lo debe recibir el socket actual"
		// );

		// socket.broadcast.emit(
		// 	"evento_para_todos_menos_el_socket_actual",
		// 	"Este mensaje lo verán todos los sockets conectados, MENOS el socket actual desde el que se envió el mensaje"
		// );

		// io.emit(
		// 	"evento_para_todos",
		// 	"Este mensaje lo reciben todos los sockets conectados"
		// );
	});
	return io;
};

module.exports = { generateIoServer };