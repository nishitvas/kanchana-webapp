import React, { useEffect, useState } from "react";
import { createBankAccount, deleteBankAccount, getBankTransactions, getRegisteredAccounts } from "../../api/bank-accounts";
import { BankAccountTransaction, configuration as BankAccountConfiguration } from "../../model/transactions/bank-account";
import { BankAccount } from "../../model/bank-account";
import { Button } from "../simple/button";
import { Icon } from "../simple/icon";
import { Modal } from "../simple/modal";
import { Table } from "../simple/table";

export interface BankAccountsTabProps {

}

type BankAccountTransactionsMap = {
  [k: string]: BankAccountTransaction[]
};

export const BankAccountsTab = () => {

  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const [accountNameInput, setAccountNameInput] = useState<string>("");
  const [accountNumberInput, setAccountNumberInput] = useState<string>("");
  const [accountBankInput, setAccountBankInput] = useState<string>("");

  const [selectedAccountId, setSelectedAccountId] = useState<string>();
  const [accountTransactions, setAccountTransactions] = useState<BankAccountTransactionsMap>({});

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addBtnLoading, setAddBtnLoading] = useState(false);

  const fetchAccounts = async () => {
    setAccountTransactions({});
    const response = await getRegisteredAccounts();
    const _accounts = await response;
    setAccounts(_accounts);
    _accounts.forEach((account: BankAccount) => {
      fetchTransactions(account);
    });
  };

  const fetchTransactions = async (bankAccount: BankAccount) => {
    const response = await getBankTransactions(bankAccount);
    const _transactions = await response;
    setAccountTransactions({
      ...accountTransactions,
      [bankAccount.id]: _transactions,
    });
    console.log({
      ...accountTransactions,
      [bankAccount.id]: _transactions,
    });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const addBankAccount = async () => {
    setAddBtnLoading(true);
    const bankAccount: BankAccount = {
      id: 'null',
      name: accountNameInput,
      accountNumber: accountNumberInput,
      bank: accountBankInput,
    }
    const apiCall = async (a: BankAccount) => createBankAccount(a);
    await apiCall(bankAccount);
    await fetchAccounts();
    setAddBtnLoading(false);
    setAddModalVisible(false);
  }

  const deleteAccount = (id: string | undefined) => {
    if (id) {
      deleteBankAccount(id);
      fetchAccounts();
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-end">
        <div className="col-3" style={{textAlign: 'end'}}>
          <Button
            icon={<Icon type="newAccount"/>}
            text="Add Account"
            onClick={() => setAddModalVisible(true)}
          />
          &nbsp;&nbsp;
          <Button
            variant="danger"
            icon={<Icon type="delete"/>}
            text="Delete Account"
            disabled={!selectedAccountId}
            onClick={() => deleteAccount(selectedAccountId)}
          />
        </div>
      </div>
      <br/>
      <Table
        columnConfigurations={[
          {
            id: "input",
            header: "Select",
            value: (e: BankAccount) => <input type="radio" name="accountIdInput" value={e.id} onChange={() => setSelectedAccountId(e.id)}/>
          },
          {
            id: "accountNumber",
            header: "Account Number",
            value: (e: BankAccount) => e.accountNumber,
          },
          {
            id: "name",
            header: "Name",
            value: (e: BankAccount) => e.name,
          },
          {
            id: "bank",
            header: "Bank",
            value: (e: BankAccount) => e.bank,
          },
        ]}
        items={accounts}
      />
      {selectedAccountId ? 
        <Table
          columnConfigurations={BankAccountConfiguration.columnConfigurations}
          items={selectedAccountId ? accountTransactions[selectedAccountId] : []}
        />
      : ''}
      <Modal
        id="createAccountModal"
        title="Create Account"
        visible={addModalVisible}
        onDismiss={() => setAddModalVisible(false)}
        content={
          <form>
            <div className="mb-3">
              <label htmlFor="accountName" className="form-label">Account Name</label>
              <input className="form-control" type="text" id="accountName" onChange={(e) => setAccountNameInput(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="accountNumber" className="form-label">Account Number</label>
              <input className="form-control" type="text" id="accountNumber" onChange={(e) => setAccountNumberInput(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="accountBank" className="form-label">Account Bank</label>
              <input className="form-control" type="text" id="accountBank" onChange={(e) => setAccountBankInput(e.target.value)}/>
            </div>
          </form>
        }
        footer={
          <Button
            text="Add"
            icon={<Icon type="newAccount"/>}
            onClick={addBankAccount}
            loading={addBtnLoading}
          />
        }
      />
    </div>
  )
}