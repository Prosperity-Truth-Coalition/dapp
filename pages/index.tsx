import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import Stats from "../components/Stats/Stats";
import Tabs from "../components/Tabs/Tabs";
import Burn from "../components/BurningPortal/Burn";
import { useRecoilValue } from "recoil";
import { selectedTabState } from "../atoms/selectedTab";
import { Toaster } from "react-hot-toast";
import Staking from "../components/StakingPortal/Staking";
import { useEffect, useState } from "react";
import PreLoader from "../components/Preloader/PreLoader";


const Home: NextPage = () => {

  const selectedTab = useRecoilValue(selectedTabState);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])




  return (
    <div className=" w-full min-h-[100vh] px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
      <Head>
        <title>PTC Dapp</title>
        <meta content="$PTC Token is bringing value and utility! Buy it, Win it, Sell it, Stake it, Burn it, and Spend it! Come join our amazing community today!" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Toaster />
      {loading ? <PreLoader /> :
        <>
          <header className="   sm:px-12  sm:gap-12">
            <Header />
          </header>

          <main className="mt-8 px-6 flex flex-col gap-8 sm:px-12 sm:mt-16 sm:gap-12">
            <Stats />
            <Tabs />

            {selectedTab === "burn" && <Burn />}
            {selectedTab === "stake" && <Staking />}


            {/* <Burn/> */}
          </main>
        </>
      }
    </div>
  );
};

export default Home;
