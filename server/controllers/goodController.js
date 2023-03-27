const goodService = require("../service/goodService");

class GoodContoller {
  async getGoods(req, res, next) {
    try {
      const goods = await goodService.getGoods();
      return res.send(goods);
    } catch (e) {
      next(e);
    }
  }
  async getGoodById(req, res, next) {
    try {
      const { id } = req.params;
      const good = await goodService.getGood(id);
      return res.send(good);
    } catch (e) {
      next(e);
    }
  }
  async deleteGood(req, res, next) {
    try {
      const { id } = req.params;
      const good = await goodService.getGood(id);
      return res.send({ good });
    } catch (e) {
      next(e);
    }
  }
  async createGood(req, res, next) {
    try {
      const payload = req.body;
      const good = await goodService.createGood(payload);
      return res.send({ good });
    } catch (e) {
      next(e);
    }
  }
  async purchasedGood(req, res, next) {
    try {
      const payload = req.body;
      const good = await goodService.purchasedGood(payload);
      return res.send({ good });
    } catch (e) {
      next(e);
    }
  }
  async getPurchasedGood(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const goods = await goodService.getPurchasedGood(id);

      return res.send({ goods });
    } catch (e) {
      next(e);
    }
  }
}
{
}
module.exports = new GoodContoller();
