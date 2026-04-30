import { useTables } from "../utils/hooks/useTables";
import { format } from "date-fns";
import { TableIcon } from "../icons/TableIcon";
import { EmptyTableIcon } from "../icons/EmptyTableIcon";
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
  const numericTableCount = Number(location.tableCount) - 1 || 0;
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
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const todayHours = location.dailyHours?.find((dh) => dh.day === currentDay);
    const closedDays = location.dailyHours
      ?.filter((dh) => dh.isClosed)
      .map((dh) => t(`days.${dh.day}`))
      .join(", ");

    if (todayHours?.isClosed) {
      message = closedDays
        ? t("availability.closedDays", { days: closedDays })
        : t("availability.closedToday");
      isOpen = false;
    } else if (todayHours?.openingTime && todayHours?.closingTime) {
      const isBeforeOpening = currentTime < todayHours.openingTime;
      const isAfterClosing = currentTime >= todayHours.closingTime;

      if (isBeforeOpening) {
        message = t("availability.opensAt", { time: todayHours.openingTime });
        isOpen = false;
      } else if (isAfterClosing) {
        message = t("availability.closedNow", {
          hours: `${todayHours.openingTime} - ${todayHours.closingTime}`,
        });
        isOpen = false;
      }
    }

    if (isOpen) {
      const fullnessPercentage =
        numericTableCount > 0 ? availableTables / numericTableCount : 1;

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
    <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
      <div className="w-full">
        {/*
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
        */}
{!isTablesLoading && (
          <div
            className="flex flex-col justify-center w-full max-w-3xl mx-auto px-6 py-8 lg:px-10 lg:py-10"
            style={{
              backgroundColor: "#F7F3ED",
              borderRadius: "1.25rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div className="text-center text-3xl lg:text-5xl font-body font-bold" style={{ color: "#1F2937" }}>
              {t("location.title", { locationName: location.name })}
            </div>
            <div className="text-center text-base lg:text-xl font-body mt-6" style={{ color: "#1F2937" }}>
              {message}
            </div>
            {isOpen && availableTables > 0 && (
              <div className="text-center text-base lg:text-xl font-body font-bold" style={{ color: "#1F2937" }}>
                {t("location.availableTables", { count: availableTables })}
              </div>
            )}
            {isOpen && (
              <div className="flex justify-center w-full mt-4">
                <div className="flex justify-center w-full">
                  <div
                    className="p-2 grid gap-1 w-full max-w-2xl"
                    style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}
                  >
                    {tables}
                  </div>
                </div>
              </div>
            )}

          {/* Aksiyon butonları */}
          <div className="flex justify-center w-full mt-6">
          <div className="flex flex-col gap-3 w-full">
            {isOpen && (
              <p
                className="text-center font-body mb-1"
                style={{ fontSize: "0.8rem", color: "var(--davinci-black, #1F2937)" }}
              >
                {t("location.callCafe")}
              </p>
            )}
            {location.phoneNumber && (
              <button
                onClick={() => (document.location.href = `tel:${location.phoneNumber}`)}
                className="w-full flex items-center justify-center gap-2 font-body font-semibold text-white rounded-full transition-all duration-200"
                style={{
                  background: "var(--red, #A80000)",
                  padding: "14px 24px",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 20px rgba(168,0,0,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red-dark, #540000)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(168,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--red, #A80000)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(168,0,0,0.25)";
                }}
              >
                <img src="/phone.svg" alt="" className="w-5 h-5" />
                {t("location.callButton")}
                <span className="hidden lg:inline">
                  {formatPhoneNumber(location.phoneNumber)}
                </span>
              </button>
            )}

            {mapsHref && (
              <button
                onClick={() => (document.location.href = mapsHref)}
                className="w-full flex items-center justify-center gap-2 font-body font-semibold text-white rounded-full transition-all duration-200"
                style={{
                  background: "var(--red, #A80000)",
                  padding: "14px 24px",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 20px rgba(168,0,0,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red-dark, #540000)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(168,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--red, #A80000)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(168,0,0,0.25)";
                }}
              >
                <img src="/map.svg" alt="" className="w-5 h-5" style={{ filter: "brightness(0) invert(1)" }} />
                {t("location.directionsButton")}
              </button>
            )}
          </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
