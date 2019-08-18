"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

function createToken(user) {
  const payload = {
    sub: {
      _id: user._id,
      email: user.email,
      username: user.username
    },
    iat: moment().unix(),
    exp: moment()
      .add(14, "days")
      .unix()
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(bearer) {
  const token = bearer.split(" ")[1];
  const payload = jwt.decode(token, config.SECRET_TOKEN);

  if (payload.exp <= moment().unix()) {
    reject({
      status: 401,
      message: "El token ha expirado"
    });
  }
  return payload.sub;
}

module.exports = {
  createToken,
  decodeToken
};
