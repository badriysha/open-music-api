const responseOnSuccess = (h, { message = '', data = {}, statusCode = 200 }) => {
    return h
        .response({
            status: 'success',
            message,
            data,
        })
        .code(statusCode);
};

const responseOnServerError = (h, error = 'Server Error') => {
    console.error(error);
    return h
        .response({
            status: 'error',
            message: 'Maaf, terjadi kesalahan pada server kami.',
        })
        .code(500);
};

module.exports = { responseOnSuccess, responseOnServerError };
