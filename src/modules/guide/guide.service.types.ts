import { DeepPartial } from 'typeorm';
import { GuideStep } from '@modules/guide-step/guide-step.entity';
import { Guide } from './guide.entity';

export type CreateGuideData = DeepPartial<Guide> & {
  categories?: string[];
  steps?: DeepPartial<GuideStep>[];
};

export type UpdateGuideData = CreateGuideData;
