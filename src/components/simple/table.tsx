import React from "react";

export interface TableColumnConfiguration {
  id: string,
  header: string,
  value: Function,
  align?: 'right'
}

export interface TableProps {
  columnConfigurations: TableColumnConfiguration[]
  items: any[]
}

export const Table = (props: TableProps) => {

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr className="table-dark">
          {props.columnConfigurations.map((c, idx) => <th key={idx}>{c.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, idx) => <tr key={idx}>{
          props.columnConfigurations.map((c, idx) => 
            <td
              key={idx}
              style={c.align ? {textAlign: c.align}: {}}
            >{c.value(item)}</td>
          )}
          </tr>
        )}
      </tbody>
    </table>
  )
}