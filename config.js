module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONDODB || 'mongodb://localhost/api',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'miclavedetokens',
  }
  