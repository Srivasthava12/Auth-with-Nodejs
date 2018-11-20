module.exports.formateForMail = function (type, textInput) {
    switch (type) {
        case 'forgotPassword':
            const msg = '<p style="font-size:15px;">We received a request to change the password associated with this e-mail address</p><p style="font-size:25px;">Please click  the link that is given below</p><a href = "https://auth-with-react.herokuapp.com/resetpassword?index=' + textInput + '">Click me!!</a><p>Thank You</p>';
            return msg
        default:
            return 'HELLO';
    }
}