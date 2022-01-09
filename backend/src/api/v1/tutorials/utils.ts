export {};

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const makeId = () => {
  let id = '';

  for (let i = 0; i < 5; i++) {
    id += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }

  return id;
};

module.exports = {
  makeId,
};
