import { Element } from "react-scroll";
import Title from "../../utils/Title";
import Header3 from "../../utils/Header3";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

function Services() {
  const [services, setServices] = useState({});
  useEffect(() => {
    api
      .get("/api/services")
      .then((res) => setServices(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Element name="services">
      <div className="container-me pb-[100px]">
        <Title title={"Services"} />
        <Header3 header3={"What  actually I love to do"} width={250} />
        <ul className="flex gap-7.5 mt-12.5 services-media">
          {services?.data?.map((e, i) => (
            <li key={i} className="w-105">
              <div className="flex gap-5 items-center">
                <div className="relative">
                  <img src="/images/bg.png" className="h-12 w-12" alt="" />
                  <i
                    className={`${e.icon} text-white absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2`}
                  ></i>
                </div>
                <h3 className="text-[#25202F] text-2xl font-medium">
                  {e.title}
                </h3>
              </div>
              <p className="leading-[32px] text-[#47444E] font-normal text-[14px] text-left">
                {e.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Element>
  );
}

export default Services;
