import { Document, model, Schema } from 'mongoose';
import { Entities } from '../enums/id-prefix.enum';
import { generateId } from '../utils/idGenerator';

interface ITag extends Document {
  title:string,
}

const tagSchema = new Schema<ITag>(
  {
    _id:{
      type:String,
      required:true,
      default: ()=> generateId(Entities.TAG)
    },
    title:{
      type:String,
      required:true,
      unique:true,
    }
  },
  {
    versionKey: false,
    _id: false,
    timestamps: true,
  }
);
const TagModel = model<ITag>('tag', tagSchema);

export default TagModel;
