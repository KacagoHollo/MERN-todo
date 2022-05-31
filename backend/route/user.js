const router = require('express').Router();
const httpModule = require('../utils/http');
const http = httpModule();
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const config = {
    google: {
        client_id: "",
        client_secret: "",
        redirect_uri: "",
        token_endpoint: "",

    },
    // facebook: {
    //     cliendID: "", appID?
    //     clientSecret: "", appSecret?
    //     redirectUri: "",
    //     tokenEndpoint: ""
    // }
}

router.post('/api/login', async (req, res) => {
    // Receive Google code -> get google token -> get userId -> googleId exists ? send jwt token : create user and send jwt token
    const payload = req.body;
    if (!payload) return res.sendStatus(400);
    
    const code = payload.code;
    const provider = payload.provider;
    if (!code || !provider) return res.sendStatus(400);

    if (!Object.keys(config).includes(provider)) return res.sendStatus(400)


    const response = await http.post(config[provider].token_endpoint, {
        "code": code,
        "client_id": config[provider].client_id,
        "client_secret": config[provider].client_secret,
        "redirect_uri": config[provider].redirect_uri,
        "grant_type": "authorization_code" 
    }); 

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);
    const decoded = jwt.decode(response.data.id_token);

    if (!decoded) return res.sendStatus(500);

    // find the user from db
    const key = 'providers.' + [provider];
    const user = await User.find({[key]:decoded.sub}).where()
    decoded.sub
});

module.exports = router;