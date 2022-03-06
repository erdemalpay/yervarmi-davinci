import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useTables } from "../utils/hooks/useTables";
import { format } from "date-fns";
import gamePic from "../public/boardgame.png";
import titleBackground from "../public/title-background.png";
import { Button } from "../components/Button";
import { TableIcon } from "../icons/TableIcon";
import { EmptyTableIcon } from "../icons/EmptyTableIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import { MapIcon } from "../icons/MapIcon";

const MAX_TABLE_COUNT = 16;

const Home: NextPage = () => {
  const date = format(new Date(), "yyyy-MM-dd");
  const { tableCount, isLoading } = useTables(date);
  const availableTables = MAX_TABLE_COUNT - tableCount;
  let message = "";
  if (availableTables >= MAX_TABLE_COUNT) {
    message = `Evet tamamen boş. Henüz açılmamış olabilir mi?`;
  } else if (availableTables > 7) {
    message = `Evet.`;
  } else if (availableTables > 3) {
    message = `Evet ama dolmaya başlamış.`;
  } else if (availableTables > 0) {
    message = `Evet ama dolmak üzere. Yarım saat içinde geleceksen kafeyi arayarak yer ayırmalısın.`;
  } else {
    message = `Hayır maalesef şu an yer kalmamış. Gelmeyi planlıyorsan kafeyi arayarak sıraya ismini yazdırabilirsin.`;
  }

  const tables = [];

  for (let i = 0; i < tableCount; i++) {
    tables.push(
      <div className="flex justify-center">
        <TableIcon key={i} />
      </div>
    );
  }
  for (let i = tableCount; i < MAX_TABLE_COUNT; i++) {
    tables.push(
      <div className="flex justify-center">
        <EmptyTableIcon key={i} />
      </div>
    );
  }

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

      <div className="w-full lg:h-screen h-full flex flex-col bg-[#FBEEE2]">
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
        {/* We are setting line height to 0 to remove space caused by line-height on images (images are assumes as typograhy) */}
        {/* Check magic space topic here https://courses.joshwcomeau.com/css-for-js/01-rendering-logic-1/09-flow-layout */}
        <div className="leading-[0] flex justify-center lg:mt-4">
          <Image src={gamePic} alt="Board Game" />
        </div>
        {!isLoading && (
          <div className="px-8 pb-4 rounded-lg flex flex-col justify-center w-full">
            <div className="text-center text-dark-brown text-3xl lg:text-6xl font-germania">
              {`Da Vinci'de yer var mı?`}
            </div>
            <div className="text-center text-dark-brown text-base lg:text-xl font-merriweather mt-4">
              {message}
            </div>
            {availableTables > 0 && (
              <div className="text-center text-dark-brown text-base lg:text-xl font-merriweather font-bold">
                {`Şu an ${availableTables} boş masa var.`}
              </div>
            )}
            <div className="flex justify-center w-full">
              <div className="flex w-full lg:w-1/2">
                <div className="p-4 grid grid-cols-4 w-full justify-center">
                  {tables}
                </div>
              </div>
            </div>
            <div className="text-center text-dark-brown text-xs font-merriweather">
              Emin olmak için kafeyi arayabilirsin.
            </div>
            <div className="flex flex-col mt-4 gap-2 lg:text-xl mx-2 lg:mx-80">
              <Button
                className="bg-dark-brown text-light-brown border-dark-brown"
                borderstyles="border-dark-brown"
                Icon={PhoneIcon}
                onClick={() => (document.location.href = "tel:03128200301")}
              >
                Kafeyi Ara
                <span className="hidden lg:inline">0312 820 03 01</span>
              </Button>
              <Button
                className="bg-light-brown text-dark-brown "
                borderstyles="border-light-brown"
                Icon={MapIcon}
                onClick={() =>
                  (document.location.href =
                    "https://www.google.com/maps/dir/?api=1&destination=Da+Vinci+Board+Game+Cafe")
                }
              >
                Yol tarifi al
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
