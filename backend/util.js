import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(200).send({ isAuthenticated: false });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(200).send({ isAuthenticated: false });
        req.user = decoded;
        next();
    });
}


export { verifyToken };