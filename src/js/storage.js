export default class Storage {

    static get getProducts() {
        return JSON.parse(localStorage.getItem("products")) || [];
    }

    static getCategories() {
        return JSON.parse(localStorage.getItem("categories")) || []
    }

    static saveProducts(productsList) {
        localStorage.setItem("products", JSON.stringify(productsList))
    }

    static saveCategories(categoriesList) {
        localStorage.setItem("categories", JSON.stringify(categoriesList))
    }

    static removeProduct(deletedId) {
        // Coerce both sides to string so string ids (uniqueId()) and any
        // legacy numeric ids stored on older clients both match.
        const target = String(deletedId);
        const UpdatedProducts = this.getProducts.filter((product) => String(product.id) !== target)
        this.saveProducts(UpdatedProducts)
    }

}