import { useEffect, useState } from "react";
import Title from "../../utils/Title";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import Header3 from "../../utils/Header3";

function Portfolio() {
  const portfolio = [
    {
      id: 1,
      img: "images/portfolio-1.png",
    },
    {
      id: 2,
      img: "images/portfolio-2.png",
    },
    {
      id: 3,
      img: "images/portfolio-2.png",
    },
    {
      id: 4,
      img: "images/portfolio-2.png",
    },
  ];

  const [indexes, setIndexes] = useState({
    first: null,
    second: null,
  });

  const randomIndexFunc = () => {
    let randomIndex1 = Math.floor(Math.random() * portfolio.length);
    let randomIndex2 = Math.floor(Math.random() * portfolio.length);

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * portfolio.length);
    }

    setIndexes({ first: randomIndex1, second: randomIndex2 });
  };

  useEffect(() => {
    randomIndexFunc();
  }, []);

  return (
    <Element name="portfolio">
      <div className="bg-[#F4F3F9]">
        <div className="container-me py-[50px]">
          <Title title={"Portfolio"} />
          <div className="flex justify-between items-center">
            <Header3 header3={"All Creative Projects"} width={250} />
            <Link
              to={"/portfolio"}
              className="text-2xl font-medium text-[#25202F] underline portfolio-link-media"
            >
              Explore More
              <i className="bi bi-arrow-right ml-2.5"></i>
            </Link>
          </div>
          <div className="flex gap-7.5 mt-7.5 portfolio-media">
            <img
              className="h-430px w-[50%]"
              src={portfolio[indexes.first]?.img}
              alt=""
            />
            <img
              className="h-430px w-[50%]"
              src={portfolio[indexes.second]?.img}
              alt=""
            />
          </div>
        </div>
      </div>
    </Element>
  );
}

export default Portfolio;
