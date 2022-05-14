import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './interface/item.interface';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_MODEL')
    private itemModel: Model<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    try {
      const newParticipant = new this.itemModel(createItemDto);
      await newParticipant.save();
      return newParticipant;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  findAll() {
    return this.itemModel.find({});
  }

  async findOne(id: string) {
    try {
      const participantExist = await this.itemModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return participantExist;
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    try {
      const participantExist = await this.itemModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return this.itemModel.findByIdAndUpdate({ _id: id }, updateItemDto, {
          new: true,
        });
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async remove(id: string) {
    try {
      const participantExist = await this.itemModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return this.itemModel.findByIdAndDelete({ _id: id });
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}
