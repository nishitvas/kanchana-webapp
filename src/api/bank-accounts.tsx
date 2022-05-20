import { BankAccount } from "../model/bank-account";
import { BankAccountTransaction } from "../model/transactions/bank-account";

const BASE_URL = "/bank-accounts";

export const getRegisteredAccounts = async () => {
  return fetch(BASE_URL)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export const createBankAccount = async (bankAccount: BankAccount) => {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bankAccount)
  });
}

export const deleteBankAccount = async (id: string) => {
  return fetch(BASE_URL + `/${id}`, {
    method: 'DELETE'
  });
}

export const uploadBankTransactions = async (
  bankAccount: BankAccount, transactions: BankAccountTransaction[], tid: string
) => {
  return fetch(BASE_URL + `/${bankAccount.id}/transactions/${tid}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(transactions)
  });
}

export const getBankTransactions = async (
  bankAccount: BankAccount
) => {
  return fetch(BASE_URL + `/${bankAccount.id}/transactions`)
    .then(res => res.json())
    .catch(err => console.error(err));
}