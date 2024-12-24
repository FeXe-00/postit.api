function statusResponse({ res, status, message, data = null, error = null }) {
    return res.status(status).send({
        status: status || 500,
        message: message,
        data: data,
        error: error,
    });
}

module.exports = { statusResponse };
