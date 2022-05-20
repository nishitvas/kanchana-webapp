import { HourglassIcon } from "@primer/octicons-react";
import React, { MouseEventHandler, useState } from "react";

interface ButtonProps {
  text: string,
  variant?: 'primary' | 'secondary' | 'light' | 'dark' | 'success' | 'danger',
  icon?: React.ReactElement,
  loading?: boolean,
  disabled?: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
  dataBSTarget?: string,
  dataBSToggle?: string,
  dataBSDismiss?: string,
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`btn btn-${props.variant || 'primary'}`}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      data-bs-target={props.dataBSTarget}
      data-bs-toggle={props.dataBSToggle}
      data-bs-dismiss={props.dataBSDismiss}
    >
      {props.loading ? <HourglassIcon size={22}/> : props.icon} {props.text}{props.loading ? 'ing...' : ''}
    </button>
  )
}