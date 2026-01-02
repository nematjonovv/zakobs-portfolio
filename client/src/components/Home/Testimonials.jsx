import Header3 from "../../utils/Header3";
import Title from "../../utils/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
function Testimonials() {
  const testimonials = [
    {
      id: 1,
      clientImg: "/images/testimonial-1.png",
      who: "Samantha Green",
      position: "Marketing Manager",
      testimonial:
        "The service was excellent from start to finish. Everything was delivered on time, and communication was always clear. I’m very satisfied with the overall experience and would happily recommend this company to anyone looking for professional and reliable results.",
    },
    {
      id: 2,
      clientImg: "/images/testimonial-1.png",
      who: "David Thompson",
      position: "Software Engineer",
      testimonial:
        "I had a great experience using this product. The quality is outstanding, and it truly exceeded my expectations. Customer support was very helpful and responsive. I would definitely purchase again and encourage others to give it a try as well.",
    },
    {
      id: 3,
      clientImg: "/images/testimonial-1.png",
      who: "Emily Carter",
      position: "Creative Director",
      testimonial:
        "Absolutely satisfied with the results! The process was smooth, and the team showed great attention to detail. Everything was handled professionally, and the final outcome looked perfect. I would confidently recommend this service to anyone seeking quality and trust.",
    },
    {
      id: 4,
      clientImg: "/images/testimonial-1.png",
      who: "Michael Rodriguez",
      position: "Business Owner",
      testimonial:
        "The experience was fantastic from beginning to end. The team listened carefully to my needs and made sure everything was done perfectly. The quality and timing were just right. I’ll definitely continue using their services for future projects and collaborations.",
    },
    {
      id: 5,
      clientImg: "/images/testimonial-1.png",
      who: "Olivia Bennett",
      position: "Front-end Developer",
      testimonial:
        "I’m really happy with the overall service provided. The staff was friendly, professional, and responsive throughout the process. The final result turned out better than I expected. I’ll surely come back again and recommend it to others without hesitation.",
    },
  ];

  return (
    <div className="bg-[#F4F3F9]">
      <div className="container-me py-15">
        <Title title={"Testimonials"} />
        <Header3 header3={"What People Says"} width={220} />

        <div className="relative px-5 testimonial-parent-media">
          {/* testimonial background */}
          <div className="absolute inset-0 flex flex-col gap-55 mt-15 z-0 pointer-events-none testimonial-bg-media">
            <div className="w-full flex justify-between items-center">
              <img
                draggable="false"
                src="/images/testimonial-2.png"
                alt=""
              />
              <img
                draggable="false"
                src="/images/testimonial-3.png"
                alt=""
              />
            </div>
            <div className="w-[80%] flex justify-between items-center mx-auto">
              <img
                draggable="false"
                src="/images/testimonial-4.png"
                alt=""
              />
              <img
                draggable="false"
                src="/images/testimonial-5.png"
                alt=""
              />
            </div>
          </div>

          {/* testimonial carousel */}
            <div className="relative z-10 h-120 testimonial-carousel-media">
              <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {testimonials?.map((e, i) => (
                  <SwiperSlide key={i} className="!flex items-center justify-center ">
                    <div className="w-[600px]  flex flex-col items-center justify-center h-auto">
                      <img src="/images/quote-icon.png" alt="" />
                      <p className="text-center mt-10 mb-[80px] max-h-20  text-[16px] text-[#636066] leading-[32px]">
                        {e.testimonial}
                      </p>
                      <div className="flex flex-col items-center mb-10">
                        <img src={e.clientImg} alt="" />
                        <h5 className="mt-5 mb-1 text-[20px] text-black font-medium">
                          {e.who}
                        </h5>
                        <span className="font-normal text-[16px] text-black">
                          {e.position}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
