import type { NextPage } from "next";
import Footer from "../components/LandingPage/Footer";
import HeroSection from "../components/LandingPage/HeroSection";
import NFTCollections from "../components/LandingPage/NFTCollections";
import OfficialPartners from "../components/LandingPage/OfficialPartners";
import POHIntro from "../components/LandingPage/POHIntro";
import PTCAudit from "../components/LandingPage/PTCAudit";
import PTCEcosystem from "../components/LandingPage/PTCEcosystem";


const Home: NextPage = () => {


 



  return (
    
    <div id="homePage" className="homePage bg-[url('/assets/images/Landing_area_BG_mobile_version.png')] sm:bg-[url('/assets/images/Landing_area_BG.png')] bg-contain bg-no-repeat bg-black font-fmbolyarsanspro w-full px-6 flex items-center justify-center sm:px-12 md:px-18 lg:px-24 xl:px-0">
    <div className="w-full max-w-[1280px]">
      <HeroSection />
      <POHIntro />
      <NFTCollections />
      <PTCEcosystem />
      <PTCAudit />
      <OfficialPartners />
      <Footer />

      {/* <POHIntro />

      <NFTCollections />

      <PTCEcosystem />

      <PTCAudit />

      <OfficialPartners />

      <Footer /> */}
    </div>
  </div>
  );
};

export default Home;
