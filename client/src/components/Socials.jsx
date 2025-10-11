import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Socials() {
  const socials = [
    {
      id: 1,
      icon: "fa-brands fa-dribbble",
      socialLink: "https://dribbble.com/",
    },
    {
      id: 2,
      icon: "fa-brands fa-instagram",
      socialLink: "https://instagram.com/",
    },
    {
      id: 3,
      icon: "fa-brands fa-linkedin-in",
      socialLink: "https://linkedin.com/",
    },
  ];
  return (
    <div className="container-me flex flex-col justify-center items-center mt-[100px] mb-[50px]">
      <p className="mb-[30px] text-4xl text-[#21232D] font-medium">
        Let's be friends
      </p>
      <div className="flex gap-10">
        {socials?.map((e, i) => (
          <div className="bg-[url('/images/social-bg.png')] bg-contain bg-no-repeat w-[50px] h-[50px] flex justify-center items-center text-[24px] text-white">
            <a href={e.socialLink} className={e.icon} target="_blank"></a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Socials;
