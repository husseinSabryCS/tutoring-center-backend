const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET ; 

class AuthMiddleware {
    
    static verifyToken(req, res, next) { 
        const token = req.headers.authorization?.split(' ')[1]; // عادةً يكون التوكين في ترويسة 'Authorization: Bearer TOKEN'

        if (token) {
            try {
                const decoded = jwt.verify(token, secret);
                req.user = decoded;
                next();
            } 
            catch (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
        } else {
            return res.status(401).json({ message: 'Authorization token required' });
        }
    } 

    static authorize(roles) {
        return (req, res, next) => {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Unauthorized access' });
            }
            next();
        };
    }
}

module.exports = AuthMiddleware;
