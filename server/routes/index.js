const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/goods", require("./goods.router"));
router.use("/auth", require("./auth.router"));
router.use("/review", require("./reviews.router"));

module.exports = router;
