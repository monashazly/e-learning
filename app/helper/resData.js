const resData = (res, statusCode, apiStatus, data, message) => {
    let all = { apiStatus, data, message, }
    if (data == '') delete all.data
    res.status(statusCode).send(all)
}

module.exports = resData