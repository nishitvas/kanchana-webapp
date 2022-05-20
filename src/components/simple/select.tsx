import React from "react";

export interface SelectOption {
  name: string,
  value: string,
}

export interface SelectProps {
  label: string,
  id: string,
  onChange: Function,
  defaultValue?: string,
  options: SelectOption[],
  values: any[],
  valueMapField: string
}

export const Select = (props: SelectProps) => {
  return (
    <select
      className="form-select"
      aria-label={props.label}
      id={props.id}
      onChange={({ target }) => {
        const mappedOption = props.values.filter(value => value[props.valueMapField] === target.value)[0];
        props.onChange(mappedOption);
      }}
      defaultValue={props.defaultValue}
    >
      {props.options.map((option, idx) => <option key={idx} value={option.value}>{option.name}</option>)}
    </select>
  )
}