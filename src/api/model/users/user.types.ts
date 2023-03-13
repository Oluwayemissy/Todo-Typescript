import { Document, Model } from 'mongoose';
export interface IUser {
    username: string,
    email: string,
    password: string
};

export interface IUserModel extends Model<IUserDocument> {
    findOneorCreate: ( 
       {
         username,
         email,
         password
      }: { username: string; email: string; password: string }
    ) => Promise<IUserDocument>;

}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}