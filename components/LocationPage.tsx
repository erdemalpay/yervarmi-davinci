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
    <div className="w-full flex flex-col items-center justify-center px-4 py-8">
      {!isTablesLoading && (
        <div
          className="w-full max-w-2xl px-5 py-8 flex flex-col items-center gap-3"
          style={{ background: "#F7F3ED" }}
        >
          {/* Lokasyon başlığı */}
          <h1
            className="font-body font-bold text-center text-davinci-black-deep"
            style={{ fontSize: "clamp(1.75rem, 6vw, 3rem)", lineHeight: 1.2 }}
          >
            {t("location.title", { locationName: location.name })}
          </h1>

          {/* Durum mesajı */}
          <p
            className="text-center font-body"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              color: isOpen ? "var(--davinci-black, #1F2937)" : "var(--red-light, #C94040)",
              fontWeight: isOpen ? 400 : 600,
            }}
          >
            {message}
          </p>

          {/* Boş masa sayısı */}
          {isOpen && availableTables > 0 && (
            <p
              className="text-center font-body font-semibold"
              style={{ color: "var(--red, #A80000)", fontSize: "1.05rem" }}
            >
              {t("location.availableTables", { count: availableTables })}
            </p>
          )}

          {/* Masa grid */}
          {isOpen && (
            <div className="w-full flex justify-center">
              <div
                className="p-2 grid gap-1 w-full"
                style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}
              >
                {tables}
              </div>
            </div>
          )}

          {/* Ara yönlendirme notu */}
          {isOpen && (
            <p
              className="text-center font-body"
              style={{ fontSize: "0.8rem", color: "var(--davinci-black, #1F2937)" }}
            >
              {t("location.callCafe")}
            </p>
          )}

          

          {/* Aksiyon butonları */}
          <div className="w-full flex flex-col gap-3">
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
                className="w-full flex items-center justify-center gap-2 font-body font-semibold rounded-full transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "2px solid #DDE3EB",
                  color: "#1F2937",
                  padding: "13px 24px",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(168,0,0,0.4)";
                  e.currentTarget.style.color = "var(--red, #A80000)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#DDE3EB";
                  e.currentTarget.style.color = "#1F2937";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img src="/map.svg" alt="" className="w-5 h-5" />
                {t("location.directionsButton")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
