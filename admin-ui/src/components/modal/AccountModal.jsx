import React from "react";
import { createPortal } from "react-dom";

function AccountModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/60 dark-glassmorphism"
        onClick={() => onClose()}
      />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 h-auto pb-5 w-auto bg-white rounded-md">
        Accoun settings
      </div>
    </div>,
    document.body
  );
}

export default AccountModal;
