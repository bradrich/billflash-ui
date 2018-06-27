import * as moment from 'moment-timezone';

import { BillQueryVariables, BillWhereInput } from './bill.graphql';
import { Bill } from './bill.model';

export const billPredicates = ['name', 'amountDue', 'currentBalance', 'nextDueDate'];

export type BillCategory = 'COMMON_BILLS' | 'UTILITIES' | 'TRANSPORTATION' | 'SUBSCRIPTIONS' |
    'HOME' | 'PURCHASES' | 'PERSONAL' | 'BUSINESS_AND_FINANCE';

const commonBillsCategory = 'COMMON_BILLS';
const utilitiesCategory = 'UTILITIES';
const transportationCategory = 'TRANSPORTATION';
const subscriptionsCategory = 'SUBSCRIPTIONS';
const homeCategory = 'HOME';
const purchasesCategory = 'PURCHASES';
const personalCategory = 'PERSONAL';
const businessAndFinanceCategory = 'BUSINESS_AND_FINANCE';

export const billCategoryDefault = commonBillsCategory;

export const billCategories = [commonBillsCategory, utilitiesCategory, transportationCategory,
    subscriptionsCategory, homeCategory, purchasesCategory, personalCategory,
    businessAndFinanceCategory];

export type BillType = 'MORTGAGE_AND_RENT' | 'CREDIT_CARD' | 'SMARTPHONE' | 'INSURANCE' |
    'ELECTRIC' | 'GAS' | 'INTERNET' | 'PHONE' | 'TRASH' | 'WATER' | 'BOAT' | 'CAR' | 'MOTORCYCLE' |
    'REPAIR_AND_MAINTENANCE' | 'TRAVEL' | 'CABLE_AND_VIDEO' | 'CLOUD_SERVICE' | 'MUSIC' |
    'SUBSCRIPTION' | 'CLEANING' | 'FOOD' | 'LANDSCAPING_AND_LAWN' | 'SECURITY' | 'APPLIANCE' |
    'COMPUTER' | 'FURNITURE' | 'JEWELRY' | 'SHOPPING' | 'BABY_AND_CHILDCARE' | 'DONATIONS' |
    'GYM_AND_SPORTS' | 'HAIR_AND_BEAUTY' | 'LEGAL' | 'MEDICAL' | 'ORGANIZATIONS' | 'PET' |
    'SCHOOL_AND_STUDENT_LOANS' | 'TICKET' | 'BUSINESS' | 'STORAGE_AND_DEPOSIT_BOX' |
    'LOAN_AND_SAVINGS' | 'MAIL_AND_POST_OFFICE_BOX' | 'SAVINGS' | 'TAXES';

const mortgageAndRentType = 'MORTGAGE_AND_RENT';
const creditCardType = 'CREDIT_CARD';
const smartPhoneType = 'SMARTPHONE';
const insuranceType = 'INSURANCE';
const electricType = 'ELECTRIC';
const gasType = 'GAS';
const internetType = 'INTERNET';
const phoneType = 'PHONE';
const trashType = 'TRASH';
const waterType = 'WATER';
const boatType = 'BOAT';
const carType = 'CAR';
const motorcycleType = 'MOTORCYCLE';
const repairAndMaintenanceType = 'REPAIR_AND_MAINTENANCE';
const travelType = 'TRAVEL';
const cableAndVideoType = 'CABLE_AND_VIDEO';
const cloudServiceType = 'CLOUD_SERVICE';
const musicType = 'MUSIC';
const subscriptionType = 'SUBSCRIPTION';
const cleaningType = 'CLEANING';
const foodType = 'FOOD';
const landscapingAndLawnType = 'LANDSCAPING_AND_LAWN';
const securityType = 'SECURITY';
const applianceType = 'APPLIANCE';
const computerType = 'COMPUTER';
const furnitureType = 'FURNITURE';
const jewelryType = 'JEWELRY';
const shoppingType = 'SHOPPING';
const babyAndChildcareType = 'BABY_AND_CHILDCARE';
const donationsType = 'DONATIONS';
const gymAndSportsType = 'GYM_AND_SPORTS';
const hairAndBeautyType = 'HAIR_AND_BEAUTY';
const legalType = 'LEGAL';
const medicalType = 'MEDICAL';
const organizationsType = 'ORGANIZATIONS';
const petType = 'PET';
const schoolAndStudentLoansType = 'SCHOOL_AND_STUDENT_LOANS';
const ticketType = 'TICKET';
const businessType = 'BUSINESS';
const storageAndDepositBoxType = 'STORAGE_AND_DEPOSIT_BOX';
const loanAndSavingsType = 'LOAN_AND_SAVINGS';
const mailAndPostOfficeBoxType = 'MAIL_AND_POST_OFFICE_BOX';
const savingsType = 'SAVINGS';
const taxesType = 'TAXES';

