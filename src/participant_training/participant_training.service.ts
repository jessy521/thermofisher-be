import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateParticipantTrainingDto } from './dto/create-participant_training.dto';
import { UpdateParticipantTrainingDto } from './dto/update-participant_training.dto';
import { participantTraining } from './interface/participant-training.interface';

@Injectable()
export class ParticipantTrainingService {
  constructor(
    @Inject('PARTICIPANT-TRAINING_MODEL')
    private participantTrainingModel: Model<participantTraining>,
  ) {}

  async create(createParticipantTrainingDto: CreateParticipantTrainingDto) {
    try {
      const newTraining = new this.participantTrainingModel(
        createParticipantTrainingDto,
      );
      await newTraining.save();
      return newTraining;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  findAll() {
    return this.participantTrainingModel.find({});
  }

  async findOne(id: string) {
    try {
      const training = await this.participantTrainingModel.findOne({ _id: id });
      if (training !== undefined) {
        return training;
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async update(
    id: number,
    updateParticipantTrainingDto: UpdateParticipantTrainingDto,
  ) {
    try {
      const training = await this.participantTrainingModel.findOne({ _id: id });
      if (training !== undefined) {
        return this.participantTrainingModel.findByIdAndUpdate(
          { _id: id },
          updateParticipantTrainingDto,
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
      const training = await this.participantTrainingModel.findOne({ _id: id });
      if (training !== undefined) {
        return this.participantTrainingModel.findByIdAndDelete({ _id: id });
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}
