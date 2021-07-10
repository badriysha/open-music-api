/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('songs', {
       id: {
           type: 'VARCHAR(50)',
           primaryKey: true,
       },
        title: {
           type: 'TEXT',
            notNull: true,
        },
        year: {
           type: 'TEXT',
            notNull: true,
        },
        performer: {
           type: 'TEXT',
            notNull: true,
        },
        genre: {
           type: 'TEXT',
            notNull: false,
        },
        duration: {
           type: 'INTEGER',
            notNull: false,
        },
        updated_at: {
           type: 'TEXT',
            notNull: true,
        },
        created_at: {
           type: 'TEXT',
            notNull: true,
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('songs');
};
