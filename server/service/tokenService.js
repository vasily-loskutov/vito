const jwt = require("jsonwebtoken");
const tokenModel = require("../models/jwt");
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { user: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({
      user: userId,
      refreshToken,
    });

    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await tokenModel.destroy({ where: { refreshToken } });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { refreshToken } });
    return tokenData;
  }
}
module.exports = new TokenService();
