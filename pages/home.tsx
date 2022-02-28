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

const Home: NextPage = () => {
  const date = format(new Date(), "yyyy-MM-dd");
  const { tableCount, isLoading } = useTables(date);
  const availableTables = 15 - tableCount;
  let message = "";
  if (availableTables >= 15) {
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
    tables.push(<TableIcon />);
  }
  for (let i = tableCount; i < 15; i++) {
    tables.push(<EmptyTableIcon />);
  }

  return (
    <div>
      <Head>
        <title>{`Da Vinci'de yer var mı?`}</title>
        <meta name="description" content="" />
      </Head>

      <div className="w-full h-full flex flex-col bg-[#FBEEE2]">
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
        <div className="leading-[0]">
          <Image src={gamePic} alt="Board Game" />
        </div>
        {!isLoading && (
          <div className="p-8 rounded-lg flex flex-col justify-center md:w-1/3 w-full">
            <div className="text-center text-dark-brown text-3xl font-germania">
              {`Da Vinci'de yer var mı?`}
            </div>
            <div className="text-center text-dark-brown text-xs font-merriweather mt-4">
              {message}
            </div>
            {availableTables > 0 && (
              <div className="text-center text-dark-brown text-xs font-merriweather mt-2 font-bold">
                {`Şu an ${availableTables} boş masa var.`}
              </div>
            )}
            <div className="p-4 grid grid-cols-5 w-full mt-2">{tables}</div>
            <div className="text-center text-dark-brown text-xs font-merriweather">
              Emin olmak için kafeyi arayabilirsin.
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <Button
                className="bg-dark-brown text-light-brown border-dark-brown"
                borderstyles="border-dark-brown"
                icon={PhoneIcon}
                onClick={() => (document.location.href = "tel:03128200301")}
              >
                Kafeyi Ara
              </Button>
              <Button
                className="bg-light-brown text-dark-brown "
                borderstyles="border-light-brown"
                icon={MapIcon}
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
