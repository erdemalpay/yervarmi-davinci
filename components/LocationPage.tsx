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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const date = format(new Date(), "yyyy-MM-dd");
  const { tableCount, isTablesLoading } = useTables(date, location._id);
  const numericTableCount = Number(location.tableCount)-1 || 0;
  const availableTables = numericTableCount - tableCount;
  const gridColumns = Math.max(1, Math.floor(numericTableCount / 4) || 1);
  const mapsHref = location.googleMapsUrl;

  let message = "";
  let isOpen = true;

  if (!location.active) {
    
    message = location.activityNote || t("availability.temporarilyClosed");
    isOpen = false;
  } else {
    
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[now.getDay()];
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const todayHours = location.dailyHours?.find(dh => dh.day === currentDay);

    const closedDays = location.dailyHours
      ?.filter(dh => dh.isClosed)
      .map(dh => t(`days.${dh.day}`))
      .join(", ");

    if (todayHours?.isClosed) {
      if (closedDays) {
        message = t("availability.closedDays", { days: closedDays });
      } else {
        message = t("availability.closedToday");
      }
      isOpen = false;
    } else if (todayHours?.openingTime && todayHours?.closingTime) {
      
      const isBeforeOpening = currentTime < todayHours.openingTime;
      const isAfterClosing = currentTime >= todayHours.closingTime;

      if (isBeforeOpening) {
        message = t("availability.opensAt", { time: todayHours.openingTime });
        isOpen = false;
      } else if (isAfterClosing) {
        message = t("availability.closedNow", { hours: `${todayHours.openingTime} - ${todayHours.closingTime}` });
        isOpen = false;
      }
    }

    if (isOpen) {
      const fullnessPercentage = numericTableCount > 0
        ? availableTables / numericTableCount
        : 1;

      if (fullnessPercentage >= 1) {
        message = t("availability.fullyEmpty");
      } else if (fullnessPercentage > 0.4) {
        message = t("availability.available");
      } else if (fullnessPercentage > 0.2) {
        message = t("availability.fillingUp");
      } else if (fullnessPercentage > 0) {
        message = t("availability.almostFull");
      } else {
        message = t("availability.noSpace");
      }
    }
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
              {t("location.title", { locationName: location.name })}
            </div>
            <div className="text-center text-dark-brown text-base lg:text-xl font-merriweather mt-2">
              {message}
            </div>
            {isOpen && availableTables > 0 && (
              <div className="text-center text-dark-brown text-base lg:text-xl font-merriweather font-bold">
                {t("location.availableTables", { count: availableTables })}
              </div>
            )}
            {isOpen && (
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
            )}
            {isOpen && (
              <div className="text-center text-dark-brown text-xs font-merriweather">
                {t("location.callCafe")}
              </div>
            )}
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
                  {t("location.callButton")}
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
                  {t("location.directionsButton")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
