import mongoose from 'mongoose';
import {logger} from '../../config/logger';
import * as messages from '../../constants/messages';
import { DB_URL } from '../../constants';

export const connect = async () => {
  try {
    await mongoose.connect(DB_URL as string);
    logger("info", `${messages.CURRENT_TIME_STAMP} Database Connected`);
  } catch (error: any) {
    logger("error", error.message);
    setTimeout(connect, 5000);
  }
};