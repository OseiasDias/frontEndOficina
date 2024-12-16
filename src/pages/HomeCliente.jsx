import BarraMenuCliente from "../components/BarraMenuCliente";
import Footer from "../components/Footer";

export default function HomeCliente() {
  return (
    <>
      <BarraMenuCliente />
      <div className="blocked vh-100">
        <h1>Lei</h1>
      </div>
      <Footer />
    </>
  );
}
