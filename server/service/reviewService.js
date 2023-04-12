const Review = require("../models/review");
const Good = require("../models/good")
const average = require("../utils/average.js")
const PurchasedGood = require("../models/purchasedGood")
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
    const AllRate = await Review.findAll({ attributes: ['rate'], where: { goodId: payload.goodId }, raw: true });

    const newRate = average(AllRate)
    await Good.update({ rate: newRate }, { where: { id: payload.goodId } })

    let purchasedGoodFeedback = await PurchasedGood.findOne({ attributes: ['isFeedback'], where: { linkToGoodPage: payload.goodId }, raw: true })
    purchasedGoodFeedback = true
    await PurchasedGood.update({ isFeedback: purchasedGoodFeedback }, { where: { linkToGoodPage: payload.goodId } })


    return review;
  }
  async deleteReview(id) {

    const review = await Review.destroy({ where: { id } });
    return review;
  }
  async updateReview(payload) {
    const AllRate = await Review.findAll({ attributes: ['rate'], where: { goodId: payload.goodId }, raw: true });

    const newRate = average(AllRate)
    await Good.update({ rate: newRate }, { where: { id: payload.goodId } })
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
