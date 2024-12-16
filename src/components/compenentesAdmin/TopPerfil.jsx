import { BiEnvelope, BiUserCircle } from "react-icons/bi";
import "../../css/StylesAdmin/topPerfil.css";
import { IoCall } from "react-icons/io5";


export default function TopPerfil({foto,nome,telefone,email}) {

    return (
        <>

            <div className="barraPerfilAll    mt-2">
                <div className="bgBarraTop container-fluid">
                   <div className="row corBar">
                   <div className="fotoMcorpo col-6 col-lg-6 col-md-6">
                        <BiUserCircle  className="fotoUser"/>
                    </div>
                    <div className="textoCorpo col-6 col-lg-12 col-md-12">
                        <p>{nome}</p>
                        <p className=" d-flex"><span className="d-flex"><IoCall className="mBaixa"/> {telefone}</span>&nbsp;&nbsp;&nbsp;<span className="d-flex"><BiEnvelope className="mBaixa"/> {email}</span></p>

                    </div>
                </div>
                <div className="bgBarraBottom ">
                    <h1 className="ocultH1">Perfil Func</h1>
                </div>
                   </div>

            </div>


        </>
    )
}