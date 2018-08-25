module.exports.formateForMail = function (type, textInput) {
    switch (type) {
        case 'forgotPassword':
            const msg = '<p style="font-size:15px;">We received a request to reset the password associated with this e-mail address</p><p style="font-size:25px;">Your new password is given below</p><p style="color:red; font-size:15px;"><b>' + textInput + '</b></p><p>Thank You</p>';
            return msg
        default:
            return 'HELLO';
    }
}