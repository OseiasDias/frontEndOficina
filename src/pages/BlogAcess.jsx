import BarraMenuCliente from "../components/BarraMenuCliente";
import ConteudoBlog from "../components/ConteudoBlog";
import Footer from "../components/Footer";



export default function BlogAcess(){

    return(

        <>
        <BarraMenuCliente />
        <ConteudoBlog />
        <div className="mt-5">
        <Footer />
        </div>
        </>
    )
}