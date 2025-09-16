import jwt from 'jsonwebtoken';

const JWT_SECRET = "webdevsecret";
const USERS = [
    { username: 'admin', password: 'admin'}
];


export const login = (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find( (u)=> u.username === username 
        && u.password === password
    )


    if(!user) return res.status(401).json({ success: false, error: "Credenziali non valide" });

     const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ success: true, token, user: { username } });
}