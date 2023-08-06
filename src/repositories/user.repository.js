import db from '../config/db.js';
import { nanoid } from 'nanoid';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

const isEmailTaken = (email) => {
  const result = db.query('SELECT * FROM user WHERE email = $email', { email });
  return !_.isEmpty(result);
};

const create = async ({ email, name, password }) => {
  const result = db.run(
    'INSERT INTO user (id, name, email, password) VALUES (@id, @name, @email, @password)',
    {
      id: nanoid(),
      name,
      email,
      password: await bcrypt.hash(password, 8),
    },
  );

  return result;
};

const findUserById = (id) => {
  const result = db.query('SELECT * FROM user WHERE id = @id', { id });
  return result;
};

const getUserByEmail = (email) => {
  const result = db.query('SELECT * FROM user WHERE email = @email', {
    email,
  });
  return result;
};

const updateUserById = async (userId, { password }) => {
  db.run('UPDATE user SET password = @password WHERE id = @userId', {
    userId,
    password: await bcrypt.hash(password, 8),
  });
};

export default {
  isEmailTaken,
  create,
  findUserById,
  getUserByEmail,
  updateUserById,
};
