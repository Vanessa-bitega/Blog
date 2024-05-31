
import  unauthanticated from '../errors/unauthanticated.js';
import JWT from 'jsonwebtoken';
import configurations from '../configs/index.js'

const auth = {
    verifyToken: (req, res, next) => {
        // Check for token in the cookie
        const token = req.cookies['access_token'];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    },
    authentication: async (req, res, next) => {
    
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "No token provided. Please provide a valid token." });
        }
        const token = authHeader.split(" ")[1];

        try {
            const decoded = JWT.verify(token, configurations.JWT_SECRET);
            const { id, username } = decoded
            req.user = { id, username }
        } catch (error) {
            // console.log(error);
            throw new unauthanticated("Not authorized");
        }
        next()
    }
}
export default auth