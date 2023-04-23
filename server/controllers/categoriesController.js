const categoriesService = require("../service/categoriesService")

class CategoriesContoller {
    async getCategories(req, res, next) {
        try {

            const categories = await categoriesService.getCategories()
            console.log("categories======", categories)
            res.send({ categories })
        } catch (e) {
            next(e);
        }
    }
    async createCategory(req, res, next) {
        try {
            const payload = req.body
            const category = await categoriesService.createCategory(payload)
            console.log(category)
            res.send({ category })
        } catch (e) {
            next(e);
        }
    }
    async updateCategory(req, res, next) {
        try {
            const { id } = req.params
            const payload = req.body
            const category = await categoriesService.updateCategory(id, payload)
            console.log(category)
            res.send({ category })
        } catch (e) {
            next(e);
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params
            console.log(id)
            const category = await categoriesService.deleteCategory(id)
            console.log(category)
            res.send({ category })
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CategoriesContoller();
