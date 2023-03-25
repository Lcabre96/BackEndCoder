const fs = require("fs");

class ProductManager {
	constructor(path) {
		this.path = path;
	}

	getProducts = async () => {
		try {
			if (fs.existsSync(this.path)) {
				const products = await fs.promises.readFile(this.path, "utf-8");
				return JSON.parse(products);
			}
			throw new Error();
		} catch (error) {
			return error;
		}
	};

	validateFields = (newProduct) => {
		let areFieldsMissing =
			!newProduct.title ||
			!newProduct.description ||
			!newProduct.code ||
			!newProduct.price ||
			!newProduct.status ||
			!newProduct.stock;

		return areFieldsMissing;
	};

	getProductByID = async (id) => {
		const products = await this.getProducts();

		const productFound = products.find((product) => product.id === id);

		if (!productFound) return console.error("Product not found");

		console.log(productFound);

		return productFound;
	};

	addProduct = async (newProduct) => {
		const products = await this.getProducts();

		const { title, description, code, price, status, stock, thumbnail } =
			newProduct;

		products.length === 0
			? (newProduct.id = 1)
			: (newProduct.id = products[products.length - 1].id + 1);

		const areFieldsMissing = this.validateFields(newProduct);

		let productExists = products.some((prod) => prod.code === newProduct.code);

		if (areFieldsMissing) {
			console.log("Debe completar todos los campos");
		} else if (productExists) {
			console.log("El código ingresado ya existe");
		} else {
			products.push({ id: newProduct.id, ...newProduct });

			await fs.promises.writeFile(
				this.path,
				JSON.stringify(products, null, 2),
				"utf-8"
			);

			return newProduct;
		}
	};

	updateProduct = async (productToUpdate) => {
		const { id } = productToUpdate;
		const products = await this.getProducts();

		const productFoundIndex = products.findIndex(
			(product) => product.id === id
		);
		if (productFoundIndex === -1) return console.error("Product not found");

		products[productFoundIndex] = {
			...products[productFoundIndex],
			...productToUpdate,
		};
		console.log("El Producto actualizado es:", products[productFoundIndex]);

		await fs.promises.writeFile(
			this.path,
			JSON.stringify(products, null, 2),
			"utf-8"
		);
	};

	deleteProduct = async (IdProductToDelete) => {
		const products = await this.getProducts();

		const productFoundIndex = products.findIndex(
			(product) => product.id === IdProductToDelete
		);

		if (productFoundIndex === -1) return console.error("Product not found");
		console.log("El producto a eliminar es:", products[productFoundIndex]);
		products.splice(productFoundIndex, 1);

		await fs.promises.writeFile(
			this.path,
			JSON.stringify(products, null, 2),
			"utf-8"
		);
	};
}

const productMgr = new ProductManager("./src/files/products.json");

module.exports = { ProductManager, productMgr };
