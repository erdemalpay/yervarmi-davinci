import { Button } from "./Button";

export interface LocationSelectorProps {
  setLocation: (location: number) => void;
}

export function LocationSelector({ setLocation }: LocationSelectorProps) {
  return (
    <div className="flex flex-col h-full mt-4 gap-10 lg:text-xl mx-2 lg:mx-[400px] justify-center">
      <div className="text-center text-dark-brown text-3xl lg:text-6xl font-germania">
        {`Da Vinci'de yer var mı?`}
      </div>
      <Button
        className="bg-dark-brown text-light-brown border-dark-brown"
        borderstyles="border-dark-brown"
        onClick={() => setLocation(1)}
      >
        Bahçeli
      </Button>
      <Button
        className="bg-light-brown text-dark-brown "
        borderstyles="border-light-brown"
        onClick={() => setLocation(2)}
      >
        Neorama
      </Button>
    </div>
  );
}
