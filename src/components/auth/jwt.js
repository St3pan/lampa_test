const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const _ = require('lodash');
const config = require('../../../config/constants');

module.exports = (app) => {
  const users = require('../users')(app);
  return new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  },
  async (jwtPayload, cb) => {
    try {
      const user = await users.getOne(jwtPayload.id);
      cb(null, _.omit(user, 'password'));
    } catch (err) {
      cb(err);
    }
  });
};
