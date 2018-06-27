import gql from 'graphql-tag';

import {
  BillCategory,
  BillCustomRepeatIntervalTimeName,
  BillPaymentMethod,
  BillRepeatInterval,
  BillType
} from './bill.constants';
import { Bill } from './bill.model';

export interface BillWhereInput {
  AND?: BillWhereInput[];
  OR?: BillWhereInput[];
  name?: string;
  name_not?: string;
  name_in?: string[];
  name_not_in?: string[];
  name_lt?: string;
  name_lte?: string;
  name_gt?: string;
  name_gte?: string;
  name_contains?: string;
  name_not_contains?: string;
  name_starts_with?: string;
  name_not_starts_with?: string;
  name_ends_with?: string;
  name_not_ends_with?: string;
  category?: BillCategory;
  category_not?: BillCategory;
  category_in?: BillCategory[];
  category_not_in?: BillCategory[];
  type?: BillType;
  type_not?: BillType;
  type_in?: BillType[];
  type_not_in?: BillType[];
  isArchived?: boolean;
  isArchived_not?: boolean;
  nextDueDate?: string;
  nextDueDate_not?: string;
  nextDueDate_in?: string[];
  nextDueDate_not_in?: string[];
  nextDueDate_lt?: string;
  nextDueDate_lte?: string;
  nextDueDate_gt?: string;
  nextDueDate_gte?: string;
  remindDate?: string;
  remindDate_not?: string;
  remindDate_in?: string[];
  remindDate_not_in?: string[];
  remindDate_lt?: string;
  remindDate_lte?: string;
  remindDate_gt?: string;
  remindDate_gte?: string;
  amountDue?: number;
  amountDue_not?: number;
  amountDue_in?: number[];
  amountDue_not_in?: number[];
  amountDue_lt?: number;
  amountDue_lte?: number;
  amountDue_gt?: number;
  amountDue_gte?: number;
  amountVaries?: boolean;
  amountVaries_not?: boolean;
  repeatInterval?: BillRepeatInterval;
  repeatInterval_not?: BillRepeatInterval;
  repeatInterval_in?: BillRepeatInterval[];
  repeatInterval_not_in?: BillRepeatInterval[];
  customRepeatIntervalIncrement?: number;
  customRepeatIntervalIncrement_not?: number;
  customRepeatIntervalIncrement_in?: number[];
  customRepeatIntervalIncrement_not_in?: number[];
  customRepeatIntervalIncrement_lt?: number;
  customRepeatIntervalIncrement_lte?: number;
  customRepeatIntervalIncrement_gt?: number;
  customRepeatIntervalIncrement_gte?: number;
  customRepeatIntervalTimeName?: BillCustomRepeatIntervalTimeName;
  customRepeatIntervalTimeName_not?: BillCustomRepeatIntervalTimeName;
  customRepeatIntervalTimeName_in?: BillCustomRepeatIntervalTimeName[];
  customRepeatIntervalTimeName_not_in?: BillCustomRepeatIntervalTimeName[];
  paymentMethod?: BillPaymentMethod;
  paymentMethod_not?: BillPaymentMethod;
  paymentMethod_in?: BillPaymentMethod[];
  paymentMethod_not_in?: BillPaymentMethod[];
  paymentUrl?: string;
  paymentUrl_not?: string;
  paymentUrl_in?: string[];
  paymentUrl_not_in?: string[];
  paymentUrl_lt?: string;
  paymentUrl_lte?: string;
  paymentUrl_gt?: string;
  paymentUrl_gte?: string;
  paymentUrl_contains?: string;
  paymentUrl_not_contains?: string;
  paymentUrl_starts_with?: string;
  paymentUrl_not_starts_with?: string;
  paymentUrl_ends_with?: string;
  paymentUrl_not_ends_with?: string;
  currentBalance?: number;
  currentBalance_not?: number;
  currentBalance_in?: number[];
  currentBalance_not_in?: number[];
  currentBalance_lt?: number;
  currentBalance_lte?: number;
  currentBalance_gt?: number;
  currentBalance_gte?: number;
  origBalance?: number;
  origBalance_not?: number;
  origBalance_in?: number[];
  origBalance_not_in?: number[];
  origBalance_lt?: number;
  origBalance_lte?: number;
  origBalance_gt?: number;
  origBalance_gte?: number;
  currentLoanNumber?: number;
  currentLoanNumber_not?: number;
  currentLoanNumber_in?: number[];
  currentLoanNumber_not_in?: number[];
  currentLoanNumber_lt?: number;
  currentLoanNumber_lte?: number;
  currentLoanNumber_gt?: number;
  currentLoanNumber_gte?: number;
  origLoanTerm?: number;
  origLoanTerm_not?: number;
  origLoanTerm_in?: number[];
  origLoanTerm_not_in?: number[];
  origLoanTerm_lt?: number;
  origLoanTerm_lte?: number;
  origLoanTerm_gt?: number;
  origLoanTerm_gte?: number;
  interestRate?: number;
  interestRate_not?: number;
  interestRate_in?: number[];
  interestRate_not_in?: number[];
  interestRate_lt?: number;
  interestRate_lte?: number;
  interestRate_gt?: number;
  interestRate_gte?: number;
  escrowAmount?: number;
  escrowAmount_not?: number;
  escrowAmount_in?: number[];
  escrowAmount_not_in?: number[];
  escrowAmount_lt?: number;
  escrowAmount_lte?: number;
  escrowAmount_gt?: number;
  escrowAmount_gte?: number;
  averagePaymentAmount?: number;
  averagePaymentAmount_not?: number;
  averagePaymentAmount_in?: number[];
  averagePaymentAmount_not_in?: number[];
  averagePaymentAmount_lt?: number;
  averagePaymentAmount_lte?: number;
  averagePaymentAmount_gt?: number;
  averagePaymentAmount_gte?: number;
  notes?: string;
  notes_not?: string;
  notes_in?: string[];
  notes_not_in?: string[];
  notes_lt?: string;
  notes_lte?: string;
  notes_gt?: string;
  notes_gte?: string;
  notes_contains?: string;
  notes_not_contains?: string;
  notes_starts_with?: string;
  notes_not_starts_with?: string;
  notes_ends_with?: string;
  notes_not_ends_with?: string;
  tags_every?: any;
  tags_some?: any;
  tags_none?: any;
  payments_every?: any;
  payments_some?: any;
  payments_none?: any;
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_lt?: string;
  id_lte?: string;
  id_gt?: string;
  id_gte?: string;
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_not_starts_with?: string;
  id_ends_with?: string;
  id_not_ends_with?: string;
}
export interface BillQueryVariables {
  where?: BillWhereInput;
  orderBy?: string;
  skip?: number;
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

export const BillsQuery = gql`
  query Bills($where: BillWhereInput, $orderBy: BillOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    bills(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
      name
      category
      type
      isArchived
      nextDueDate
      remindDate
      amountDue
      amountVaries
      repeatInterval
      customRepeatIntervalIncrement
      customRepeatIntervalTimeName
      paymentMethod
      paymentUrl
      currentBalance
      origBalance
      currentLoanPaymentNumber
      origLoanTerm
      interestRate
      escrowAmount
      averagePaymentAmount
      notes
      tags(orderBy: name_ASC) {
        name
        color
        id
        createdAt
        updatedAt
      }
      payments(orderBy: date_DESC) {
        date
        amount
        note
        receipt {
          name
          size
          secret
          contentType
          url
          id
          createdAt
          updatedAt
        }
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export interface BillsQueryResponse {
  bills: Bill[];
}

export const BillQuery = gql`
  query Bill($where: BillWhereUniqueInput!) {
    bill(where: $where) {
      name
      category
      type
      isArchived
      nextDueDate
      remindDate
      amountDue
      amountVaries
      repeatInterval
      customRepeatIntervalIncrement
      customRepeatIntervalTimeName
      paymentMethod
      paymentUrl
      currentBalance
      origBalance
      currentLoanPaymentNumber
      origLoanTerm
      interestRate
      escrowAmount
      averagePaymentAmount
      notes
      tags(orderBy: name_ASC) {
        name
        color
        id
        createdAt
        updatedAt
      }
      payments(orderBy: date_DESC) {
        date
        amount
        note
        receipt {
          name
          size
          secret
          contentType
          url
          id
          createdAt
          updatedAt
        }
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export interface BillQueryResponse {
  bill: Bill;
}

export const CreateBillMutation = gql`
  mutation CreateBill($data: BillCreateInput!) {
    createBill(data: $data) {
      id
    }
  }
`;
export interface CreateBillMutationResponse {
  bill: Bill;
}

export const UpdateBillMutation = gql`
  mutation UpdateBill($data: BillUpdateInput!, $where: BillWhereUniqueInput!) {
    updateBill(data: $data, where: $where) {
      id
    }
  }
`;
export interface UpdateBillMutationResponse {
  bill: Bill;
}

export const DeleteBillMutation = gql`
  mutation DeleteBill($where: BillWhereUniqueInput!) {
    deleteBill(where: $where) {
      id
    }
  }
`;
