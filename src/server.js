require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const SongsServices = require('./services/postgres/SongsServices');
const SongsValidator = require('./validator/songs');

const init = async () => {
    const songsService = new SongsServices();
    const server = Hapi.server({
       port: process.env.PORT,
        host: process.env.HOST,
        routes: {
           origin: ['*'],
        },
    });

    await server.register({
        plugin: songs,
        options: {
            service: songsService,
            validator: SongsValidator,
        }
    });

    await server.start();
    console.log(`server berjalan pada ${server.info.uri}`);
};

init();

