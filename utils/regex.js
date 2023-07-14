const secretKey = 'd285e3dceed844f902650f40';
const urlRegex = /^(http|https):\/\/(www\.)(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,25}$/;
module.exports = {
  secretKey,
  urlRegex,
};
