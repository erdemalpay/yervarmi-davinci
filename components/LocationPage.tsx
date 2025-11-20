import Image from "next/image";
import { useTables } from "../utils/hooks/useTables";
import { format } from "date-fns";
import gamePic from "../public/boardgame.png";
import { Button } from "./Button";
import { TableIcon } from "../icons/TableIcon";
import { EmptyTableIcon } from "../icons/EmptyTableIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import { MapIcon } from "../icons/MapIcon";
import { Location } from "../utils/hooks/useLocations";
import { formatPhoneNumber } from "../utils/formatters";

type LocationViewProps = {
  location: Location;
  allLocations: Location[];
  onLocationChange: (locationId: number) => void;
};

export const LocationPage = ({
  location,
  allLocations,
  onLocationChange,
}: LocationViewProps) => {
  const date = format(new Date(), "yyyy-MM-dd");
  const { tableCount, isTablesLoading } = useTables(date, location._id);
  const numericTableCount = Number(location.tableCount) || 0;
  const availableTables = numericTableCount - tableCount;
  const gridColumns = Math.max(1, Math.floor(numericTableCount / 4) || 1);
  const mapsHref = location.googleMapsUrl;

  let message = "";
  const fullnessPercentage = numericTableCount > 0
    ? availableTables / numericTableCount
    : 1;

  if (fullnessPercentage >= 1) {
    message = `Evet tamamen boş. Henüz açılmamış olabilir mi?`;
  } else if (fullnessPercentage > 0.4) {
    message = `Evet.`;
  } else if (fullnessPercentage > 0.2) {
    message = `Evet ama dolmaya başlamış.`;
  } else if (fullnessPercentage > 0) {
    message = `Evet ama dolmak üzere. Yarım saat içinde geleceksen kafeyi arayarak yer ayırmalısın.`;
  } else {
    message = `Hayır maalesef şu an yer kalmamış. Gelmeyi planlıyorsan kafeyi arayarak sıraya ismini yazdırabilirsin.`;
  }

  const tables = [];
  for (let i = 0; i < Math.min(tableCount, numericTableCount); i++) {
    tables.push(<TableIcon key={i} />);
  }
  for (let i = tableCount; i < numericTableCount; i++) {
    tables.push(<EmptyTableIcon key={i} />);
  }

  return (
    <div>
      <div className="w-full h-full flex flex-col bg-[#FBEEE2]">
        <div className="flex justify-center w-full font-germania text-2xl lg:text-4xl">
          {allLocations.map((loc) => (
            <div
              key={loc._id}
              className={`text-center h-20 w-4/5 justify-center flex items-center cursor-pointer ${
                loc._id === location._id
                  ? "bg-[#FBEEE2] text-dark-brown"
                  : "bg-dark-brown text-light-brown"
              }`}
              onClick={() => onLocationChange(loc._id)}
            >
              {loc.name}
            </div>
          ))}
        </div>
        <div className="leading-[0] flex justify-center lg:mt-1">
          <Image src={gamePic} alt="Board Game" />
        </div>
        {!isTablesLoading && (
          <div className="px-4 pb-2 rounded-lg flex flex-col justify-center w-full">
            <div className="text-center text-dark-brown text-3xl lg:text-6xl font-germania">
              {`Da Vinci ${location.name}'de yer var mı?`}
            </div>
            <div className="text-center text-dark-brown text-base lg:text-xl font-merriweather mt-2">
              {message}
            </div>
            {availableTables > 0 && (
              <div className="text-center text-dark-brown text-base lg:text-xl font-merriweather font-bold">
                {`Şu an ${availableTables} boş masa var.`}
              </div>
            )}
            <div className="flex justify-center w-full">
              <div className="flex justify-center w-full lg:w-1/2">
                <div
                  className="p-2 grid gap-1 w-full max-w-2xl"
                  style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}
                >
                  {tables}
                </div>
              </div>
            </div>
            <div className="text-center text-dark-brown text-xs font-merriweather">
              Emin olmak için kafeyi arayabilirsin.
            </div>
            <div className="flex flex-col mt-2 gap-1 lg:text-xl mx-2 lg:mx-80">
              {location.phoneNumber && (
                <Button
                  className="bg-dark-brown text-light-brown border-dark-brown"
                  borderstyles="border-dark-brown"
                  Icon={PhoneIcon}
                  onClick={() =>
                    (document.location.href = `tel:${location.phoneNumber}`)
                  }
                >
                  Kafeyi Ara
                  <span className="hidden lg:inline">{formatPhoneNumber(location.phoneNumber)}</span>
                </Button>
              )}
              {mapsHref && (
                <Button
                  className="bg-light-brown text-dark-brown "
                  borderstyles="border-light-brown"
                  Icon={MapIcon}
                  onClick={() => (document.location.href = mapsHref)}
                >
                  Yol tarifi al
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
