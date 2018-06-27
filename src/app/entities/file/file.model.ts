import { IPayment } from '../payment/payment.model';

export interface IFile {
  name?: string;
  size?: number;
  secret?: string;
  contentType?: string;
  url?: string;
  payment?: IPayment;

  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class File {

  name?: string;
  size?: number;
  secret?: string;
  contentType?: string;
  url?: string;
  payment?: IPayment;

  id?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    obj: IFile
  ) {
    this.name = obj && obj.name ? obj.name : null;
    this.size = obj && obj.size ? obj.size : 0;
    this.secret = obj && obj.secret ? obj.secret : null;
    this.contentType = obj && obj.contentType ? obj.contentType : null;
    this.url = obj && obj.url ? obj.url : null;
    this.payment = obj && obj.payment ? obj.payment : null;

    this.id = obj && obj.id ? obj.id : null;
    this.createdAt = obj && obj.createdAt ? obj.createdAt : null;
    this.updatedAt = obj && obj.updatedAt ? obj.updatedAt : null;
  }

}
