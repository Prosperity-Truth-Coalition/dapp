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
import Footer from "../components/Footer";
import Dex from "../components/DexWidget/Dex";


const Home: NextPage = () => {

    const selectedTab = useRecoilValue(selectedTabState);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    }, [])




    return (
        <div className="dappPage w-full min-h-[100vh] px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
            <Head>
                <title>PTC - Prosperity Truth Coalition</title>
                <meta content="$PTC Token is bringing value and utility! Buy it, Win it, Sell it, Stake it, Burn it, and Spend it! Come join our amazing community today!" name="description" />
                <link href="/favicon.ico" rel="icon" />
                <style jsx>{`

                    .mantine-Modal-body	{
                        background: transparent !important;
}

                    .mantine-Modal-header{
                        display: none;
}

                    .mantine-Paper-root {
                        background: transparent !important;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 300';
                    src: url('/fonts/FMBolyarSansPro-300.eot');
                    src: local('FMBolyar Sans Pro 300'), local('FMBolyarSansPro-300'),
                    url('/fonts/FMBolyarSansPro-300.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-300.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-300.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-300.ttf') format('truetype');
                    font-weight: 300;
                    font-style: normal;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 800';
                    src: url('/fonts/FMBolyarSansPro-800.eot');
                    src: local('FMBolyar Sans Pro 800'), local('FMBolyarSansPro-800'),
                    url('/fonts/FMBolyarSansPro-800.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-800.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-800.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-800.ttf') format('truetype');
                    font-weight: 800;
                    font-style: normal;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 200';
                    src: url('/fonts/FMBolyarSansPro-200.eot');
                    src: local('FMBolyar Sans Pro 200'), local('FMBolyarSansPro-200'),
                    url('/fonts/FMBolyarSansPro-200.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-200.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-200.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-200.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 400';
                    src: url('/fonts/FMBolyarSansPro-400.eot');
                    src: local('FMBolyar Sans Pro 400'), local('FMBolyarSansPro-400'),
                    url('/fonts/FMBolyarSansPro-400.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-400.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-400.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-400.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 500';
                    src: url('/fonts/FMBolyarSansPro-500.eot');
                    src: local('FMBolyar Sans Pro 500'), local('FMBolyarSansPro-500'),
                    url('/fonts/FMBolyarSansPro-500.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-500.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-500.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-500.ttf') format('truetype');
                    font-weight: 500;
                    font-style: normal;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 100';
                    src: url('/fonts/FMBolyarSansPro-100.eot');
                    src: local('FMBolyar Sans Pro 100'), local('FMBolyarSansPro-100'),
                    url('/fonts/FMBolyarSansPro-100.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-100.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-100.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-100.ttf') format('truetype');
                    font-weight: 100;
                    font-style: normal;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 600';
                    src: url('/fonts/FMBolyarSansPro-600.eot');
                    src: local('FMBolyar Sans Pro 600'), local('FMBolyarSansPro-600'),
                    url('/fonts/FMBolyarSansPro-600.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-600.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-600.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-600.ttf') format('truetype');
                    font-weight: 600;
                    font-style: normal;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 700';
                    src: url('/fonts/FMBolyarSansPro-700.eot');
                    src: local('FMBolyar Sans Pro 700'), local('FMBolyarSansPro-700'),
                    url('/fonts/FMBolyarSansPro-700.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-700.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-700.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-700.ttf') format('truetype');
                    font-weight: bold;
                    font-style: normal;
}

                    @font-face {
                        font - family: 'FMBolyar Sans Pro 900';
                    src: url('/fonts/FMBolyarSansPro-900.eot');
                    src: local('FMBolyar Sans Pro 900'), local('FMBolyarSansPro-900'),
                    url('/fonts/FMBolyarSansPro-900.eot?#iefix') format('embedded-opentype'),
                    url('/fonts/FMBolyarSansPro-900.woff2') format('woff2'),
                    url('/fonts/FMBolyarSansPro-900.woff') format('woff'),
                    url('/fonts/FMBolyarSansPro-900.ttf') format('truetype');
                    font-weight: 900;
                    font-style: normal;
}



                    body {
                        font - family: 'FMBolyar Sans Pro 300', sans-serif;
}

                    body ,html{
                        padding: 0;
                    margin: 0;
                    background-image: url('https://syntax.tailwindui.com/_next/static/media/blur-cyan.d28a5585.png');
                    background-size: cover;
}

                    @layer base {
                        input[type = "number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                        -webkit - appearance: none;
                    margin: 0;
  }
}
`}</style>


            </Head>
            <Toaster />
            {loading ? <PreLoader /> :
                <>
                    <header className="   sm:px-12  sm:gap-12">
                        <Header />
                    </header>

                    <main className="mt-8 md:px-6 flex flex-col gap-8 sm:px-12 sm:mt-16 sm:gap-12">
                        <Stats />
                        <Tabs />

                        {selectedTab === "burn" && <Burn />}
                        {selectedTab === "stake" && <Staking />}
                        {selectedTab === "trade" && <Dex />}


                        {/* <Burn/> */}
                    </main>
                    <Footer />
                </>

            }
        </div>
    );
};

export default Home;
