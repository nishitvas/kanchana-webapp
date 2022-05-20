import React, { useEffect, useState } from "react";
import { Button } from "../simple/button";
import { Icon } from "../simple/icon";
import Papa from "papaparse";
import { Table } from "../simple/table";
import { Modal } from "../simple/modal";
import moment from "moment";
import { Transaction } from "../../model/transactions";
import { TransactionsFileConfiguration } from "../../model/transactions/transactions-file-configuration";
import { Select, SelectOption } from "../simple/select";
import { configuration as BankAccountConfiguration } from "../../model/transactions/bank-account";
import { BankAccount } from "../../model/bank-account";
import { getRegisteredAccounts, uploadBankTransactions } from "../../api/bank-accounts";

const DATE_FORMAT = "DD-MM-YYYY";

export const UploadTab = () => {

  const fileTypes: TransactionsFileConfiguration[] = [
    BankAccountConfiguration
  ]

  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const fetchAccounts = async () => {
    const response = await getRegisteredAccounts();
    const _accounts = await response;
    setAccounts(_accounts);
    setAccountInput(_accounts[0]);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const [fileTypeInput, setFileTypeInput] = useState<TransactionsFileConfiguration>(fileTypes[0]);
  const [accountInput, setAccountInput] = useState<BankAccount>();
  const [fileRangeInput, setFileRangeInput] = useState<string>("2022-2023");

  const [previewBtnLoading, setPreviewBtnLoading] = useState(false);
  const [uploadBtnLoading, setUploadBtnLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTransactions, setPreviewTransactions] = useState<Transaction[]>([]);

  const [files, setFiles] = useState<FileList | null>(null);

  const previewFile = (e: any) => {
    setShowPreview(false);
    setPreviewTransactions([]);
    setPreviewBtnLoading(true);

    if (files && files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        const json = Papa.parse(event.target?.result as string);
        const rows = json.data.splice(1) as Array<Array<string>>;
        const transactions = rows.map((row) : Transaction => {
          return {
            date: moment(row[1], DATE_FORMAT).toDate(),
            remarks: row[2],
            type: row[3] && parseFloat(row[3]) !== 0 ? 'debit' : 'credit',
            amount: row[3] && parseFloat(row[3]) !== 0 ? parseFloat(row[3]) : parseFloat(row[4]),
            balance: parseFloat(row[5]),
            sortingIndex: `${moment(row[1], DATE_FORMAT).toDate().toISOString().split('T')[0]}-${row[0]}`,
          };
        })
        setPreviewTransactions(transactions);
      });
      reader.readAsText(files[0]);
    }
    
    setPreviewBtnLoading(false);
    setShowPreview(true);
  }

  const uploadTransactions = () => {
    console.log(accountInput);
    setUploadBtnLoading(true);
    if (accountInput) {
      uploadBankTransactions(accountInput, previewTransactions, fileRangeInput);
    }
    setUploadBtnLoading(false);
  }

  return (
    <div className="container">
      <form className="row align-items-end">
        <div className="mb-3 col-2">
          <label htmlFor="formFileType" className="form-label">
            File Type (<a href="#" data-bs-toggle="modal" data-bs-target="#fileExampleModal">Example</a>)
          </label>
          <Select
            label="File Type"
            id="formFileType"
            onChange={(value: TransactionsFileConfiguration) => setFileTypeInput(value)}
            values={fileTypes}
            valueMapField="id"
            defaultValue={fileTypeInput.id}
            options={fileTypes.map(fileType => {
              return {
                name: fileType.name,
                value: fileType.id,
              }
            })}
          />
        </div>
        <div className="mb-3 col-2">
          <label htmlFor="formAccount" className="form-label">Account</label>
          <Select
            label="Accounts"
            id="formAccount"
            onChange={(value: BankAccount) => setAccountInput(value)}
            values={accounts}
            valueMapField="id"
            options={accounts.map(account => {
              return {
                name: account.name,
                value: account.id,
              }
            })}
          />
        </div>
        <div className="mb-3 col-3">
          <label htmlFor="formFileUpload" className="form-label">File to upload</label>
          <input className="form-control" type="file" id="formFileUpload" accept=".csv" onChange={(e) => setFiles(e.target.files)}/>
        </div>
        <div className="mb-3 col-2">
          <label htmlFor="formFileRangeInput" className="form-label">Range</label>
          <input className="form-control" type="text" id="formFileRangeInput" value={fileRangeInput} onChange={(e) => setFileRangeInput(e.target.value)}/>
        </div>
        <div className="mb-3 col-3">
          <Button
            variant="dark"
            icon={<Icon type="preview"/>}
            text="Preview"
            loading={previewBtnLoading}
            onClick={previewFile}
          />
          &nbsp;
          <Button
            variant="primary"
            icon={<Icon type="upload"/>}
            text="Upload"
            disabled={!showPreview}
            loading={uploadBtnLoading}
            onClick={uploadTransactions}
          />
        </div>
      </form>
      {showPreview ? <Table columnConfigurations={fileTypeInput.columnConfigurations} items={previewTransactions}/> : ''}

      <Modal
        id="fileExampleModal"
        size="lg"
        visible={false}
        onDismiss={() => {}}
        title={`Example file for ${'fileTypeInput.display'}`}
        content={
          <Table columnConfigurations={fileTypeInput.fileColumnConfiguration} items={fileTypeInput.sampleItems}/>
        }
      />
    </div>
  )
}