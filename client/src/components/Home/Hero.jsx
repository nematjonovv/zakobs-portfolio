import { Element } from "react-scroll";
import PurpleButton from "../../utils/PurpleButton";

function Hero() {
  return (
    <Element name={"about"}>
      <section className="min-h-screen h-auto hero-media-parent">
        <div className="container-me flex justify-between items-center relative hero-media">
          {/* text */}
          <div className="mb-30 hero-text-media">
            <span className="text-[18px] text-[#666666] whitespace-nowrap">
              Hello,
              <h1 className="text-[60px] font-bold text-black mt-[-10px]">
                Adam Zakob
              </h1>
            </span>

            <p className="text-[#25202F] text-[24px] font-normal mt-1 mb-10">
              a freelance UI/UX Designer
            </p>
            <PurpleButton text={"Let's Talk"} />
          </div>
          {/* img */}
          <div>
            <img
              className="object-contain pointer-events-none h-[720px] w-[635px] relative -translate-y-20 drop-shadow-[80px_0px_60px_rgba(221,248,234)] z-0"
              src="/images/designers-photo.png"
              alt=""
            />

            {/* decor images */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                className="absolute -right-40 top-40 "
                src="/images/dots-decor.png"
                alt=""
              />
              <img
                className="absolute right-0 top-[30%]"
                src="/images/greendot-decor.png"
                alt=""
              />
              <img
                className="absolute right-[50%] top-10"
                src="/images/purpledot-decor.png"
                alt=""
              />
              <img
                className="absolute -right-32 top-[40%]"
                src="/images/x-decor.png"
                alt=""
              />
              <img
                className="absolute top-30 right-0"
                src="/images/snakeline-decor.png"
                alt=""
              />
              <img
                className="absolute top-100 -right-8"
                src="/images/snakeline-decor.png"
                alt=""
              />
              <img
                className="absolute top-100 right-155"
                src="/images/snakeline-decor.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
}

export default Hero;
