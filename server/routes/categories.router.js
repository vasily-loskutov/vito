const express = require("express");


const router = express.Router({ mergeParams: true });
const CategoriesContoller = require("../controllers/categoriesController");
router.get("/", CategoriesContoller.getCategories);
router.post("/", CategoriesContoller.createCategory);
router.put("/:id", CategoriesContoller.updateCategory);
router.delete("/:id", CategoriesContoller.deleteCategory);


module.exports = router;
