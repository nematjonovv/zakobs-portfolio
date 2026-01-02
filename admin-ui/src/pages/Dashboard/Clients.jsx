import { useState } from "react";
import { useClients } from "../../Context/ClientContext";
import ClientModal from "../../components/modal/ClientModal";
import SuccessMessage from "../../utils/Messages/SuccessMessage";
import ErrorMessage from "../../utils/Messages/ErrorMessage";

function Clients() {
  const [open, setOpen] = useState(false);
  const { client, handleDelete, handleUpdate, err, success } = useClients();
  return (
    <div className="p-5 h-screen">
      <div className="w-full h-full">
        <h3 className="text-3xl font-medium text-[#272930]">Clients</h3>

        <div className="flex mt-11 gap-7 clients-media flex-wrap">
          {client?.data?.map((e, i) => {
            return (
              <div className="relative group">
                <div
                  key={i}
                  className="px-[60px] py-[33px] rounded flex flex-col items-center gap-7.5  duration-300 group-hover:opacity-70"
                  style={{
                    backgroundColor: e.bgcolor,
                    boxShadow: `0px 19px 66px -2px ${e.bgcolor}`,
                  }}
                >
                  <img src={e.image} className="h-[50px] w-[50px]" alt="" />
                  <p className="text-[18px] font-semibold text-black capitalize">
                    {e.clientName}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="absolute top-1 right-1 hidden text-white text-xl group-hover:block cursor-pointer hover:text-red-500"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            );
          })}

          {/* create button */}
          <div
            className="w-[180px] h-[170px] glassmorphism rounded cursor-pointer flex justify-center items-center"
            onClick={() => setOpen(true)}
          >
            <i className="bi bi-plus text-3xl text-[#0000008a]"></i>
          </div>
        </div>

        <ClientModal isOpen={open} onClose={() => setOpen(false)} />

        <SuccessMessage successMessage={success} />
        <ErrorMessage errMessage={err} />
      </div>
    </div>
  );
}

export default Clients;
