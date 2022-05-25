
exports.auth = (middlewareParams) => (req, res, next) => {
        console.log("Authentication");
        // let a;
        // console.log(a.b.c)
        const userId = req.header('authorization');
        res.locals.userId = userId;
        if (middlewareParams.block && !res.locals.userId) return res.sendStatus(401)
        next();
    }