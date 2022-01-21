const resData = (res, statusCode, apiStatus, data, message) => {
    res.status(statusCode).send({
        apiStatus,
        data,
        message,
    })
}

module.exports = resData