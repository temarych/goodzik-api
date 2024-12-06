import { DeepPartial } from 'typeorm';
import { Partner } from './partner.entity';

export type CreatePartnerData = DeepPartial<Partner>;
export type UpdatePartnerData = CreatePartnerData;
