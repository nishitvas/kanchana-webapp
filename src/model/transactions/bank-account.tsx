import React from "react";
import { Icon } from "../../components/simple/icon";
import moment from "moment";
import { TransactionsFileConfiguration } from "./transactions-file-configuration";

export interface BankAccountTransaction {
  date: Date,
  remarks: string,
  type: 'credit' | 'debit',
  amount: number,
  balance: number,
  sortingIndex: string,
  metadata?: any,
};

export const configuration: TransactionsFileConfiguration = {
  id: "bank-transactions",
  name: "Bank Transactions",
  fileColumnConfiguration: [
    {
      id: "slno",
      header: "Sl No.",
      value: (e: any) => parseInt(e[0]),
    },
    {
      id: "transactionDate",
      header: "Transaction Date",
      value: (e: any) => moment(e[1]).toDate().toLocaleDateString(),
    },
    {
      id: "remarks",
      header: "Remarks",
      value: (e: any) => e[2],
    },
    {
      id: "debit",
      header: "Debit",
      value: (e: any) => isNaN(parseFloat(e[3])) ? "": parseFloat(e[3]).toFixed(2),
      align: 'right',
    },
    {
      id: "credit",
      header: "Credit",
      value: (e: any) => isNaN(parseFloat(e[4])) ? "": parseFloat(e[4]).toFixed(2),
      align: 'right',
    },
    {
      id: "balance",
      header: "Balance",
      value: (e: any) => parseFloat(e[5]).toFixed(2),
      align: 'right',
    },
  ],
  columnConfigurations: [
    {
      id: "transactionDate",
      header: "Transaction Date",
      value: (e: BankAccountTransaction) => new Date(e.date).toLocaleDateString(),
    },
    {
      id: "remarks",
      header: "Remarks",
      value: (e: BankAccountTransaction) => e.remarks,
    },
    {
      id: "amount",
      header: "Amount",
      value: (e: BankAccountTransaction) => e.amount?.toFixed(2),
      align: 'right',
    },
    {
      id: "debitOrCredit",
      header: "Debit / Credit",
      value: (e: BankAccountTransaction) => e.type === 'debit' ? <span className="text-danger"><Icon type="debit"></Icon> Debit</span> : <span className="text-success"><Icon type="credit"></Icon> Credit</span>,
    },
    {
      id: "balance",
      header: "Balance",
      value: (e: BankAccountTransaction) => e.balance?.toFixed(2),
      align: 'right',
    },
  ],
  sampleItems: [
    ['0', '2022-01-01', 'Payment of fees', '10050.00', '', '100000.00'],
    ['1', '2022-01-02', 'Credit received', '', '1000.00', '101000.00'],
    ['2', '2022-01-03', 'Paid to Friend', '100.00', '', '100900.00'],
  ]
};