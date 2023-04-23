const express = require("express");


const router = express.Router({ mergeParams: true });
const GoodContoller = require("../controllers/goodController");
router.get("/", GoodContoller.getGoods);
router.post("/searchByCategory", GoodContoller.findGoodsByCategory)
router.get("/:id", GoodContoller.getGoodById);
router.delete("/:id", GoodContoller.deleteGood);
router.post("/", GoodContoller.createGood);
router.post("/purchased", GoodContoller.purchasedGood);
router.get("/purchased/:id", GoodContoller.getPurchasedGood);
router.post('/search', GoodContoller.search);
router.patch('/', GoodContoller.updateGood);

module.exports = router;
