import { Element } from "react-scroll";
import Title from "../../utils/Title";
import Header3 from "../../utils/Header3";

function Services() {
  const services = [
    {
      id: 1,
      title: `UX Research`,
      desc: `New demos are continually added and buying a single license for Mak gives you access to all of what's shown below, plus everything that will be added in the future.`,
      img: "images/services-ui.png",
    },
    {
      id: 2,
      title: `Brand Design`,
      desc: `New demos are continually added and buying a single license for Mak gives you access to all of what's shown below, plus everything that will be added in the future.`,
      img: "images/services-brand.png",
    },
    {
      id: 3,
      title: `Web Development`,
      desc: `New demos are continually added and buying a single license for Mak gives you access to all of what's shown below, plus everything that will be added in the future.`,
      img: "images/services-web.png",
    },
  ];
  return (
    <Element name="services">
      <div className="container-me pb-[100px]">
        <Title title={"Services"} />
        <Header3 header3={'What  actually I love to do'} width={250}/>
        <ul className="flex gap-7.5 mt-12.5 services-media">
          {services?.map((e, i) => (
            <li key={i}>
              <div className="flex gap-5 items-center">
                <img src={e.img} alt="" />
                <h3 className="text-[#25202F] text-2xl font-medium">
                  {e.title}
                </h3>
              </div>
              <p className="leading-[32px] text-[#47444E] font-normal text-[14px] text-left">
                {e.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Element>
  );
}

export default Services;
