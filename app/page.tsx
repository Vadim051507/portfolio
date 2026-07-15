import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import FAQSection from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
    return (
        <>
            <main>
                <Hero />
                <About />
                <Services />
                <Portfolio />
                <Process />
                <TechStack />
                <FAQSection />
                <Contact />
            </main>
            <Footer />
        </>
    );
}