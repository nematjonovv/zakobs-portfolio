import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialModal from "../../components/modal/TestimonialModal";
import { useState } from "react";
import { useTestimonial } from "../../Context/TestimonialContext";
import SuccessMessage from "../../utils/Messages/SuccessMessage";
import ErrorMessage from "../../utils/Messages/ErrorMessage";
function Testimonials() {
  const [open, setOpen] = useState(false);
  const { testimonials, loading, success, err, handleDelete, handleUpdate } =
    useTestimonial();

  const update = () => {
    setOpen(true);
  };
  return (
    <div className="p-5 h-screen">
      <h3 className="text-3xl font-medium text-[#272930]">Testimonials</h3>
      <div className="w-full h-full">
        <div className="relative top-12 z-10 h-auto testimonial-carousel-media">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper flex justify-center"
          >
            {testimonials?.data?.map((e, i) => (
              <SwiperSlide
                key={i}
                className="relative flex items-center justify-center gap-5 glassmorphism p-5 group"
              >
                <div className="w-[600px] mx-auto flex flex-col items-center justify-center h-auto">
                  <img src="/images/quote-icon.png" alt="" />
                  <p className="text-center mt-10 mb-20 max-h-20 text-[16px] text-[#636066] leading-8">
                    {e.opinion}
                  </p>
                  <div className="flex flex-col items-center mb-10">
                    <img
                      src={e.image}
                      alt=""
                      className="w-20 h-20 object-cover"
                    />
                    <h5 className="mt-5 mb-1 text-[20px] text-black font-medium">
                      {e.author}
                    </h5>
                    <span className="font-normal text-[16px] text-black">
                      {e.role}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/10 z-50 bg-opacity-60 flex justify-end items-start text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl">
                  <button className="m-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <i
                        onClick={() => update()}
                        className="bi bi-pencil-square py-2 px-3 bg-[#8643DC] rounded-xl text-white text-xl cursor-pointer hover:bg-[#DB14F6]"
                      ></i>
                    )}
                  </button>

                  <button className="mr-3 my-3 ">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <i
                        onClick={() => handleDelete(e.id)}
                        className="bi bi-trash3 py-2 px-3  bg-[#8643DC] rounded-xl text-white text-xl cursor-pointer hover:bg-[#FF0E9C]"
                      ></i>
                    )}
                  </button>
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide className="glassmorphism">
              <div
                className="h-120 cursor-pointer flex items-center justify-center"
                onClick={() => setOpen(true)}
              >
                <i className="bi bi-plus text-6xl"></i>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <TestimonialModal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Update testimonial"
        />
        <SuccessMessage successMessage={success} />
        <ErrorMessage errMessage={err} />
      </div>
    </div>
  );
}

export default Testimonials;
