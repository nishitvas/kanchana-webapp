import React, { useEffect, useState } from "react";
import { Modal as BSModal } from "bootstrap";

export interface ModalProps {
  id: string,
  title: string | React.ReactElement,
  content: string | React.ReactElement,
  footer?: React.ReactElement,
  visible: boolean,
  onDismiss: Function,
  size?: 'sm' | 'lg' | 'xl'
}

export const Modal = (props: ModalProps) => {

  useEffect(() => {
    const el = document.getElementById(props.id);
    if (el) {
      let modal = BSModal.getInstance(el);
      if (!modal) {
        modal = new BSModal(el);
      }
      if (props.visible) {
        modal?.show();
      } else {
        modal?.hide();
      }
    }
  }, [props.visible]);

  return (
    <div className="modal" tabIndex={-1} id={props.id}>
      <div className={`modal-dialog ${props.size ? `modal-${props.size}` : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button type="button" className="btn-close" onClick={() => props.onDismiss()}></button>
          </div>
          <div className="modal-body">
            {props.content}
          </div>
          {props.footer ? <div className="modal-footer">
            {props.footer}
          </div> : ''}
        </div>
      </div>
    </div>
  );
}