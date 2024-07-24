const { User } = require('../db');

async function userCheck(req, res, next) {
    const { email, password } = req.headers;
    
    try {
        const user = await User.findOne({
            email: email,
            password: password
        });

        if (user) {
            next();
        } else {
            res.status(404).json({
                msg: 'User not found',
            });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
}

module.exports = userCheck;
