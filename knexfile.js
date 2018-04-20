// Update with your config settings.

module.exports = {

  development: {
    //client: 'sqlite3',
    client: 'mysql',
    connection: {
      //filename: './dev.sqlite3'
      database: 'emaillist',
      user: 'root',
      password: ''
    }
  }/*,

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }*/

};
