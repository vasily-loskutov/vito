const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/goods", require("./goods.router"));
router.use("/auth", require("./auth.router"));
router.use("/review", require("./reviews.router"));
router.use("/categories", require("./categories.router"));

module.exports = router;
