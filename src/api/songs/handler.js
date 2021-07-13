const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        // binding this
        this.postSongHandler = this.postSongHandler.bind(this);
    }

    async postSongHandler (request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { title, year, performer, genre, duration } = request.payload;

            const songId = await this._service.addSong({ title, year, performer, genre, duration });

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil disimpan',
                data: {
                    songId,
                },
            });
            response.code(201);
            return response;
        } catch (e) {
            if (e instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: e.message,
                });
                response.code(e.statusCode);
                return response;
            }

            // If Server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kesalahan pada server kami.',
            });
            response.code(500);
            console.error(e);
            return response;
        }
    }
}

module.exports = SongsHandler;