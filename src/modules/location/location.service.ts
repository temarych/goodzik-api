import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { Location } from './location.entity';
import {
  CreateLocationData,
  UpdateLocationData,
} from './location.service.types';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  public async create(data: CreateLocationData): Promise<Location> {
    return await this.locationRepository.save(data);
  }

  public async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  public async findOne(id: string): Promise<Location | null> {
    return await this.locationRepository.findOne({ where: { id } });
  }

  public async update(id: string, data: UpdateLocationData): Promise<void> {
    const location = await this.findOne(id);

    if (!location) throw new ApiError(ApiErrorCode.EntityNotFound);

    const categories = data.categories?.map((category) => ({ id: category }));

    Object.assign(Location, { ...data, categories });

    await this.locationRepository.save(location);
  }

  public async delete(id: string): Promise<void> {
    await this.locationRepository.delete(id);
  }
}
