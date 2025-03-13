import { Document, model, Schema } from 'mongoose';
import { Entities } from '../enums/id-prefix.enum';
import { generateId } from '../utils/idGenerator';
import { contentTypesEnum } from '../enums/contentType';

interface IContent extends Document {
  link: string;
  type: string;
  title: string;
  tags?: string[];
  userId: string;
}

const contentSchema = new Schema<IContent>(
    {
        _id: {
            type: String,
            required: true,
            default: () => generateId(Entities.CONTENT),
        },
        link: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: contentTypesEnum,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
                ref: 'tag',
            },
        ],
        userId: {
            type: String,
            ref: 'user',
            required: true,
        },
    },
    {
        versionKey: false,
        _id: false,
        timestamps: true,
    }
);
const ContentModel = model<IContent>('content', contentSchema);

export default ContentModel;
