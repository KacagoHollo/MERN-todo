const router = require('express').Router();
const http = require('../utils/http')
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const auth = require('../middleware/auth')
const config = require("../app.config")



router.post('/login', auth({block: false}), async (req, res) => {
    // Receive Google code -> get google token -> get userId -> googleId exists ? send jwt token : create user and send jwt token
    const payload = req.body;
    if (!payload) return res.sendStatus(400);
    
    const code = payload.code;
    const provider = payload.provider;
    if (!code || !provider) return res.sendStatus(400);

    if (!Object.keys(config.auth).includes(provider)) return res.status(400).send("Wrong payload")


    const response = await http.post(config.auth[provider].token_endpoint, {
        "code": code,
        "client_id": config.auth[provider].client_id,
        "client_secret": config.auth[provider].client_secret,
        "redirect_uri": config.auth[provider].redirect_uri,
        "grant_type": config.auth[provider].grant_type,
    },
        {
            headers: {
                Accept: "application/json",
            },
        }
        // scope: "openid" 
    ); 

    if (!response) return res.sendStatus(504);
    if (response.status !== 200) return res.sendStatus(401);
    
    let oId;
    const onlyOauth = !response.data.id_token;
    if (onlyOauth) {
        let accesToken = response.data.access_token;
        const userResponse = await http.get(
            config.auth[provider].user_endpoint, {
                headers: {
                    authorization: "Bearer " + accesToken,
                },
            }
        );
        if (!response) return res.sendStatus(502)
        if (response.status !== 200) return res.sendStatus(401);
        const id = config.auth[provider].user_id
        oId = userResponse.data[id];
        // oId = userResponse.data.id;
    } else {
        const decoded = jwt.decode(response.data.id_token);
        if (!decoded) return res.sendStatus(500)
        oId = decoded.sub;
    }
    // res.sendStatus(401); // nem tudtuk azonosítani a user-t
    // console.log(response.data)

    // const decoded = jwt.decode(response.data.id_token);

    // if (!decoded) return res.sendStatus(500);

    // find the user from db
    const key = `providers.${provider}`;
    const user = await User.findOne(
        { [key]: oId },
        //ez volt a findoneAndUpdate-el
        // { providers: {[provider]: oId} }, 
        // { upsert: true,  new: true }
    ); // already "registered" user in DB

    if (user && res.locals.user?.providers) {
        user.providers = {...user.providers, ...res.locals.user.providers}; // append a new provider to its existing one
        user = await user.save()
    }

    // ? = optional chaining
    const sessionToken = jwt.sign({"userID": user?._id, "providers": user ? user.providers : { [provider]: oId }}, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ sessionToken });
    // let newUser;
    // if (!user) {
    //     User.create({
    //         "providers": {[provider]: decoded.sub}
    //     },
    //     {upsert: true}
    //     )
    // }
});

// creating user
router.post("/create", auth({block: true}), async (req, res) => {
    // res.locals.user elérhető itt
    if (!req.body?.username) return res.sendStatus(400);
    const user = await User.create({username: req.body.username, providers: res.locals.user.providers});

    const sessionToken = jwt.sign({"userID": user._id, "providers": user.providers }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ sessionToken });
});

module.exports = router;

//https://accounts.google.com/o/oauth2/v2/auth?client_id=423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com&response_type=code&scope=openid&redirect_uri=http://localhost:3000/callback