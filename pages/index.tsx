import type { NextPage } from "next";
import Head from "next/head";
import { useTables } from "../utils/hooks/useTables";
import { format } from "date-fns";
import ClipLoader from "react-spinners/ClipLoader";

const Home: NextPage = () => {
  const date = format(new Date(), "yyyy-MM-dd");
  const { tableCount, isLoading } = useTables(date);
  const availableTables = 15 - tableCount;
  let message = "";
  if (availableTables >= 15) {
    message = `Evet şu an kafe tamamen boş. (Henüz açılmamış olabilir mi?) Emin olmak için kafeyi arayabilirsin.`;
  } else if (availableTables > 7) {
    message = `Evet şu an ${availableTables} boş masa var. Emin olmak için kafeyi arayabilirsin.`;
  } else if (availableTables > 3) {
    message = `Evet ama dolmaya başlamış. Şu an ${availableTables} boş masa var. Emin olmak için kafeyi arayabilirsin.`;
  } else if (availableTables > 0) {
    message = `Evet ama dolmak üzere, sadece ${availableTables} boş masa var. Yarım saat içinde geleceksen kafeyi arayarak yer ayırmalısın.`;
  } else {
    message = `Hayır maalesef şu an yer kalmamış. Gelmeyi planlıyorsan kafeyi arayarak sıraya ismini yazdırabilirsin.`;
  }

  return (
    <div>
      <Head>
        <title>{`Da Vinci'de yer var mı?`}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-4/5 md:w-1/3 h-1/4 absolute m-auto top-0 bottom-0 right-0 left-0">
        <div className="bg-gray-200 p-4 rounded-lg flex flex-col justify-center">
          <ClipLoader loading={isLoading} size={15} />
          {!isLoading && <h1 className="text-lg text-center">{message}</h1>}
          {!isLoading && (
            <>
              <div className="flex bg-gray-400 rounded-lg justify-center w-full text-2xl md:hidden">
                <a href="tel:03128200301">Kafeyi ara</a>
              </div>
              <div className="justify-center w-full text-2xl hidden md:flex">
                <a href="tel:03128200301">
                  Kafe telefon numarasi: 0312 820 03 01
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
