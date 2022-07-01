const config = {
    auth: {

        google: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            token_endpoint: "https://oauth2.googleapis.com/token",
            grant_type: "authorization_code",
            user_endpoint: null,
            user_id: null,
            scope: "openid"
    
        },

        oid: {
            client_id: process.env.OID_CLIENT_ID,
            client_secret: process.env.OID_CLIENT_SECRET,
            redirect_uri: process.env.OID_REDIRECT_URI,
            token_endpoint: "https://localhost:4001/token",
            grant_type: "authorization_code",
            scope: "openid"

        },
        github: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: process.env.GITHUB_REDIRECT_URI,
            token_endpoint: "https://github.com/login/oauth/access_token",
            user_endpoint: "https://api.github.com/user",
            user_id: "id",
        },
        // facebook: {
        //     cliendID: "", appID?
        //     clientSecret: "", appSecret?
        //     redirectUri: "",
        //     tokenEndpoint: ""
        // }
    }
    
}
    module.exports = config;