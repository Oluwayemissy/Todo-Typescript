import { Schema } from 'mongoose';
import { findOneOrCreate } from './user.statics';
import { toLower } from '../../../helpers';

const userSchema = new Schema({
    username: String,
    email: { 
      type: String, 
      set: toLower
    },
    password: String,
  
});
  
userSchema.statics.findOneOrCreate = findOneOrCreate;
export default userSchema;