export const billCategoryTypes = new Map([
  [commonBillsCategory, [mortgageAndRentType, creditCardType, smartPhoneType, insuranceType]],
  [utilitiesCategory, [electricType, gasType, internetType, phoneType, trashType, waterType]],
  [transportationCategory, [boatType, carType, motorcycleType, repairAndMaintenanceType,
      travelType]],
  [subscriptionsCategory, [cableAndVideoType, cloudServiceType, musicType, subscriptionType]],
  [homeCategory, [cleaningType, foodType, landscapingAndLawnType, securityType]],
  [purchasesCategory, [applianceType, computerType, furnitureType, jewelryType, shoppingType]],
  [personalCategory, [babyAndChildcareType, donationsType, gymAndSportsType, hairAndBeautyType,
      legalType, medicalType, organizationsType, petType, schoolAndStudentLoansType, ticketType]],
  [businessAndFinanceCategory, [businessType, storageAndDepositBoxType, loanAndSavingsType,
      mailAndPostOfficeBoxType, savingsType, taxesType]]
]);

export const billTypeIcons = new Map([
  [mortgageAndRentType, 'home'],
  [creditCardType, 'credit_card'],
  [smartPhoneType, 'phone_iphone'],
  [insuranceType, 'beach_access'],
  [electricType, 'wb_incandescent'],
  [gasType, 'whatshot'],
  [internetType, 'public'],
  [phoneType, 'phone'],
  [trashType, 'delete'],
  [waterType, 'hot_tub'],
  [boatType, 'directions_boat'],
  [carType, 'directions_car'],
  [motorcycleType, 'motorcycle'],
  [repairAndMaintenanceType, 'build'],
  [travelType, 'flight'],
  [cableAndVideoType, 'ondemand_video'],
  [cloudServiceType, 'cloud'],
  [musicType, 'music_note'],
  [subscriptionType, 'chrome_reader_mode'],
  [cleaningType, 'local_laundry_service'],
  [foodType, 'restaurant'],
  [landscapingAndLawnType, 'nature_people'],
  [securityType, 'vpn_key'],
  [applianceType, 'kitchen'],
  [computerType, 'laptop'],
  [furnitureType, 'event_seat'],
  [jewelryType, 'flare'],
  [shoppingType, 'shopping_cart'],
  [babyAndChildcareType, 'child_care'],
  [donationsType, 'local_atm'],
  [gymAndSportsType, 'fitness_center'],
  [hairAndBeautyType, 'content_cut'],
  [legalType, 'gavel'],
  [medicalType, 'healing'],
  [organizationsType, 'domain'],
  [petType, 'pets'],
  [schoolAndStudentLoansType, 'school'],
  [ticketType, 'confirmation_number'],
  [businessType, 'store_mall_directory'],
  [storageAndDepositBoxType, 'lock'],
  [loanAndSavingsType, 'monetization_on'],
  [mailAndPostOfficeBoxType, 'markunread_mailbox'],
  [savingsType, 'account_balance'],
  [taxesType, 'business_center']
]);

