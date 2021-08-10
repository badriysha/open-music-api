const ClientError = require('../../exceptions/ClientError');
const {
    responseOnSuccess,
    responseOnServerError,
} = require('../../helper/ResponseHelper');

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        // bind this
        this.postUserHandler = this.postUserHandler.bind(this);
    }

    async postUserHandler(request, h) {
        try {
            this._validator.validateUserPayload(request.payload);

            const { username, password, fullname } = request.payload;
            const userId = await this._service.addUser({ username, password, fullname });

            return responseOnSuccess(h, {
               message: 'User berhasil ditambahkan',
               data: {
                   userId,
               },
                statusCode: 201,
            });
        } catch (error) {
            if (!(error instanceof ClientError)) {
                return responseOnServerError(h, error);
            }

            throw error;
        }
    }
}

module.exports = UsersHandler;
