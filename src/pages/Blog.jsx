import BarraTopInicial from "../components/BarraTopInicial";
import ConteudoBlog from "../components/ConteudoBlog";
import Footer from "../components/Footer";



export default function Blog(){

    return(

        <>
        <BarraTopInicial />
        <ConteudoBlog />
        <div className="mt-5">
        <Footer />
        </div>      
        </>
    )    
}