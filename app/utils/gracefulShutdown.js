module.exports = async (server) => {
    try {
      //await sequelize.close();
      //console.log('Closed database connection!');
      await server.close();
      process.exit();
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  };