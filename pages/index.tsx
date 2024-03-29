import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import titleBackground from "../public/title-background.png";
import { Bahceli } from "../components/Bahceli";
import { useState } from "react";
import { LocationSelector } from "../components/LocationSelector";
import { Neorama } from "../components/Neorama";

const Home: NextPage = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(0);
  return (
    <div>
      <Head>
        <title>{`Da Vinci'de yer var mı?`}</title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="w-full h-screen flex flex-col bg-[#FBEEE2]">
        <div className="flex w-full h-16">
          <div className="relative w-full">
            <Image
              className=""
              src={titleBackground}
              alt="background"
              layout="fill"
            />
            <Image
              className=""
              src={titleBackground}
              alt="background"
              layout="fill"
            />
            <div className="text-light-brown text-2xl h-full relative font-germania">
              <div className="flex justify-center items-center h-full">
                Da Vinci Board Game Cafe
              </div>
            </div>
          </div>
        </div>
        {selectedLocationId === 0 && (
          <LocationSelector setLocation={setSelectedLocationId} />
        )}
        {selectedLocationId === 1 && (
          <Bahceli setLocation={setSelectedLocationId} />
        )}
        {selectedLocationId === 2 && (
          <Neorama setLocation={setSelectedLocationId} />
        )}
      </div>
    </div>
  );
};

export default Home;
