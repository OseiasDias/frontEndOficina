
import { FaArrowRightLong } from "react-icons/fa6";
import ModalLogin from "./ModalLogin";
import { useState } from "react";

export default function TextoGrupoBanner() {


    const [modalShowLogin, setModalShowLogin] = useState(false);

    return (

        <>

            <div className="textoGrupo pt-5">
                <h1 className="h1-home">Agende a manutenção <br /> do seu veículo</h1>
                <h2 className=" text-center">Conheça os nossos serviços</h2>

                <button className="links-acessos mt-3 py-2 px-4 btn-agendar" onClick={() => setModalShowLogin(true)}>Agendar agora <FaArrowRightLong /></button>
                {/* Modal de login */}
      <ModalLogin show={modalShowLogin} onHide={() => setModalShowLogin(false)} />

            </div>

        </>
    )
}