function statusResponse({ status, message, data = null, error = null }) {
    return res.status(status).send({
        status: status,
        message: message,
        data: data,
        error: error,
    });
}

module.exports = { statusResponse };