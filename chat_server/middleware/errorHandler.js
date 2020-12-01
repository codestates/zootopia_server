//일반적인 에러 핸들링 함수 

exports.catchErrors = (fn) => {
    return function (req, res, next) {
      fn(req, res, next).catch((err) => {
        //Validation Errors
        if (typeof err === "string") {
          res.status(400).json({
            message: err,
          });
        } else {
          next(err);
        }
      });
    };
  };
  
  
  //개발 과정에서 에러가 발생할 시 
  exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || "";
    const errorDetails = {
      message: err.message,
      status: err.status,
      stack: err.stack,
    };
  
    res.status(err.status || 500).json(errorDetails); // send JSON back
  };
  
  //배포과정에서 에러 발생할 시
  exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
      error: "서버 에러가 발생했습니다",
    }); // send JSON back
  };
  
 //404 not found
  
  exports.notFound = (req, res, next) => {
    res.status(404).json({
      message: "요청하신 주소를 찾을 수 없습니다",
    });
  };
  