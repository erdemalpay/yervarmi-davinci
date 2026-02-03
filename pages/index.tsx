import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import titleBackground from "../public/title-background.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LocationSelector } from "../components/LocationSelector";
import { LocationPage } from "../components/LocationPage";
import { useLocations } from "../utils/hooks/useLocations";
import { LanguageToggle } from "../components/LanguageToggle";

const Home: NextPage = () => {
  const { t } = useTranslation();

  // TEMPORARY: Şu an sadece bir lokasyon aktif olduğu için direkt _id: 2'yi gösteriyoruz
  // İleride birden fazla lokasyon açıldığında bu magic number'ı kaldırıp
  // LocationSelector'ı tekrar aktif etmek için 0 ile başlatın
  const ACTIVE_LOCATION_ID = 2; // Magic number: Şu an aktif tek lokasyonun ID'si
  const [selectedLocationId, setSelectedLocationId] = useState(ACTIVE_LOCATION_ID); // Çoklu lokasyon için: useState(0)

  const { locations, isLocationsLoading } = useLocations();

  const selectedLocation =
    locations && selectedLocationId > 0
      ? locations.find((loc) => loc._id === selectedLocationId)
      : undefined;

  return (
    <div>
      <Head>
        <title>{t("common.title")}</title>
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
                {t("common.appName")}
              </div>
              <div className="absolute top-2 right-4">
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
        {!isLocationsLoading && locations && (
          <>
            {/* TEMPORARY: LocationSelector şu an kapalı, çünkü sadece bir lokasyon aktif
                İleride birden fazla lokasyon için bu bloğu tekrar aktif edin */}
            {/* {selectedLocationId === 0 && (
              <LocationSelector
                locations={locations}
                setLocation={setSelectedLocationId}
              />
            )} */}
            {selectedLocation && (
              <LocationPage
                location={selectedLocation}
                allLocations={locations}
                onLocationChange={setSelectedLocationId}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
