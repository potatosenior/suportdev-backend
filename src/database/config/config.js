module.exports = {
  development: {
    url: process.env.DATABASE_URL || "127.0.0.1",
    database: "suportdev",
    username: "postgres",
    password: "jhonito11",
    host: "127.0.0.1",
    port: "7070",
    logging: false,
    dialect: "postgres",
  },
  test: {
    DATABASE_URL: process.env.TEST_DATABASE_URL,
    database: "suportdevtest",
    username: "postgres",
    password: "jhonito11",
    host: "127.0.0.1",
    port: "7070",
    logging: false,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    DATABASE_URL: process.env.DATABASE_URL,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
    dialect: "postgres",
    logging: false,
  },
};
