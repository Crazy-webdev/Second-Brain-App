import { ContentDTO, UpdateContentDTO } from '../interfaces/content.interface';
import ContentModel from '../models/content.model';

export class ContentService {
    async addContent(userId: string, body: ContentDTO) {
        const content = await ContentModel.create({
            ...body,
            userId,
        });
        console.log(content);
        return;
    }

    async updateContent(id: string, data: UpdateContentDTO) {
        const isContent = await ContentModel.findOne({ _id:id });
        if (!isContent) {
            throw new Error ('Provided content id is incorrect ')
        }
        const update = await ContentModel.findOneAndUpdate(
            { _id: id },
            { $set: { ...data } }
        );
        if (!update) {
            throw new Error('Error while updating content')
        }
        return;
    }

    async deleteContent(id:string) {
        const isContent = await ContentModel.findOne({ _id:id });
        if (!isContent) {
            throw new Error ('Content not found')
        }
        await ContentModel.findOneAndDelete({ _id:id });
        return;
    }

    async getContent(userId:string) {
        const content = await ContentModel.findOne({ userId });
        if (!content) {
            return [];
        }
        return content;
    }
}

export const contentService = new ContentService();
