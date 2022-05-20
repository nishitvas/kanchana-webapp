import { TableColumnConfiguration } from "../../components/simple/table";

export interface TransactionsFileConfiguration {
  id: string,
  name: string,
  columnConfigurations: TableColumnConfiguration[],
  fileColumnConfiguration: TableColumnConfiguration[],
  sampleItems: any[],
};