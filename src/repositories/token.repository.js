import db from '../config/db.js';

const create = async (token, userId, expires, type) => {
  const result = db.run(
    'INSERT INTO token (id, user_id, expires, type) VALUES (@id, @user_id, @expires, @type)',
    {
      id: token,
      user_id: userId,
      expires: expires.toString(),
      type,
    },
  );

  return result;
};

export default {
  create,
};
