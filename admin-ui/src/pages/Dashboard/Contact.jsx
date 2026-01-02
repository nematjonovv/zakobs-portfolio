import { useEffect, useState } from "react";
import { useContact } from "../../Context/ContactContext";
import SuccessMessage from "../../utils/Messages/SuccessMessage";
import ErrorMessage from "../../utils/Messages/ErrorMessage";

function Contact() {
  const { contact, handleCreate, handleUpdate, loading, success, error } =
    useContact();

  const [contactObj, setContactObj] = useState({
    instagram: "",
    dribble: "",
    linkedin: "",
    email: "",
  });

  useEffect(() => {
    if (contact && Object.keys(contact).length) {
      setContactObj({
        instagram: contact.data[0].instagram || "",
        dribble: contact.data[0].dribble || "",
        linkedin: contact.data[0].linkedin || "",
        email: contact.data[0].email || "",
      });
    }
  }, [contact]);

  return (
    <div className="p-5 h-screen">
      <h3 className="text-3xl font-medium text-[#272930] mb-12">Contact</h3>
      <div className="rounded-2xl bg-white/15 p-6 glassmorphism">
        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Instagram */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#1f2230]">
              Instagram
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-3 py-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/20">
                <i className="bi bi-instagram"></i>
              </span>
              <input
                type="url"
                placeholder="https://instagram.com/username"
                className="w-full bg-transparent text-sm text-[#1f2230] placeholder:text-[#1f2230]/45 focus:outline-none"
                value={contactObj.instagram}
                onChange={(e) =>
                  setContactObj((prev) => ({
                    ...prev,
                    instagram: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Dribbble */}
          <div>
            <label className="mb-1 block text-xs font-medium text-[#1f2230]">
              Dribbble
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-3 py-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/20">
                <i className="bi bi-dribbble"></i>
              </span>
              <input
                type="url"
                placeholder="https://dribbble.com/username"
                className="w-full bg-transparent text-sm text-[#1f2230] placeholder:text-[#1f2230]/45 focus:outline-none"
                value={contactObj.dribble}
                onChange={(e) =>
                  setContactObj((prev) => ({
                    ...prev,
                    dribble: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label className="mb-1 block text-xs font-medium text-[#1f2230]">
              LinkedIn
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-3 py-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/20">
                <i className="bi bi-linkedin"></i>
              </span>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-transparent text-sm text-[#1f2230] placeholder:text-[#1f2230]/45 focus:outline-none"
                value={contactObj.linkedin}
                onChange={(e) =>
                  setContactObj((prev) => ({
                    ...prev,
                    linkedin: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium text-[#1f2230]">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-3 py-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/20">
                <i className="bi bi-at" />
              </span>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full bg-transparent text-sm text-[#1f2230] placeholder:text-[#1f2230]/45 focus:outline-none"
                value={contactObj.email}
                onChange={(e) =>
                  setContactObj((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-xl cursor-pointer bg-[#1f2230] px-4 py-2 text-sm text-white"
          >
            Reset
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#8643DC] cursor-pointer px-5 py-2 text-sm font-medium text-white"
            onClick={() => {
              const payload = {};
              
              if (contact?.data[0]?.id) {
                handleUpdate({
                  id: contact.data[0].id,
                  data: contactObj,
                });
              } else {
                handleCreate(contactObj);
              }
            }}
          >
            Save changes
          </button>
        </div>
      </div>
      <SuccessMessage successMessage={success} />
      <ErrorMessage errMessage={error} />
    </div>
  );
}

export default Contact;
