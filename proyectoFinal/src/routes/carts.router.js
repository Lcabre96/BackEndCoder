const express = require("express");
const cartMgr = require("../Daos/CartDaos/CartManager.js");

const cartRouter = express.Router();


// POST http://localhost:xxxx/api/carts
cartRouter.post("/", async (req, res) => {
	const resp = await cartMgr.addCart({ products: [] });
	res.send(resp);
});

cartRouter.get("/:cid", async (req, res) => {
	const { cid } = req.params;
	const resp = await cartMgr.getCartByID(parseInt(cid));
	res.send({ resp });
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
	const { cid, pid } = req.params;
	const resp = await cartMgr.addProductToCart(parseInt(cid), parseInt(pid));
	res.send({ resp });
});

module.exports = cartRouter;
