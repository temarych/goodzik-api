import { DeepPartial } from 'typeorm';
import { GuideComment } from './guide-comment.entity';

export type CreateGuideCommentData = DeepPartial<GuideComment> & {
  authorId?: string;
  guideId?: string;
};

export type UpdateGuideCommentData = DeepPartial<GuideComment>;
