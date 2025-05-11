/**
 * @file roleMiddleware.js
 * @description Middleware to restrict access based on user roles.
 * - Accepts an array of allowed roles.
 * - Blocks requests if `req.user.role` is not included.
 * Should be used after `authMiddleware` in route protection.
 * 
 * Example usage:
 * router.get('/admin-only', authMiddleware, roleMiddleware(['admin']), handler);
 */

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = roleMiddleware;
