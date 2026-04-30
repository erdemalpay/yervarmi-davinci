import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F3ED", position: "relative", overflow: "hidden" }}>
      {/* Logo döşeme arka planı */}
      <div
        aria-hidden="true"
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: "url('/images/logo.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px auto",
          filter: "grayscale(1) brightness(0.5)",
        }}
      />

      <Head>
        <title>{t("common.title")}</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#111827" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#111827" />
      </Head>

      {/* Header */}
      <header
        style={{
          position: "relative",
          zIndex: 10,
          background: "linear-gradient(180deg, #111827 0%, #1F2937 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
        }}
        className="w-full h-16 flex items-center px-4 lg:px-8"
      >
        <div className="flex items-center justify-between w-full">
          <a href="https://davinciboardgame.com" className="flex items-center">
            <img
              src="/images/davinci-logo.png"
              alt="Da Vinci Board Game"
              className="h-10 w-auto object-contain"
            />
          </a>

          <span
            className="font-body font-bold text-white text-xl lg:text-2xl tracking-wide absolute left-1/2 -translate-x-1/2"
            style={{ letterSpacing: "0.04em" }}
          >
            {t("common.appName")}
          </span>

          <LanguageToggle />
        </div>
      </header>
      <main className="flex-1 flex flex-col">
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
      </main>
    </div>
  );
};

export default Home;
