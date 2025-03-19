import { Document, model, Schema } from 'mongoose';
import { Entities } from '../enums/id-prefix.enum';
import { generateId } from '../utils/idGenerator';

interface ILink extends Document {
    userId: string;
    hash: string;
}

const linkSchema = new Schema<ILink>(
    {
        _id: {
            type: String,
            required: true,
            default: () => generateId(Entities.LINK),
        },
        userId: {
            type: String,
            required: true,
            ref: 'user',
            unique: true,
        },
        hash: {
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
const LinkModel = model<ILink>('link', linkSchema);

export default LinkModel;
