import Hero from "@/components/sections/Hero";
import MobileShowcase from "@/components/sections/MobileShowcase";
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
                <MobileShowcase />
                {/* The one light block of the page: a sheet lying on the
                    dark canvas (.light-sheet in globals.css). */}
                <div className="light-sheet" data-theme="light">
                    <Services />
                    <Portfolio />
                </div>
                <Process />
                <TechStack />
                <FAQSection />
                <Contact />
            </main>
            <Footer />
        </>
    );
}