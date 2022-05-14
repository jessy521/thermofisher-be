import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { Curriculum } from './interface/curriculum.interface';

@Injectable()
export class CurriculumService {
  constructor(
    @Inject('CURRICULUM_MODEL')
    private curriculumModel: Model<Curriculum>,
  ) {}

  async create(createCurriculumDto: CreateCurriculumDto) {
    try {
      const newParticipant = new this.curriculumModel(createCurriculumDto);
      await newParticipant.save();
      return newParticipant;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  findAll() {
    return this.curriculumModel.find({});
  }

  async findOne(id: string) {
    try {
      const participantExist = await this.curriculumModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return participantExist;
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async update(id: string, updateCurriculumDto: UpdateCurriculumDto) {
    try {
      const participantExist = await this.curriculumModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return this.curriculumModel.findByIdAndUpdate(
          { _id: id },
          updateCurriculumDto,
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
      const participantExist = await this.curriculumModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return this.curriculumModel.findByIdAndDelete({ _id: id });
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}
