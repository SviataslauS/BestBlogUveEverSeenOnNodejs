
const paths = {
    login: '/login',
  };

class LoginController {
    static get paths() {
        return paths;
    }

    static login (req, res) {
        const cookies = req.cookies || {};
        if (!cookies.auth) {
            
        }  
}
}


module.exports = LoginController;