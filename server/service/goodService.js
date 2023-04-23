const Good = require("../models/good");
const PurchasedGood = require("../models/purchasedGood");
const search = require("../utils/search")
const ApiError = require("../exceptions/apiErorr")
const imageCompression = require("../utils/imageCompression")
const deleteFiles = require("../utils/deleteFiles");
const Review = require("../models/review")
const contains = require("../utils/contains")
class GoodService {
  async getGoods() {

    const goods = await Good.findAll();
    return goods;
  }
  async findGoodsByCategory(payload) {
    console.log("payload===========",payload)
    const goods = await Good.findAll({ raw: true });
    const allGoods = []
    for (let good of goods) {
      if (contains(good.categories, payload.categories)) {
        if (contains(good.subcategories, payload.subcategories)) {
          allGoods.push(good)
        }
      }

    }

    return allGoods;
  }

  async getGood(id) {

    const good = await Good.findOne({ where: { id }, raw: true });


    return good;
  }
  async deleteGood(id) {
    await Review.destroy({ where: { goodId: id } })
    const infoGood = await Good.findOne({ where: { id } })
    deleteFiles(infoGood.photo)
    const good = await Good.destroy({
      where: {
        id,
      },
    });
    return good;
  }
  async createGood(payload, photos) {

    const isCreatedGood = await Good.findOne({ where: { name: payload.name } });
    if (isCreatedGood) {
      throw ApiError.BadRequest(`Товар с таким названием уже существует`);
    }
    console.log(payload)

    const filesNames = imageCompression(photos)

    const good = await Good.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      photo: filesNames,
      rate: payload.rate,
      categories: payload.categories.split(","),
      subcategories: payload.subcategories.split(","),
      count: 1,
    });
    console.log(good)
    return good;
  }
  async updateGood(payload, photos) {
    const preGood = await Good.findOne({ where: { id: payload.id }, raw: true })
    const preGoodPhotos = preGood.photo
    console.log("preGoods====", preGoodPhotos)
    console.log("filename====", payload.filesNames)
    for (let file of preGoodPhotos) {

      if (!payload.filesNames.includes(file)) {
        deleteFiles([file])
      }
    }
    console.log(payload)
    imageCompression(photos)
    const good = await Good.update({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      photo: Array.isArray(payload.filesNames) ? payload.filesNames : [payload.filesNames],
      categories: payload.categories.split(","),
      subcategories: payload.subcategories.split(","),
      rate: payload.rate,
    }, { where: { id: payload.id } })

    return good;
  }

  async purchasedGood(payload) {

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

  async search(message) {
    const foundGoods = await Good.findAll({ raw: true })
    const result = search(message, foundGoods);
    return result;
  }
  async getPurchasedGood(id) {
    const purchasedGoods = await PurchasedGood.findAll({
      where: { userId: id },
    });

    return purchasedGoods;
  }
}
module.exports = new GoodService();
