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

const findToken = (token, type, user) => {
  const result = db.query(
    'SELECT * FROM token WHERE id = @token AND type = @type AND user_id = @userId',
    { token, type, userId: user },
  );
  return result;
};

const deleteMany = (userId, type) => {
  db.run('DELETE FROM token WHERE user_id = @userId AND type = @type', {
    userId,
    type,
  });
};

export default {
  create,
  findToken,
  deleteMany,
};
