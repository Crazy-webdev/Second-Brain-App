import { PipelineStage } from 'mongoose';
import { ContentDTO, IGetContent, UpdateContentDTO } from '../interfaces/content.interface';
import ContentModel from '../models/content.model';

export class ContentService {
    async addContent(userId: string, body: ContentDTO):Promise<void> {
        await ContentModel.create({
            ...body,
            userId,
        });
        return;
    }

    async updateContent(id: string, data: UpdateContentDTO):Promise<void> {
        const isContent = await ContentModel.findOne({ _id: id });
        if (!isContent) {
            throw new Error('Provided content id is incorrect ');
        }
        const update = await ContentModel.findOneAndUpdate(
            { _id: id },
            { $set: { ...data } }
        );
        if (!update) {
            throw new Error('Error while updating content');
        }
        return;
    }

    async deleteContent(id: string):Promise<void> {
        const isContent = await ContentModel.findOne({ _id: id });
        if (!isContent) {
            throw new Error('Content not found');
        }
        await ContentModel.findOneAndDelete({ _id: id });
        return;
    }

    async getContent(userId: string):Promise<IGetContent[]> {
        const pipeline: PipelineStage[] = [
            { $match: { userId } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'author',
                },
            },
            { $unwind: '$author' },
            {
                $project:{
                    _id:1,
                    link: 1,
                    type: 1,
                    title: 1,
                    tags: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    user: {
                        _id: '$author._id',
                        username: '$author.username'
                    }
                }
            }
        ];
        const content = await ContentModel.aggregate(pipeline);
        if (!content || content.length === 0) {
            return [];
        }
        return content;
    }
}

export const contentService = new ContentService();
