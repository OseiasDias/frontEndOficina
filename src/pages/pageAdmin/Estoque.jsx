import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
//import TabelaVizualizarEstoque from "../../components/compenentesAdmin/TabelaVizualizarEstoque";
import {TabelaVizualizarCompras} from "../pageAdmin/Compra.jsx";
import Construcao from "../../components/compenentesAdmin/Construcao.jsx";


const Estoque = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
       {/*Seccao em construcao */}
                 <Construcao />
          <div className="flexAuto w-100 d-none">
            <TopoAdmin entrada="Estoque" icone={<IoIosAdd />}  leftR="/estoqueList" direccao="/addCompras"/>

            <div className="vh-100 alturaPereita">
            <TabelaVizualizarCompras />
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

export default Estoque;
