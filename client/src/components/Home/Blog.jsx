import { Element } from "react-scroll";
import Header3 from "../../utils/Header3";
import Title from "../../utils/Title";
import "../../styles/Custom.scss";
function Blog() {
  const blogPosts = [
    {
      id: 1,
      img: "images/blog-1.png",
      date: { day: 20, month: "June", year: 2025 },
      title: "Technology is evolving rapidly. New devices and applications.",
      fullPost:
        "Technology is reshaping our world — new devices, smarter systems, and innovative applications are transforming how we live, work, and communicate. Artificial intelligence, virtual reality, and automation are no longer ideas of the future — they’re part of our daily lives. From wearable gadgets that monitor our health to smart homes that respond to our voice, technology continues to push boundaries and make life more efficient and connected. But with this rapid growth comes responsibility — to use technology wisely, to learn continuously, and to adapt to change. The future belongs to those who embrace innovation and never stop exploring. 🚀✨",
      titlePost: "🌍 Technology Is Evolving Rapidly Every Day",
    },
    {
      id: 2,
      img: "images/blog-2.png",
      date: { day: 5, month: "July", year: 2025 },
      title: "Artificial Intelligence: Shaping the Future of Innovation.",
      fullPost:
        "Artificial Intelligence is becoming the core of technological progress. From automating routine tasks to analyzing complex data and enabling creative solutions, AI is redefining what’s possible across industries. Businesses are becoming smarter, healthcare more personalized, and communication more intuitive. However, with AI’s growing influence, ethical use and human oversight remain essential. The future depends on how we balance innovation with responsibility. 🤖✨",
      titlePost: "🤖 AI: Shaping the Future of Innovation",
    },
    {
      id: 3,
      img: "images/blog-3.png",
      date: { day: 15, month: "August", year: 2025 },
      title: "The Rise of Smart Living: Technology in Everyday Life.",
      fullPost:
        "Smart technology has seamlessly integrated into our homes, workplaces, and lifestyles. From voice-controlled assistants to energy-efficient devices and automated systems, tech is making everyday living simpler and more comfortable. The rise of IoT (Internet of Things) connects everything — from your phone to your refrigerator. As convenience grows, so does the need for cybersecurity and privacy awareness. The smarter we live, the smarter we must protect ourselves. 🏠💡",
      titlePost: "🏠 Smart Living: How Technology Shapes Our Daily Lives",
    },
  ];
  return (
    <Element name="blog">
      <div className="container-me my-[100px] h-[350px] flex items-center gap-5 blog-parent-media">
        <div className=" h-full">
          <Title title={"Blog"} />
          <Header3 header3={"Get News Feeds"} width={165} />
        </div>
        <div className="h-full flex-1 flex justify-between blog-blogs-media">
          {blogPosts.slice(0,3)?.map((post, i) => (
            <div className="post-parent">
              <div className="w-[255px] h-[350px] relative post-child">
                <img
                  className="w-full h-full object-cover"
                  src={post.img}
                  alt=""
                />
                <div className="gradient absolute inset-0 bg-gradient-to-t from-[#25202F]/90 to-transparent flex items-end">
                  <div className="relative bottom-0 text-white pb-7.5 pl-5 pr-9.5">
                    <span>
                      {post.date.day} {post.date.month}/{post.date.year}
                    </span>
                    <p>{post.title}</p>
                  </div>
                </div>
              </div>
              <div className="text-white second-text pt-5 pb-5 w-[255px]">
                <span className="text-[#8643DC]">
                  {post.date.day} {post.date.month}/{post.date.year}
                </span>
                <p className="text-[20px] text-black">{post.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
}

export default Blog;
