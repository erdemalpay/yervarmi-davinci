import { Button } from "./Button";
import { Location } from "../utils/hooks/useLocations";
import { useTranslation } from "react-i18next";

export interface LocationSelectorProps {
  locations: Location[];
  setLocation: (location: number) => void;
}

export function LocationSelector({
  locations,
  setLocation,
}: LocationSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full mt-4 gap-10 lg:text-xl mx-2 lg:mx-[400px] justify-center">
      <div className="text-center text-dark-brown text-3xl lg:text-6xl font-germania">
        {t("home.selectLocation")}
      </div>
      {locations.map((location, index) => (
        <Button
          key={location._id}
          className={
            index % 2 === 0
              ? "bg-dark-brown text-light-brown border-dark-brown"
              : "bg-light-brown text-dark-brown"
          }
          borderstyles={
            index % 2 === 0 ? "border-dark-brown" : "border-light-brown"
          }
          onClick={() => setLocation(location._id)}
        >
          {location.name}
        </Button>
      ))}
    </div>
  );
}
