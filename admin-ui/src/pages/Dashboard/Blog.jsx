import { useState } from "react";
import BlogModal from "../../components/modal/BlogModal";
import { useBlog } from "../../Context/BlogContext";
import SuccessMessage from "../../utils/Messages/SuccessMessage";
import ErrorMessage from "../../utils/Messages/ErrorMessage";
import PostModal from "../../components/modal/PostModal";

function Blog() {
  const [open, setOpen] = useState(false);
  const { success, error, blog, handleDelete, handleUpdate, handleGetPost } =
    useBlog();
  const [openPost, setOpenPost] = useState(false);
  const handlePost = async (id) => {
    await handleGetPost(id);
    setOpenPost(true);
  };

  return (
    <div className="p-5 h-screen">
      <h3 className="text-3xl font-medium text-[#272930] mb-12">Blog</h3>

      <div className="h-full flex-1 flex gap-5">
        {blog?.data?.slice(0, 3)?.map((post, i) => (
          <div className="rounded" key={i}>
            <div className="w-[255px] h-[350px] relative group post-child overflow-hidden">
              {/* Image */}
              <img
                className="w-full h-full rounded-2xl object-cover"
                src={post.coverImage}
                alt=""
              />

              {/* Default gradient */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-[#25202F]/90 to-transparent flex items-end">
                <div className="text-white pb-7.5 pl-5 pr-9.5">
                  <span>20 June / 2025</span>
                  <p>{post.title}</p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-2xl dark-glassmorphism flex flex-col justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-5">
                <div className="flex justify-end">
                  <i
                    // onClick={() => handleEditService(service)}
                    className="bi bi-pencil-square py-2 px-3 bg-[#8643DC] rounded-xl text-white text-xl cursor-pointer hover:bg-[#DB14F6] mr-3"
                  ></i>

                  <i
                    onClick={() => handleDelete(post.id)}
                    className="bi bi-trash3 py-2 px-3 bg-[#8643DC] rounded-xl text-white text-xl cursor-pointer hover:bg-[#FF0E9C]"
                  ></i>
                </div>
                <button
                  onClick={() => handlePost(post.id)}
                  className="px-5 cursor-pointer py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition"
                >
                  Read
                </button>
              </div>
            </div>
          </div>
        ))}

        <div
          className="w-[255px] h-[350px] glassmorphism flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <i className="bi bi-plus text-4xl text-gray-700"></i>
        </div>
      </div>
      <PostModal isOpen={openPost} onClose={() => setOpenPost(false)} />
      <BlogModal isOpen={open} onClose={() => setOpen(false)} />
      <SuccessMessage successMessage={success} />
      <ErrorMessage errMessage={error} />
    </div>
  );
}

export default Blog;
