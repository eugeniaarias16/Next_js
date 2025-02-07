import Footer from "components/Footer";
import Main from "components/Main";
import { Banner } from "components/Banner";


export default function Home() {
  return (
    <div className=" flex flex-col min-h-screen">
      <Banner image="/home-banner.png"/>
      <Main/>
      <Footer/>

    </div>
  );
}
