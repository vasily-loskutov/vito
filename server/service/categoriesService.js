const Categories = require("../models/categories")

class CategoriesService {
    async getCategories() {
        const categories = await Categories.findAll()

        return categories
    }
    async createCategory(payload) {
        console.log(payload)
        const subcategories = [...payload.subcategories.map((elem) => [elem.subcategoryName, elem.subcategoryTag])]
        console.log("subcategories=======", subcategories)
        const category = await Categories.create({
            name: payload.categories,
            tag: payload.tagCategories,
            subcategories

        })
        return category
    }
    async updateCategory(id, payload) {
        const subcategories = [...payload.subcategories.map((elem) => [elem.subcategoryName, elem.subcategoryTag])]
        console.log("subcategories=======", subcategories)
        const category = await Categories.update({
            name: payload.categories,
            tag: payload.tagCategories,
            subcategories

        }, { where: { id } })
        return category
    }
    async deleteCategory(id) {
        console.log(id)
        const category = await Categories.destroy({ where: { id } })
        return category
    }


}
module.exports = new CategoriesService();
