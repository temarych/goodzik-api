import { DeepPartial } from 'typeorm';
import { Location } from './location.entity';

export type CreateLocationData = DeepPartial<Location> & {
  categories?: string[];
};

export type UpdateLocationData = CreateLocationData;
