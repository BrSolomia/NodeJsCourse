import { sign, verify } from 'jsonwebtoken';

export const login = (req, res) => {
    const { username, password } = req.body;
    const user = {
        username,
        password
    }

    sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        })
    })
};

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }
        });
        next();
    } else {
        res.sendStatus(401);
    }
}