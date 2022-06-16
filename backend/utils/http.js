const { default: axios } = require("axios")

const http = () => {
    const instance = axios.create({
        baseURL: '',
        timeout: 3000,
    });

    const post = async (...params) => {
        try {
           const response = await instance.post(...params);
           console.log("Body:", response.body)
           return response;
        } catch(err) {
            console.log(err, "Mi van már??????");
            if (!err.response) return err;
            return err.response;
        }
    }
    const get = async (...params) => {
        try {
            const response = await instance.get(...params);
            return response;
        } catch (error) {
            console.log('(get) error status: ' + error.response.status);
            console.log('(get) error data: ' + error.response.data);
            return error.response;
        }
    }
    return { post, get, _instance: instance }
    //privátként exportáljuk az instancet, így jelöljük
}

module.exports = http(); 