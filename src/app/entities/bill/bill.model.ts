import * as moment from 'moment-timezone';

import { IPayment, Payment } from '../payment/payment.model';
import { ITag, Tag } from '../tag/tag.model';
import {
  BillCategory,
  BillCustomRepeatIntervalTimeName,
  billDueSoonDaysBefore,
  BillPaymentMethod,
  BillRepeatInterval,
  BillType
} from './bill.constants';

export interface IBill {
  name?: string;
  category?: BillCategory;
  type?: BillType;
  isArchived?: boolean;
  nextDueDate?: string;
  remindDate?: string;
  amountDue?: number;
  amountVaries?: boolean;
  repeatInterval?: BillRepeatInterval;
  customRepeatIntervalIncrement?: number;
  customRepeatIntervalTimeName?: BillCustomRepeatIntervalTimeName;
  paymentMethod?: BillPaymentMethod;
  paymentUrl?: string;
  currentBalance?: number;
  origBalance?: number;
  currentLoanPaymentNumber?: number;
  origLoanTerm?: number;
  interestRate?: number;
  escrowAmount?: number;
  averagePaymentAmount?: number;
  notes?: string;
  tags?: [ITag];
  payments?: [IPayment];

  id?: string;
  createdAt?: string;
  updatedAt?: string;

  // Only for UI usage
  remind?: boolean;
  remindDaysBefore?: number;
  backgroundColor?: string;
  textColor?: string;
}

export class Bill {

  name?: string;
  category?: BillCategory;
  type?: BillType;
  isArchived?: boolean;
  nextDueDate?: string;
  remindDate?: string;
  amountDue?: number;
  amountVaries?: boolean;
  repeatInterval?: BillRepeatInterval;
  customRepeatIntervalIncrement?: number;
  customRepeatIntervalTimeName?: BillCustomRepeatIntervalTimeName;
  paymentMethod?: BillPaymentMethod;
  paymentUrl?: string;
  currentBalance?: number;
  origBalance?: number;
  currentLoanPaymentNumber?: number;
  origLoanTerm?: number;
  interestRate?: number;
  escrowAmount?: number;
  averagePaymentAmount?: number;
  notes?: string;
  tags?: [ITag];
  payments?: [IPayment];

  id?: string;
  createdAt?: string;
  updatedAt?: string;

  // Only for UI usage
  remind?: boolean;
  remindDaysBefore?: number;
  backgroundColor?: string;
  textColor?: string;

  constructor(
    obj?: IBill
  ) {
    this.name = obj && obj.name ? obj.name : null;
    this.category = obj && obj.category ? obj.category : 'COMMON_BILLS';
    this.type = obj && obj.type ? obj.type : 'MORTGAGE_AND_RENT';
    this.isArchived = obj && obj.isArchived !== undefined ? obj.isArchived : false;
    this.nextDueDate = obj && obj.nextDueDate ? obj.nextDueDate : moment().toISOString();
    this.remindDate = obj && obj.remindDate ? obj.remindDate : null;
    this.amountDue = obj && obj.amountDue ? obj.amountDue : null;
    this.amountVaries = obj && obj.amountVaries !== undefined ? obj.amountVaries : false;
    this.repeatInterval = obj && obj.repeatInterval ? obj.repeatInterval : 'MONTHLY';
    this.customRepeatIntervalIncrement = obj && obj.customRepeatIntervalIncrement
        ? obj.customRepeatIntervalIncrement
        : null;
    this.customRepeatIntervalTimeName = obj && obj.customRepeatIntervalTimeName
        ? obj.customRepeatIntervalTimeName
        : 'DAYS';
    this.paymentMethod = obj && obj.paymentMethod ? obj.paymentMethod : 'ONLINE';
    this.paymentUrl = obj && obj.paymentUrl ? obj.paymentUrl : null;
    this.currentBalance = obj && obj.currentBalance ? obj.currentBalance : null;
    this.origBalance = obj && obj.origBalance ? obj.origBalance : null;
    this.currentLoanPaymentNumber = obj && obj.currentLoanPaymentNumber
        ? obj.currentLoanPaymentNumber
        : null;
    this.origLoanTerm = obj && obj.origLoanTerm ? obj.origLoanTerm : null;
    this.interestRate = obj && obj.interestRate ? obj.interestRate : null;
    this.escrowAmount = obj && obj.escrowAmount ? obj.escrowAmount : null;
    this.averagePaymentAmount = obj && obj.averagePaymentAmount ? obj.averagePaymentAmount : null;
    this.notes = obj && obj.notes ? obj.notes : null;
    this.tags = obj && obj.tags ? obj.tags : <[Tag]>[];
    this.payments = obj && obj.payments ? obj.payments : <[Payment]>[];

    this.id = obj && obj.id ? obj.id : null;
    this.createdAt = obj && obj.createdAt ? obj.createdAt : null;
    this.updatedAt = obj && obj.updatedAt ? obj.updatedAt : null;

    this.remind = obj && obj.remind !== undefined
        ? obj.remind
        : this.remindDate ? true : false;
    this.remindDaysBefore = obj && obj.remindDaysBefore
        ? obj.remindDaysBefore
        : this.remindDate
            ? moment(this.nextDueDate).diff(moment(this.remindDate), 'days')
            : billDueSoonDaysBefore;
    this.backgroundColor = obj && obj.backgroundColor ? obj.backgroundColor : null;
    this.textColor = obj && obj.textColor ? obj.textColor : null;
  }

}
