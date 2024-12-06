import { DeepPartial } from 'typeorm';
import { Guide } from './guide.entity';

export type CreateGuideData = DeepPartial<Guide> & {
  categories?: string[];
};

export type UpdateGuideData = CreateGuideData;
