require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('../src/exceptions/ClientError');

// songs
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
    const songsService = new SongsService();
    const usersService = new UsersService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: songs,
            options: {
                service: songsService,
                validator: SongsValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
    ]);

    server.ext('onPreResponse', (request, h) => {
       const { response } = request;
       if (response instanceof ClientError) {
           const newResponse = h.response({
               status: 'fail',
               message: response.message,
           });
           newResponse.code(response.statusCode);
           return newResponse;
       }

       return h.continue;
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
