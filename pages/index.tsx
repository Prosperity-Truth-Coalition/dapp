import type { NextPage } from "next";
import Footer from "../components/LandingPage/Footer";
import HeroSection from "../components/LandingPage/HeroSection";
import NFTCollections from "../components/LandingPage/NFTCollections";
import OfficialPartners from "../components/LandingPage/OfficialPartners";
import POHIntro from "../components/LandingPage/POHIntro";
import PTCAudit from "../components/LandingPage/PTCAudit";
import PTCEcosystem from "../components/LandingPage/PTCEcosystem";
import Head from "next/head";

const Home: NextPage = () => {


 



  return (
    
    <div id="homePage" className="homePage bg-[url('/assets/images/Landing_area_BG_mobile_version.png')] sm:bg-[url('/assets/images/Landing_area_BG.png')] bg-contain bg-no-repeat bg-black font-fmbolyarsanspro w-full px-6 flex items-center justify-center sm:px-12 md:px-18 lg:px-24 xl:px-0">
      <Head>
      <title>PTC Dapp - Prosperity Truth Coalition</title>
                <meta content="$PTC Token is bringing value and utility! Buy it, Win it, Sell it, Stake it, Burn it, and Spend it! Come join our amazing community today!" name="description" />
      </Head>
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
