import { Document, model, Schema } from 'mongoose';
import { Entities } from '../enums/id-prefix.enum';
import { generateId } from '../utils/idGenerator';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    _id:{
      type:String,
      required:true,
      default: ()=> generateId(Entities.USER)
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
    timestamps: true,
  }
);
const UserModel = model<IUser>('user', userSchema);

export default UserModel;
