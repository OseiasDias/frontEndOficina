
import ContUp from "../components/ContUp";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Banner from '../components/Banner.jsx';
import TabelaVizualizarClientes from "../components/compenentesAdmin/TabelaVizualizarClientes.jsx";

export default function Home() {
  return (
    <>

      <Banner />

      {/**<Servicos /> */}
     <TabelaVizualizarClientes />
      <ContUp />
      <Faq />
      <Footer />




    </>
  );
}
