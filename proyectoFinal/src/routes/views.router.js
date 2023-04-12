
const { Router } = require("express");
const { productMgr } = require("../Daos/ProductDaos/ProductManager.js");


const router = Router();


router.get("/", (req, res) => {
	res.render("index", { style: "index.css" });
});


router.get("/realtimeproducts", async (req, res) => {
	const productList = await productMgr.getProducts();
	res.render("realTimeProducts", { style: "index.css", productList });
});


router.get("/home", async (req, res) => {
	const productList = await productMgr.getProducts();
	res.render("home", { style: "index.css", productList });
});


module.exports = router;