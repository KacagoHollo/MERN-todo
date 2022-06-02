const router = require('express').Router();
const httpModule = require('../utils/http');
const http = httpModule();
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const config = {
    google: {
        client_id: "423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com",
        client_secret: "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",
        redirect_uri: "http://localhost:3000/callback",
        token_endpoint: "https://oauth2.googleapis.com/token"
    },
    // facebook: {
    //     cliendID: "", appID?
    //     clientSecret: "", appSecret?
    //     redirectUri: "",
    //     tokenEndpoint: ""
    // }
}

router.post('/login', async (req, res) => {
    // Receive Google code -> get google token -> get userId -> googleId exists ? send jwt token : create user and send jwt token
    const payload = req.body;
    if (!payload) return res.sendStatus(400);
    
    const code = payload.code;
    const provider = payload.provider;
    if (!code || !provider) return res.sendStatus(400);

    if (!Object.keys(config).includes(provider)) return res.sendStatus(400)


    const response = await http.post(config[provider].token_endpoint, {
        code: code,
        client_id: config[provider].client_id,
        client_secret: config[provider].client_secret,
        redirect_uri: config[provider].redirect_uri,
        grant_type: "authorization_code",
        scope: "openid" 
    }); 

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401); // nem tudtuk azonosítani a user-t
    const decoded = jwt.decode(response.data.id_token);

    if (!decoded) return res.sendStatus(500);

    // find the user from db
    const key = 'providers.' + [provider];
    const user = await User.findOneAndUpdate(
        { [key]: decoded.sub },
        { providers: {[provider]: decoded.sub} },
        { upsert: true,  new: true }
    );

    const sessionToken = jwt.sign({userID: user._id, providers: user.providers}, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({sessionToken});
    // let newUser;
    // if (!user) {
    //     User.create({
    //         "providers": {[provider]: decoded.sub}
    //     },
    //     {upsert: true}
    //     )
    // }
});

module.exports = router;

//https://accounts.google.com/o/oauth2/v2/auth?client_id=423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com&response_type=code&scope=openid&redirect_uri=http://localhost:3000/callback