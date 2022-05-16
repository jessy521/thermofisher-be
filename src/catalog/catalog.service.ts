import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog } from './interface/catalog.interface';

@Injectable()
export class CatalogService {
  constructor(
    @Inject('CATALOG_MODEL')
    private catalogModel: Model<Catalog>,
  ) {}

  async create(createCatalogDto: CreateCatalogDto) {
    try {
      const newCatalog = new this.catalogModel(createCatalogDto);
      await newCatalog.save();
      return newCatalog;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  findAll() {
    return this.catalogModel.find({});
  }

  async findOne(id: string) {
    try {
      const catalogExist = await this.catalogModel.findOne({ _id: id });
      if (catalogExist !== undefined) {
        return catalogExist;
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto) {
    try {
      const catalogExist = await this.catalogModel.findOne({ _id: id });
      if (catalogExist !== undefined) {
        return this.catalogModel.findByIdAndUpdate(
          { _id: id },
          updateCatalogDto,
          { new: true },
        );
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async remove(id: string) {
    try {
      const catalogExist = await this.catalogModel.findOne({ _id: id });
      if (catalogExist !== undefined) {
        return this.catalogModel.findByIdAndDelete({ _id: id });
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}
