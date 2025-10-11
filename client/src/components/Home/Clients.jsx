import Header3 from "../../utils/Header3";
import Title from "../../utils/Title";

function Clients() {
  const clients = [
    {
      id: 1,
      img: "images/client-slack.png",
      client: "slack",
      bgCol: "#FFE7F0",
    },
    {
      id: 2,
      img: "images/client-medium.png",
      client: "medium",
      bgCol: "#CAFFE1",
    },
    {
      id: 3,
      img: "images/client-microsoft.png",
      client: "microsfot",
      bgCol: "#DDF5FF",
    },

    {
      id: 4,
      img: "images/client-zeplin.png",
      client: "zeplin",
      bgCol: "#FFEEC9",
    },
    {
      id: 5,
      img: "images/client-shopify.png",
      client: "shopify",
      bgCol: "#DBFFC3",
    },
  ];
  return (
    <div className="container-me py-[100px]">
      <Title title={"Clients"} />
      <Header3 header3={"Big Deal With"} width={150} />
      <ul className="flex justify-between mt-11 clients-media">
        {clients?.map((e, i) => (
          <li
            className={`px-[60px] py-[33px] rounded flex flex-col items-center gap-7.5 transition-all ease-in hover:-translate-y-1.5`}
            style={{
              background: `${e.bgCol}`,
              boxShadow: `0px 19px 66px -2px ${e.bgCol}`,
            }}
            key={i}
          >
            <img src={e.img} alt="" />
            <p className="text-[18px] font-semibold text-black capitalize">
              {e.client}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;
