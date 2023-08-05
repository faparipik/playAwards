import db from '../config/db.js';
import { nanoid } from 'nanoid';
import _ from 'lodash';

const isEmailTaken = (email) => {
  const result = db.query('SELECT * FROM user WHERE email = $email', { email });
  return !_.isEmpty(result);
};

const create = ({ email, name, password }) => {
  const result = db.run(
    'INSERT INTO user (id, name, email, password) VALUES (@id, @name, @email, @password)',
    {
      id: nanoid(),
      name,
      email,
      password,
    },
  );

  return result;
};

export default {
  isEmailTaken,
  create,
};
