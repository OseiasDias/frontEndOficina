
import ContUp from "../components/ContUp";
import Faq from "../components/Faq"; 
import Footer from "../components/Footer";  
import Banner from '../components/Banner.jsx'; 
import ServicosCienntes from "../components/ServicosClientes.jsx";



export default function Home() {
  return(
    <>
      <Banner />
      <ServicosCienntes />
      <ContUp />
      <Faq />
      <Footer />
    </>
  );
}
