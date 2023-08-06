import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './config.js';
import { tokenTypes } from '../constants/token.constants.js';
import userService from '../service/user.service.js';

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['AuthToken'];
  }

  return token;
};

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: cookieExtractor,
};

const jwtVerify = (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = userService.findUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

export { jwtStrategy };
