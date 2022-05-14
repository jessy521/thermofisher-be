import { ObjectId } from "mongoose";

export class Curriculum {
    title: string;
    curriculumNo:number;
    technology: string;
    status:string;
    owner:string;
    emeaTrainer:string;
    apjTrainer:string;
    natTrainer:string;
    sme:string;
    item:[ObjectId];
    createdAt:Date;
}
