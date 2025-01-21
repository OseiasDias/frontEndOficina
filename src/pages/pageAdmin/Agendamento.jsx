import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import TabelaVizualizarAgendamento from "../../components/compenentesAdmin/TabelaVizualizarAgendamentos.jsx";
import { RiAddFill } from "react-icons/ri";

const Agendamento = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
          <TopoAdmin entrada="Lista de Agendamentos" direccao="/marcarAgendamentoAdimin" icone={<RiAddFill />} leftR="/ProdutosList" />

            {/*<TopoAdmin entrada="Agendamentos" icone={<FaHistory />}  direccao="/agendamentoHistorico"/>
            */}

            <div className="vh-100 alturaPereita">
              <TabelaVizualizarAgendamento />
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

export default Agendamento;
