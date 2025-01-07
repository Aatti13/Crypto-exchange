class Logger {
  static info(message, meta={}){
    console.log(`[INFO] ${message}`, meta);
  }

  static error(message, meta={}){
    console.error(`[ERROR] ${message}`, meta);
  }

  static warn(message, meta={}){
    console.warn(`[WARNING] ${message}`, meta);
  }
}

export default Logger;