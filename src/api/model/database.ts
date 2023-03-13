import mongoose from 'mongoose';
import {logger} from '../../config/logger';
import * as messages from '../../constants/messages';

const DB_URL = 'mongodb://Yemissy:2wrSD3hGET29UmHA@ac-sysnrzd-shard-00-00.brzciyu.mongodb.net:27017,ac-sysnrzd-shard-00-01.brzciyu.mongodb.net:27017,ac-sysnrzd-shard-00-02.brzciyu.mongodb.net:27017/?ssl=true&replicaSet=atlas-w60oke-shard-0&authSource=admin&retryWrites=true&w=majority'
export const connect = async () => {
  try {
    await mongoose.connect(DB_URL);
    logger("info", `${messages.CURRENT_TIME_STAMP} Database Connected`);
  } catch (error: any) {
    logger("error", error.message);
    setTimeout(connect, 5000);
  }
};