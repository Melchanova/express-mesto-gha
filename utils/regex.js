const secretKey = 'secret_word';
const urlRegex = /^(http|https):\/\/(www\.)(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,26}$/;
module.exports = {
  secretKey,
  urlRegex,
};
