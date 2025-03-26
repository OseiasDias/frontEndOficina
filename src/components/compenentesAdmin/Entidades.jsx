/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaBlogger, FaBox } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCalendarDays, FaCarRear } from "react-icons/fa6";
//import { GrServices } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
//import { IoNewspaperSharp } from "react-icons/io5";
import axios from "axios"; // Usando axios para facilitar as requisições
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';




// Configurando o localizador para usar o Moment.js
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configurando o moment.js para português
moment.locale('pt');  // Configurando o idioma para português

const MeuCalendario = () => {
  const [events, setEvents] = useState([
    {
      title: 'Reunião',
      start: new Date(2024, 11, 1, 10, 0), // 1 de dezembro de 2024 às 10:00
      end: new Date(2024, 11, 1, 12, 0),   // 1 de dezembro de 2024 às 12:00
    },
    {
      title: 'Almoço',
      start: new Date(2024, 11, 5, 12, 0), // 5 de dezembro de 2024 às 12:00
      end: new Date(2024, 11, 5, 13, 0),   // 5 de dezembro de 2024 às 13:00
    },
  ]);

  const localizer = momentLocalizer(moment);

  return (
    <div>
      <h6 className="my-3">Calendário</h6>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 450 }}
        width="50%"
        defaultView="month"
        selectable
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={slotInfo =>
          alert(`Você selecionou ${slotInfo.start} - ${slotInfo.end}`)
        }
        className="box-calendario p-4"
      />
    </div>
  );
};





// Dados de exemplo
const data = [
  { name: 'Clientes', uv: 590, pv: 800, amt: 1400, cnt: 490 },
  { name: 'Funcionários', uv: 868, pv: 967, amt: 1506, cnt: 590 },
  { name: 'Veículos', uv: 550, pv: 450, amt: 650, cnt: 750 },
  { name: 'Agendamentos', uv: 1480, pv: 1200, amt: 1228, cnt: 480 },
  { name: 'Estoque', uv: 250, pv: 150, amt: 150, cnt: 150 },
  { name: 'Fornecedores', uv: 1400, pv: 680, amt: 1700, cnt: 380 },
  { name: 'Serviços', uv: 1400, pv: 680, amt: 1700, cnt: 380 },
  { name: 'Faturas', uv: 1400, pv: 680, amt: 700, cnt: 180 },
];

const Grafico = () => {
  return (
    <>
      <h6>Gráfico de Métricas</h6>
      <div >
        <ResponsiveContainer width="100%" height={450} className="sombraGrafico ">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            <Scatter dataKey="cnt" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};


const API_URL = import.meta.env.VITE_API_URL;






export default function Entidades() {
  // Estado para armazenar as quantidades
  const [quantidades, setQuantidades] = useState({
    clientes: 0,
    funcionarios: 0,
    agendamentos: 0,
    blogs: 0,
    estoque: 0,
    faturas: 0,
    pagamentos: 0,
    servicos: 0,
    veiculos: 0
  });

  // Função para buscar as quantidades de cada entidade
  const buscarQuantidades = async () => {
    try {
      const [
        clientes,
        funcionarios,
        agendamentos,
        blogs,
        estoque,
        faturas,
        pagamentos,
        servicos,
        veiculos
      ] = await Promise.all([
        axios.get(`${API_URL}/clientesContar`),
        axios.get(`${API_URL}/usuario/total`),
        axios.get(`${API_URL}/agendamentos/total`),
        axios.get(`${API_URL}/blogs/total`),
        axios.get(`${API_URL}/estoque/total`),
        axios.get(`${API_URL}/fatura/total`),
        axios.get(`${API_URL}/pagamento/total`),
        axios.get(`${API_URL}/servico/total`),
        axios.get(`${API_URL}/veiculo/total`)
      ]);

      setQuantidades({
        clientes: clientes,
        funcionarios: funcionarios.data.total,
        agendamentos: agendamentos.data.total,
        blogs: blogs.data.total,
        estoque: estoque.data.total,
        faturas: faturas.data.total,
        pagamentos: pagamentos.data.total,
        servicos: servicos.data.total,
        veiculos: veiculos.data.total
      });
    } catch (error) {
      console.error("Erro ao buscar quantidades", error);
    }
  };

  // Executa a busca das quantidades quando o componente for montado
  useEffect(() => {
    buscarQuantidades();
  }, []);

  return (
    <>
      <div className="seccao-entidade mt-5">
        <div className="row vh-100 alturaPereita">

          <div className="col-12">
            <h6 className="pb-3">Principais Entidades do Sistema</h6>


            <div className="row">

              <div className="col-6 col-md-4 col-lg-2">
                <div className="abertura mb-3 py-3">
                  <Link to="/clienteList">
                    <div className="box-icon">
                      <FaCircleUser className="ikone" />
                    </div>
                    <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                      {quantidades.clientes}
                    </span>
                    <div>
                      <h6 className="text-center text-black tituloSh">Clientes</h6>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-2">
                <div className="abertura mb-3 py-3">
                  <Link to="/funcionariosList">
                    <div className="box-icon">
                      <FaUser className="ikone" />
                    </div>
                    <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                      {quantidades.funcionarios}
                    </span>
                    <div>
                      <h6 className="text-center text-black tituloSh">Funcionários</h6>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-2">
                <div className="abertura mb-3 py-3">
                  <Link to="/agendamentoList">
                    <div className="box-icon">
                      <FaCalendarDays className="ikone" />
                    </div>
                    <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                      {quantidades.agendamentos}
                    </span>
                    <div>
                      <h6 className="text-center text-black tituloSh">Agendamentos</h6>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-2">
                <div className="abertura mb-3 py-3">
                  <Link to="/blogList">
                    <div className="box-icon">
                      <FaBlogger className="ikone" />
                    </div>
                    <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                      {quantidades.blogs}
                    </span>
                    <div>
                      <h6 className="text-center text-black tituloSh">Blogger</h6>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-2">
                <div className="abertura mb-3 py-3">
                  <Link to="/estoqueList">
                    <div className="box-icon">
                      <FaBox className="ikone" />
                    </div>
                    <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                      {quantidades.estoque}
                    </span>
                    <div>
                      <h6 className="text-center text-black tituloSh">Estoque</h6>
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="col-6 col-md-4 col-lg-2">
                <div className="abertura mb-3 py-3">
                  <Link to="/veiculosList">
                    <div className="box-icon">
                      <FaCarRear className="ikone" />
                    </div>
                    <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                      {quantidades.veiculos}
                    </span>
                    <div>
                      <h6 className="text-center text-black tituloSh">Veículos</h6>
                    </div>
                  </Link>
                </div>

              </div>
              <Grafico />







            </div>


          </div>


          <MeuCalendario />

        </div>



      </div>



      <div className="text-center mt-5 ppAr">
        <hr />
        <p className="text-center">
          Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
          <br />Desenvolvido por: <b>Oseias Dias</b>
        </p>
      </div>

    </>
  );
}
