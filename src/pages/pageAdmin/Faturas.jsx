import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import TabelaVizualizarFaturas from "../../components/compenentesAdmin/TabelaVizualizarFaturas";

const Faturas = () => {
  return (
    <>
     <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Faturas" icone={<IoIosAdd />}  leftR="/estoqueList" direccao="/addFaturas"/>

            <div className="vh-100 alturaPereita">
            <TabelaVizualizarFaturas />
            </div>
            <div className="div text-center np pt-2 mt-2 ppAr">
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

export default Faturas;
