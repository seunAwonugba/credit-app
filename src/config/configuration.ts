export default () => ({
  database: {
    port: parseInt(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  karmaBaseUrl: process.env.KARMA_BASE_URL,
  adjutorApiKey: process.env.ADJUTOR_API_KEY,
});
