import { BankAccountTransaction } from "./transactions";

export interface BankAccount {
  id: string,
  accountNumber: string,
  name: string,
  bank: string,
}
