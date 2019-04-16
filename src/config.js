module.exports = {
  CLIENT_ORIGIN : process.env.CLIENT_ORIGIN || 'https://viva-mexico.now.sh',
  //CLIENT_ORIGIN : 'http://localhost:3000',
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  //DB_URL: process.env.DB_URL
  //|| 'postgresql://dunder-mifflin@localhost/spaced-repetition',
  DB_URL: process.env.DATABASE_URL
     || 'postgresql://dunder-mifflin@localhost/spaced-repetition',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
};
