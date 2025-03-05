import Footer from "@/components/Footer";
import Main from "@/components/Main";
import { Banner } from "@/components/Banner";


export default async  function Home() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
   await delay(8000);
  return (
    <div className=" flex flex-col min-h-screen">
      <Banner image="/home-banner.png"/>
      <Main/>
      <Footer/>

    </div>
  );
}
