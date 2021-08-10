const ClientError = require('../../exceptions/ClientError');
const {
    responseOnSuccess,
    responseOnServerError,
} = require('../../helper/ResponseHelper');

class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        // binding this
        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const {
                title, year, performer, genre, duration
            } = request.payload;

            const songId = await this._service.addSong({
                title, year, performer, genre, duration,
            });

            return responseOnSuccess(h, {
               message: 'lagu berhasil ditambahkan',
               data: {
                   songId,
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

    async getSongsHandler(request, h) {
        try {
            const songs = await this._service.getSongs();
            return responseOnSuccess(h, {
                message: 'berhasil mendapatkan seluruh data lagu',
                data: {
                    songs,
                },
            });
        } catch (error) {
            return responseOnServerError(h, error);
        }
    }

    async getSongByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const song = await this._service.getSongById(id);
            return responseOnSuccess(h, {
                message: 'berhasil mendapatkan data lagu',
                data: {
                    song,
                },
            });
        } catch (error) {
            if (!(error instanceof ClientError)) {
                return responseOnServerError(h, error);
            }

            throw error;
        }
    }

    async putSongByIdHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { id } = request.params;

            await this._service.editSongById(id, request.payload);
            return responseOnSuccess(h, {
                message: 'lagu berhasil diperbarui',
                data: {
                    id,
                },
            });
        } catch (error) {
            if (!(error instanceof ClientError)) {
                return responseOnServerError(h, error);
            }

            throw error;
        }
    }

    async deleteSongByIdHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteSongById(id);
            return responseOnSuccess(h, {
                message: 'lagu berhasil dihapus',
                data: {
                    id,
                },
            });
        } catch (error) {
            if (!(error instanceof ClientError)) {
                return responseOnServerError(h, error);
            }

            throw error;
        }
    }
}

module.exports = SongsHandler;
