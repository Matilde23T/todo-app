import jwt from 'jsonwebtoken';
const JWT_SECRET = 'webdevsecret';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "Token mancante" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
if (!token) {
    return res.status(403).json({ error: "Token non valido" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token non valido o scaduto" });
    }
    // qui decoded = { username: "...", iat: ..., exp: ... }
    req.user = decoded;
    next();
  });
};
