const ReviewService = require("../service/reviewService");

class GoodContoller {
  async getReview(req, res, next) {
    try {
      const { goodId } = req.params;
      const reviews = await ReviewService.getReview(goodId);
      console.log(reviews);
      return res.send({ reviews });
    } catch (e) {
      next(e);
    }
  }
  async getUserReviews(req, res, next) {
    try {
      const { userId } = req.params;
      const reviews = await ReviewService.getUserReviews(userId);

      return res.send({ reviews });
    } catch (e) {
      next(e);
    }
  }
  async createReview(req, res, next) {
    try {
      const payload = req.body;
      const review = await ReviewService.createReview(payload);
      return res.send({ review });
    } catch (e) {
      next(e);
    }
  }
  async deleteReview(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const review = await ReviewService.deleteReview(id);
      return res.send({ review });
    } catch (e) {
      next(e);
    }
  }
  async updateReview(req, res, next) {
    try {
      const payload = req.body;
      const review = await ReviewService.updateReview(payload);
      return res.send({ review });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GoodContoller();
