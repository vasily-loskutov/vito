const express = require("express");

const router = express.Router({ mergeParams: true });
const ReviewController = require("../controllers/reviewController");

router.get("/:goodId", ReviewController.getReview);
router.get("/user/:userId", ReviewController.getUserReviews);
router.post("/", ReviewController.createReview);
router.patch("/", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

module.exports = router;
