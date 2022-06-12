const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');

    // const newUser = new User({ username: "macska", googleId: "1111000" })
    // await newUser.save();


    const startDB = async () => {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        const connection = await mongoose.connect(uri);
        return [mongod, connection]
    }

    //számít a sorrend, a getDashboardon ellenőrizd
    const stopDB = async (mongod, connection) => {
        await connection.disconnect();
        await mongod.stop();
    }
    
    const deleteAll = async (...collections) => {
        // for (const collection of collections) {
            //     collection.deleteMany()
            // }
            const promises = collections.map(collection => collection.deleteMany());
            await Promise.all(promises); //egy listányi collectionből(mindegyikből) csinál egy ígéretet és várjuk, hogy beteljesüljön
    }

        
    module.exports = { startDB, stopDB, deleteAll };