export const billTypeCategories = new Map([
  [mortgageAndRentType, commonBillsCategory],
  [creditCardType, commonBillsCategory],
  [smartPhoneType, commonBillsCategory],
  [insuranceType, commonBillsCategory],
  [electricType, utilitiesCategory],
  [gasType, utilitiesCategory],
  [internetType, utilitiesCategory],
  [phoneType, utilitiesCategory],
  [trashType, utilitiesCategory],
  [waterType, utilitiesCategory],
  [boatType, transportationCategory],
  [carType, transportationCategory],
  [motorcycleType, transportationCategory],
  [repairAndMaintenanceType, transportationCategory],
  [travelType, transportationCategory],
  [cableAndVideoType, subscriptionsCategory],
  [cloudServiceType, subscriptionsCategory],
  [musicType, subscriptionsCategory],
  [subscriptionType, subscriptionsCategory],
  [cleaningType, homeCategory],
  [foodType, homeCategory],
  [landscapingAndLawnType, homeCategory],
  [securityType, homeCategory],
  [applianceType, purchasesCategory],
  [computerType, purchasesCategory],
  [furnitureType, purchasesCategory],
  [jewelryType, purchasesCategory],
  [shoppingType, purchasesCategory],
  [babyAndChildcareType, personalCategory],
  [donationsType, personalCategory],
  [gymAndSportsType, personalCategory],
  [hairAndBeautyType, personalCategory],
  [legalType, personalCategory],
  [medicalType, personalCategory],
  [organizationsType, personalCategory],
  [petType, personalCategory],
  [schoolAndStudentLoansType, personalCategory],
  [ticketType, personalCategory],
  [businessType, businessAndFinanceCategory],
  [storageAndDepositBoxType, businessAndFinanceCategory],
  [loanAndSavingsType, businessAndFinanceCategory],
  [mailAndPostOfficeBoxType, businessAndFinanceCategory],
  [savingsType, businessAndFinanceCategory],
  [taxesType, businessAndFinanceCategory]
]);

export type BillRepeatInterval = 'WEEKLY' | 'EVERY_OTHER_WEEK' | 'MONTHLY' | 'QUARTERLY' |
    'EVERY_6_MONTHS' | 'EVERY_YEAR' | 'CUSTOM' | 'NEVER';

export const billRepeatIntervalDefault = 'MONTHLY';

export const billRepeatIntervals = [
  'WEEKLY',
  'EVERY_OTHER_WEEK',
  'MONTHLY',
  'QUARTERLY',
  'EVERY_6_MONTHS',
  'EVERY_YEAR',
  'CUSTOM',
  'NEVER'
];
export const billRepeatIntervalsMap = new Map([
  ['WEEKLY', 'Weekly'],
  ['EVERY_OTHER_WEEK', 'Every other week'],
  ['MONTHLY', 'Monthly'],
  ['QUARTERLY', 'Quarterly'],
  ['EVERY_6_MONTHS', 'Every 6 months'],
  ['EVERY_YEAR', 'Every year'],
  ['CUSTOM', 'Custom'],
  ['NEVER', 'Never']
]);

export type BillCustomRepeatIntervalTimeName = 'DAYS' | 'WEEKS' | 'MONTHS' | 'FIRST_FRIDAY';

export const billCustomRepeatIntervalTimeNameDefault = 'DAYS';

export const billCustomRepeatIntervalTimeNames = ['DAYS', 'WEEKS', 'MONTHS', 'FIRST_FRIDAY'];

export type BillPaymentMethod = 'ONLINE' | 'AUTOMATIC' | 'MAIL' | 'PHONE' | 'OTHER';

export const billPaymentMethodDefault = 'ONLINE';

export const billPaymentMethods = ['ONLINE', 'AUTOMATIC', 'MAIL', 'PHONE', 'OTHER'];

export const billDueSoonDaysBefore = 10;

export const billActiveWhere: BillWhereInput = {
  isArchived: false
};
export const billArchivedWhere: BillWhereInput = {
  isArchived: true
};
export const billDueSoonWhere: BillWhereInput = {
  nextDueDate_lte: moment().add(billDueSoonDaysBefore, 'days').toISOString()
};
export const billDueThisMonthWhere: BillWhereInput = {
  nextDueDate_lte: moment().endOf('month').toISOString()
};

export const billQueryVariablesInitial: BillQueryVariables = {
  where: billActiveWhere,
  orderBy: 'nextDueDate_ASC'
};

export interface BillUpdatePayload {
  bill: Bill;
  queryVariables: BillQueryVariables;
}
