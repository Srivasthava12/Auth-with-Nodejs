# Instructions
## If you would like to download the code and try it for yourself:
 - *Clone the repo:* `git clone https://github.com/Srivasthava12/Auth-with-Nodejs.git`
 - *Go into the project folder:* `cd Auth-Node`
 - *Install packages:* `npm install`
 - *Change out the database configuration in cred/database.js*
 - *Change out the email credentials in cred/emailcred.js*
 - *Launch:* `node app.js`
 - Visit in your browser at: `http://localhost:3000`

## The endpoints available are:

- **Regsiter**
- **Authenticate**
- **Profile**
- **Change Password**
- **Forgot Password**

### **Regsiter**  
- The route for this is `/users/register` which is a POST request.
- The body data required to POST to this route must be a JSON object with below properties:
> name, email, userName & password


### **Authenticate**  
- The route for this is `/users/authenticate` which is a POST request.
- The body data required to POST to this route must be a JSON object with below properties:
> email & password


### **Profile**  
- The route for this is `/users/profile` which is a GET request.
- To access this route, you have to be authenticated and have the JWT token.
 

### **Change Password**  
- The route for this is `/users/changepassword` which is a POST request.
- To access this route, you have to be authenticated and have the JWT token.
- The body data required to POST to this route must be a JSON object with below properties:
> oldPassword & newPassword


### **Forgot Password**  Endpoint
- The route for this is `/users/forgotpassword` which is a POST request.
- This would generate a mail conatining a New Password and will be sent to the Regsitered email.
- The body data required to POST to this route must be a JSON object with below properties:
> email
