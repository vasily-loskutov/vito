const Good = require("../models/good");
const PurchasedGood = require("../models/purchasedGood");
class GoodService {
  async getGoods() {
    const goods = await Good.findAll();
    return goods;
  }
  async getGood(id) {
    const good = await Good.findAll({ where: { id } });
    return good;
  }
  async deleteGood(id) {
    const good = await Good.destroy({
      where: {
        id,
      },
    });
    return good;
  }
  async createGood(payload) {
    const good = await Good.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      photo: payload.photo,
      rate: payload.rate,
      count: 1,
    });
    return good;
  }
  async purchasedGood(payload) {
    console.log(payload);
    const purchasedGood = await PurchasedGood.create({
      name: payload.name,
      userId: payload.userId,
      photo: payload.photo,
      linkToGoodPage: payload.linkToGoodPage,
      isFeedback: payload.isFeedback,
      count: payload.count,
      price: payload.price,
    });
    return purchasedGood;
  }
  async getPurchasedGood(id) {
    const purchasedGoods = await PurchasedGood.findAll({
      where: { userId: id },
    });

    return purchasedGoods;
  }
}
module.exports = new GoodService();
