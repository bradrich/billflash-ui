import { IBill } from '../bill/bill.model';

export interface ITag {
  name?: string;
  color?: string;
  bills?: IBill[];

  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class Tag {

  name?: string;
  color?: string;
  bills?: IBill[];

  id?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    obj?: ITag
  ) {
    this.name = obj && obj.name ? obj.name : null;
    this.color = obj && obj.color ? obj.color : null;
    this.bills = obj && obj.bills ? obj.bills : [];

    this.id = obj && obj.id ? obj.id : null;
    this.createdAt = obj && obj.createdAt ? obj.createdAt : null;
    this.updatedAt = obj && obj.updatedAt ? obj.updatedAt : null;
  }

}
