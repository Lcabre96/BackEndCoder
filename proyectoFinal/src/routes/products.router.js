const express = require("express");
// const { uploader } = require("../utils/multer");
const { productMgr } = require("../Daos/ProductDaos/ProductManager.js");

const productsRouter = express.Router();

// GET http://localhost:xxxx/api/products
productsRouter.get("/", async (req, res) => {
	const resp = await productMgr.getProducts();
	const limit = parseInt(req.query.limit);
	if (!limit) return res.send({ resp });
	const productsFiltered = resp.filter((product) => product.id <= limit);
	res.send({ productsFiltered });
});

productsRouter.get("/:pid", async (req, res) => {
	const { pid } = req.params;
	const resp = await productMgr.getProductByID(parseInt(pid));
	res.send({ resp });
});

productsRouter.post("/", async (req, res) => {
	const {
		title,
		description,
		code,
		price,
		status,
		stock,
		category,
		thumbnails,
	} = req.body;
});

productsRouter.put("/:pid", async (req, res) => {
	const pid = parseInt(req.params.pid);
	const productToUpdate = { ...req.body, id: pid };
	const resp = await productMgr.updateProduct(productToUpdate);
	res.send({ resp });
});

productsRouter.delete("/:pid", async (req, res) => {
	const { pid } = req.params;
	const resp = await productMgr.deleteProduct(parseInt(pid));
	res.send({ resp });
});

// productsRouter.post("/products/:pid", uploader.single("file"), (req, res) => {
// 	const {
// 		title,
// 		description,
// 		code,
// 		price,
// 		status,
// 		stock,
// 		category,
// 		thumbnails,
// 	} = req.body;

// 	res.json({
// 		title,
// 		dato1: req.dato1,
// 		dato2: req.dato2,
// 		thumbnail,
// 	});
// });

module.exports = productsRouter;
