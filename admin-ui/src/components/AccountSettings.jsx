import { useState } from "react";
import AccountModal from "./modal/AccountModal";

function AccountSettings() {
  const [open, isOpen] = useState(false);
  return (
    <div className="glassmorphism w-100 h-100 p-5">
      <h3 className="text-xl font-semibold">Accounts  </h3>


      <AccountModal isOpen={open} onClose={() => isOpen(false)} />
    </div>
  );
}

export default AccountSettings;
