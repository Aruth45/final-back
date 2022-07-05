const logger = (req, res, next) => {
    const url = req.path;
    const method = req.method;
    const body = req.body;
  
    console.log(`Request URL: ${url}`);
    console.log(`Request Method: ${method}`);
    if (body) console.log(`Request Body: ${JSON.stringify(body)}`);
  
    next();
  };
  
  module.exports = logger;