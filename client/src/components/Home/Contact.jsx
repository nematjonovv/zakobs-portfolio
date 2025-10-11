import { Element } from "react-scroll";
import Title from "../../utils/Title";
import Header3 from "../../utils/Header3";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <Element name="contact">
      <div className="bg-[#F6EEFE]">
        <div className="container-me py-[50px] ">
          <Title title={"Contact Me"} />
          <div className="flex justify-between">
            <Header3
              header3={
                "Let me know if you want to talk  about a potential collaboration. I'm available for freelance work."
              }
              width={510}
            />

            <a className="text-[#8643DC] text-2xl font-normal underline" href="infoname@mail.com" target="_blank">
              infoname@mail.com
            </a>
          </div>

          {/* Contact Form */}
          <div className=" w-full mt-[50px]"> 
            <form className="flex flex-col items-baseline">
                <input className="w-full border-b-2 border-[#DAD2E3] outline-none pb-3 mb-12" type="text"  placeholder="What's your name?" />
                <input className="w-full border-b-2 border-[#DAD2E3] outline-none pb-3 mb-12" type="email" placeholder="Your email" />
                <input className="w-full border-b-2 border-[#DAD2E3] outline-none pb-3 mb-12" type="text"  placeholder="Tell me about your project"/>
                <button type="submit" className="bg-[#8643DC] py-[18px] px-[50px] text-white font-medium text-[16px] rounded-full cursor-pointer">Get a Quote</button>
            </form>
          </div>
        </div>
      </div>
    </Element>
  );
}

export default Contact;
