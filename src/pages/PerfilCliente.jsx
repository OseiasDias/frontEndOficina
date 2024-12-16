import BarraMenuCliente from "../components/BarraMenuCliente";
import Copyright from "../components/CopyRight";
import EditarPerfilCliente from "../components/EditarPerfilCliente";
//import { Copyright } from "../components/footer";

export default function Perfil() {

    return (
        <>

            <BarraMenuCliente />
            
            <EditarPerfilCliente />
            
            <Copyright />

        </>
    )
}