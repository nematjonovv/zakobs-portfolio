import Blog from "../components/Home/Blog";
import Clients from "../components/Home/Clients";
import Contact from "../components/Home/Contact";
import Hero from "../components/Home/Hero";
import Portfolio from "../components/Home/Portfolio";
import Services from "../components/Home/Services";
import Testimonials from "../components/Home/Testimonials";
import Socials from "../components/Socials";

function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Portfolio />
            <Clients />
            <Testimonials />
            <Blog />
            <Contact />
            <Socials />
        </>
    );
}

export default Home;