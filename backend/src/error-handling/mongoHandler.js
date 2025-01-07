import Logger from "../../utils/logger.js";

export const handleMongoError = (error)=>{
  switch(error.name){
    case 'MongoNetworkError':
      Logger.error('Network error while connecting to MongoDB...', {
        message: 'Unable to connect to db server...',
        detaile: error.message
      });
      break;

    case 'MongoError':
      switch(error.code){
        case 18:
          Logger.error('Authentication Failed: ', error.message);
          break;
        case 13:
          Logger.error('Unauthorized: ', error.message);
          break;
        default:
          Logger.error('General Mongo Error', {
            code: error.code,
            message: error.message
          });
      }
      break;

    case 'MongooseError':
      Logger.error('Mongoose-specific error: ', {
        message: error.message,
        errors: error.errors
      });
      break;

    case 'TimeOutError':
      Logger.error('Connection Timed-out: ', {
        message: 'Failed to connect to MongoDB within the specified timeout',
        details: error.message
      });
      break;

    default:
      Logger.error('Unexpected MongoDB connection error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
  }
}