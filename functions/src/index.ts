
const functions: any = require('firebase-functions');
const admin: any = require('firebase-admin');
admin.initializeApp();


exports.addAdminRole = functions.https.onCall((data: any, context: any) => {
// get user and add custom claim (admin)

return admin.auth().getUserByEmail(data.email).then((user: any) =>{
admin.auth().setCustomUserClaims(user.uid, {
    admin: true
})
}).then(() =>{
    return {
        message: `Success! ${data.email} has been made an admin`
    }
}).catch( (err: any) =>{
    return err;
})

})