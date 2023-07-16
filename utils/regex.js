const secretKey = 'secret_word';
// eslint-disable-next-line no-useless-escape
const urlRegex = /^(http|https):\/\/(www\.)?[a-zA-Z0-9\-._~:\/?#[\]@!$&'()*+,;=]{2,256}\.[a-zA-Z0-9.\/?#-]{2,}$/;
module.exports = {
  secretKey,
  urlRegex,
};
