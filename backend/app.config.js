const config = {
    auth: {

        google: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            token_endpoint: "https://oauth2.googleapis.com/token",
            user_endpoint: null,
            user_id: null,
    
        },
        github: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: rocess.env.GITHUB_REDIRECT_URI,
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