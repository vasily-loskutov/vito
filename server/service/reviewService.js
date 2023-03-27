const Review = require("../models/review");
class ReviewService {
  async getReview(id) {
    const review = await Review.findAll({ where: { goodId: id } });
    return review;
  }
  async getUserReviews(id) {
    const review = await Review.findAll({ where: { userId: id } });
    return review;
  }
  async createReview(payload) {
    const review = await Review.create({
      comment: payload.comment,
      minus: payload.minus,
      plus: payload.plus,
      userId: payload.userId,
      goodId: payload.goodId,
      date: +payload.date,
      name: payload.name,
      rate: payload.rate,
    });

    return review;
  }
  async deleteReview(id) {
    const review = await Review.destroy({ where: { id } });
    return review;
  }
  async updateReview(payload) {
    const review = await Review.update(
      {
        comment: payload.comment,
        minus: payload.minus,
        plus: payload.plus,
        userId: payload.userId,
        goodId: payload.goodId,
        name: payload.name,
        rate: payload.rate,
      },
      { where: { userId: payload.userId } }
    );
    return review;
  }
}
module.exports = new ReviewService();
