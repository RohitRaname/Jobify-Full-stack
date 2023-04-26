const notFoundMiddleware= (req,res,next)=>res.status(500).send({msg:"Route does not exist"})

module.exports =notFoundMiddleware;
