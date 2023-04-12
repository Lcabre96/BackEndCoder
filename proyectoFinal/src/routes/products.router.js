const express = require("express");
const { io } = require("../config/server.js");
// coawaitnst { uploader } = require("../utils/multer");
const { productMgr } = require("../Daos/ProductDaos/ProductManager.js");

const productsRouter = express.Router();
productsRouter.get("/", async (req, res) => {
	const resp = await productMgr.getProducts();
	const limit = parseInt(req.query.limit);
	if (!limit) return res.json({ resp });
	const productsFiltered = resp.filter((product) => product.id <= limit);
	res.json({ productsFiltered });
});
productsRouter.get("/:pid", async (req, res) => {
	const { pid } = req.params;
	const resp = await productMgr.getProductByID(parseInt(pid));
	if (!resp)
		return res
			.status(404)
			.json({ error: `El producto con el id ${pid} no fue encontrado.` });
	res.json({ resp });
});
productsRouter.post("/", async (req, res) => {
	const {
		title,
		description,
		code,
		price,
		status = true,
		stock,
		category,
		thumbnails = [],
	} = req.body;
	try {
		const resp = await productMgr.addProduct({
			title,
			description,
			code,
			price,
			status,
			stock,
			category,
			thumbnails,
		});
		res.json(resp);
		if (resp) io.emit("newProductAdded", resp);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});
productsRouter.put("/:pid", async (req, res) => {
	const pid = parseInt(req.params.pid);
	const productToUpdate = { ...req.body, id: pid };
	const resp = await productMgr.updateProduct(productToUpdate);
	if (!resp)
		return res
			.status(404)
			.json({ error: `El producto con el id ${pid} no fue encontrado.` });
	res.json({ resp });
});
productsRouter.delete("/:pid", async (req, res) => {
	const pid = parseInt(req.params.pid);
	const resp = await productMgr.deleteProduct(pid);
	if (!resp)
		return res
			.status(404)
			.json({ error: `El producto con el id ${pid} no fue encontrado.` });
	res.status(204).send();
});
module.exports = productsRouter;