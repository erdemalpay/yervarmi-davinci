import Image from "next/image";
import { useTables } from "../utils/hooks/useTables";
import { format } from "date-fns";
import gamePic from "../public/boardgame.png";
import { Button } from "./Button";
import { TableIcon } from "../icons/TableIcon";
import { EmptyTableIcon } from "../icons/EmptyTableIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import { MapIcon } from "../icons/MapIcon";
import { LocationSelectorProps } from "./LocationSelector";
import { useReservations } from "../utils/hooks/useReservations";

const MAX_TABLE_COUNT = 28;

export const Neorama = ({ setLocation }: LocationSelectorProps) => {
  const date = format(new Date(), "yyyy-MM-dd");
  const { tableCount, isTablesLoading } = useTables(date, 2);
  const { reservedTableCount, isReservationsLoading } = useReservations(
    date,
    2
  );
  const availableTables = MAX_TABLE_COUNT - tableCount;
  let message = "";
  if (availableTables >= MAX_TABLE_COUNT) {
    message = `Evet tamamen boş. Henüz açılmamış olabilir mi?`;
  } else if (availableTables > 12) {
    message = `Evet.`;
  } else if (availableTables > 5) {
    message = `Evet ama dolmaya başlamış.`;
  } else if (availableTables > 0) {
    message = `Evet ama dolmak üzere. Yarım saat içinde geleceksen kafeyi arayarak yer ayırmalısın.`;
  } else if (availableTables <= 0) {
    message = `Hayır maalesef şu an yer kalmamış. Gelmeyi planlıyorsan kafeyi arayarak sıraya ismini yazdırabilirsin.`;
  }

  const tables = [];

  for (let i = 0; i < Math.min(tableCount, MAX_TABLE_COUNT); i++) {
    tables.push(
      <div className="flex justify-center" key={i}>
        <TableIcon />
      </div>
    );
  }
  for (let i = tableCount; i < MAX_TABLE_COUNT; i++) {
    tables.push(
      <div className="flex justify-center" key={i}>
        <EmptyTableIcon />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-full flex flex-col bg-[#FBEEE2]">
        <div className="flex justify-center w-full font-germania text-2xl lg:text-4xl">
          <div
            className="text-center bg-dark-brown text-light-brown h-20 w-4/5 justify-center flex items-center cursor-pointer"
            onClick={() => setLocation(1)}
          >
            Bahçeli
          </div>
          <div
            className="text-center bg-[#FBEEE2] text-dark-brown h-20 w-4/5 justify-center flex items-center cursor-pointer"
            onClick={() => setLocation(2)}
          >
            Neorama
          </div>
        </div>
        <div className="leading-[0] flex justify-center lg:mt-4">
          <Image src={gamePic} alt="Board Game" />
        </div>
        {!isTablesLoading && (
          <div className="px-8 pb-4 rounded-lg flex flex-col justify-center w-full">
            <div className="text-center text-dark-brown text-3xl lg:text-6xl font-germania">
              {`Da Vinci Neorama'da yer var mı?`}
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
                <div className="p-4 grid grid-cols-7 w-full justify-center">
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
                onClick={() => (document.location.href = "tel:03122867860")}
              >
                Kafeyi Ara
                <span className="hidden lg:inline">0312 286 78 60</span>
              </Button>
              <Button
                className="bg-light-brown text-dark-brown "
                borderstyles="border-light-brown"
                Icon={MapIcon}
                onClick={() =>
                  (document.location.href =
                    "https://www.google.com/maps/dir/?api=1&destination=Neorama+Plaza")
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
