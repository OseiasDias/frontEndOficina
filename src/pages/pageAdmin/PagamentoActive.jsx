import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { IoIosAdd } from "react-icons/io";
import PagarActive from "../../components/compenentesAdmin/PagarActive.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";



const PagamentoActive = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin  entrada="Realizar Pagamentos" leftSeta={<FaArrowLeftLong />}  icone={<IoIosAdd />}  leftR="/pagamentoList" />

            <div className="vh-100 alturaPereita">
              <PagarActive />
            </div>
            <div className="div text-center  oculte np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">

                Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
                reservados.
                <br />
                Desenvolvido por: <b>Oseias Dias</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PagamentoActive;
