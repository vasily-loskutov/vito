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

      if (good === null) {

        return res.status(404).json(null)
      } else {

        return res.send({ good });
      }

    } catch (e) {
      next(e);
    }
  }
  async deleteGood(req, res, next) {
    try {
      const { id } = req.params;

      const good = await goodService.deleteGood(id);
      return res.send({ good });
    } catch (e) {
      next(e);
    }
  }
  async createGood(req, res, next) {
    try {
      const payload = req.body;
      const photos = req.files

      const good = await goodService.createGood(payload, photos);
      return res.send({ good });
    } catch (e) {
      next(e);
    }
  }
  async findGoodsByCategory(req, res, next) {
    try {
      const payload = req.body;
      console.log("payload=========", payload)

      const goods = await goodService.findGoodsByCategory(payload);
      console.log(goods)
      return res.send({ goods });
    } catch (e) {
      next(e);
    }
  }
  async updateGood(req, res, next) {
    try {

      const payload = req.body
      const photos = req.files
      console.log("payload===", payload)
      const good = await goodService.updateGood(payload, photos);
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
  async search(req, res, next) {
    try {
      const { message } = req.body;
      console.log(req.body)
      const findGoods = await goodService.search(message);
      console.log(findGoods)
      return res.send({ findGoods });
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

module.exports = new GoodContoller();
