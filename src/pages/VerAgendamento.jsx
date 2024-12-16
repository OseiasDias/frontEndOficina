import BarraMenuCliente from "../components/BarraMenuCliente";
import TabelaVerAgendamento from "../components/TabelaVerAgendamento";
import CopyRight from '../components/CopyRight.jsx';





export default function VerAgendamento(){
    const clienteId = 1;
    return(

        <>
      
        <BarraMenuCliente />
        
     
      
       <TabelaVerAgendamento clienteId={clienteId} />

      
        <CopyRight />
       
        </>
    )
}