import { ObjectId } from "mongoose";

export class Item {
    courceType:string;
    itemNo: string;
    sflmsName:string;
    psgCertificate:boolean;
    noCertificate:boolean;
    dx: boolean;
    dueDateDays:string;
    owner:string;
    curriculumId:[ObjectId];
    launchDate:Date;
    createdAt: Date;
}
