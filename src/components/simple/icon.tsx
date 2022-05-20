import * as Icons from "@primer/octicons-react";
import React from "react";

export interface IconProps {
  type: string
}

const size = 22;

const icons: {[key: string]: React.ReactElement} = {
  summary: <Icons.RocketIcon size={size}/>,
  upload: <Icons.UploadIcon size={size}/>,
  classify: <Icons.GitBranchIcon size={size}/>,
  settings: <Icons.GearIcon size={size}/>,
  preview: <Icons.EyeIcon size={size}/>,
  bankAccount: <Icons.OrganizationIcon size={size}/>,
  investments: <Icons.BriefcaseIcon size={size}/>,
  insurances: <Icons.ChecklistIcon size={size}/>,
  debit: <Icons.NoEntryIcon size={size}/>,
  credit: <Icons.PlusCircleIcon size={size}/>,
  visual: <Icons.FlameIcon size={size}/>,
  newAccount: <Icons.FileAddedIcon size={size}/>,
  delete: <Icons.TrashIcon size={size}/>,
}

export const Icon = (props: IconProps) => {
  return icons[props.type] || <Icons.AlertIcon size={size}/>;
}