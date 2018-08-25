module.exports.genRandom = function (type, n) {

  var text = "";
  var possible;
  switch (type) {
    case 'password':
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      break;
    case 'otp':
      possible = "0123456789"
      break;
    default:
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      break;
  }

  for (var i = 0; i < n; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}