import LinkModel from '../models/link.model';
import { PipelineStage } from 'mongoose';
import { randomLink } from '../utils/hashLink';
import { GetBrainContents } from '../interfaces/link.interface';

export class BrainService {
    async shareBrain(id: string, share: string): Promise<string | void> {
        if (share === 'true') {
            const link = await LinkModel.create({
                userId: id,
                hash: randomLink(10),
            });
            return link.hash;
        } else if (share === 'false') {
            await LinkModel.deleteOne({
                userId: id,
            });
            return;
        }
        else {
            throw new Error ('Incorrect share status')
        }
    }

    async getBrain(hash:string):Promise<GetBrainContents[]> {
        const pipeline: PipelineStage[] = [
            {
                $match: { hash },
            },
            {
                $lookup:{
                    from:'users',
                    localField:'userId',
                    foreignField:'_id',
                    as:'user',
                }
            },
            {
                $lookup: {
                    from: 'contents',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'contents'
                }
            },
            {
                $unwind:'$user'
            },
            { $unwind:'$contents' },
            {
                $project: {
                    link: '$contents.link',
                    title: '$contents.title',
                    tags: '$contents.tags',
                    type: '$contents.type',
                    username:'$user.username'
                }
            }
        ]
        const contents = await LinkModel.aggregate(pipeline);

        if (!contents || !contents.length) return [];

        return contents;
    }
}

export const brainService = new BrainService();
