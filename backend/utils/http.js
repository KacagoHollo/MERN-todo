const { default: axios } = require("axios")

const http = () => 
{
    const instance = axios.create({
        baseURL: baseUrl || '',
        timeout: 3000,
    });

    const post = async (...params) => {
        try {
           const response = await instance.post(...params);
           console.log("Body:", response.body)
           return response;
        } catch(err) {
            if (!err.response) return err;
            console.log(err);
            return err.response;
        }
    }
    return { post, get, _instance: instance };
}

module.exports = http(); 