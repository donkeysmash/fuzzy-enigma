import jwt from 'jsonwebtoken';

// Logic in this file is funky.. authRequired and addTokenPayload do the same checks
export const authRequired = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'This route requires auth'
    });
  }

  const headerAuths = req.headers.authorization.split(' ');
  if (headerAuths.length !== 2 || headerAuths[0] !== 'Bearer') {
    return res.status(401).json({
      message:
        'Check request authorization header. It should be `Bearer ${token}`'
    });
  }

  const secret = req.app.get('jwt-secret');
  try {
    req.tokenPayload = await jwt.verify(headerAuths[1], secret);
    console.log('jwt-token says : ', req.tokenPayload);
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
  next();
};

export const addTokenPayload = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  const headerAuths = req.headers.authorization.split(' ');
  if (headerAuths.length !== 2 || headerAuths[0] !== 'Bearer') {
    return next();
  }

  const secret = req.app.get('jwt-secret');
  try {
    req.tokenPayload = await jwt.verify(headerAuths[1], secret);
    console.log('jwt-token says : ', req.tokenPayload);
  } catch (err) {
    delete req.tokenPayload;
  }
  next();
};
