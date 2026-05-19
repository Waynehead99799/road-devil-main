import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Proof from "@/components/Proof";
import Stack from "@/components/Stack";
import Technology from "@/components/Technology";
import Console from "@/components/Console";
import Hardware from "@/components/Hardware";
import Deployment from "@/components/Deployment";
import Strategic from "@/components/Strategic";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="relative">
        <Hero />
        <Proof />
        <Stack />
        <Technology />
        <Console />
        <Hardware />
        <Deployment />
        <Strategic />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
