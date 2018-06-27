import { IBill } from '../bill/bill.model';
import { IFile } from '../file/file.model';

export interface IPayment {
  date?: string;
  amount?: number;
  note?: string;
  receipt?: IFile;
  bill?: IBill;

  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class Payment {

  date?: string;
  amount?: number;
  note?: string;
  receipt?: IFile;
  bill?: IBill;

  id?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    obj?: IPayment
  ) {
    this.date = obj && obj.date ? obj.date : null;
    this.amount = obj && obj.amount ? obj.amount : 0;
    this.note = obj && obj.note ? obj.note : null;
    this.receipt = obj && obj.receipt ? obj.receipt : null;
    this.bill = obj && obj.bill ? obj.bill : null;

    this.id = obj && obj.id ? obj.id : null;
    this.createdAt = obj && obj.createdAt ? obj.createdAt : null;
    this.updatedAt = obj && obj.updatedAt ? obj.updatedAt : null;
  }

}
