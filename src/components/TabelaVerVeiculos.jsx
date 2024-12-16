import { useState } from 'react';
import '../css/tabelaVerVeiculos.css';
import fotoCarro from '../assets/img/carroParticular.jpg';
import Dropdown from 'react-bootstrap/Dropdown';

function BotaoMenu() {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="corEditando">

      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Editar</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Apagar</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function TabelaVerAgendamento() {
    const agendamentos = [
        { id_veiculo: "V123", marca: "Toyota", modelo: "Corolla", ano: "2021", placa: "ABC-1234", fotos: [fotoCarro, fotoCarro], status_reparacao: "Em andamento" },
        { id_veiculo: "V124", marca: "Honda", modelo: "Civic", ano: "2020", placa: "XYZ-5678", fotos: [fotoCarro, fotoCarro], status_reparacao: "Concluído" },
        { id_veiculo: "V125", marca: "Ford", modelo: "Focus", ano: "2019", placa: "LMN-9012", fotos: [fotoCarro, fotoCarro], status_reparacao: "Aguardando peças" }
    ];

    // Estado para o valor da pesquisa
    const [searchTerm, setSearchTerm] = useState("");

    // Função para filtrar agendamentos com base na pesquisa
    const agendamentosFiltrados = agendamentos.filter(agendamento =>
        agendamento.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agendamento.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agendamento.placa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-agendamento mb-5">
           

            {/* Barra de pesquisa */}
            <div className="container">
                <div className="row justify-content-end">
                <h3>Meus Veiculos</h3>
                    <div className="col-12 col-md-8 col-lg-6 my-3">
                       
                        <input 
                type="text" 
                placeholder="Buscar por marca, modelo ou placa..." 
                className="form-control my-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
                       
                    </div>
                </div>
            </div>

            {/* Exibição dos agendamentos filtrados */}
            <div className="container">
                <div className="row">
                    {agendamentosFiltrados.map((agendamento) => (
                        <div key={agendamento.id_veiculo} className="col-12 col-md-6 col-lg-4 my-2">
                            <div className="dadoAgendamento bg-light p-3">
                                <p><strong>ID Veículo:</strong> {agendamento.id_veiculo}</p>
                                <p><strong>Marca:</strong> {agendamento.marca}</p>
                                <p><strong>Modelo:</strong> {agendamento.modelo}</p>
                                <p><strong>Ano:</strong> {agendamento.ano}</p>
                                <p><strong>Placa:</strong> {agendamento.placa}</p>
                                <p><strong>Status de Reparação:</strong> {agendamento.status_reparacao}</p>
                                <div>
                                    <strong>Fotos do Veículo:</strong>
                                    <div className=" d-flex mt-2">
                                        {agendamento.fotos.map((foto, index) => (
                                            <img 
                                                key={index} 
                                                src={foto} 
                                                alt={`Foto do veículo ${index + 1}`} 
                                                style={{ width: '50px', height: '50px', marginRight: '5px' }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <BotaoMenu />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TabelaVerAgendamento;
