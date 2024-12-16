import { useEffect, useState } from "react";
import '../css/tabelaVerAgendamento.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, Button } from 'react-bootstrap';
import ModalUpdateAgendamento from "./ModalUpdateAgendamento"; // Modal de atualização
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalVerAllAgendamento from "./ModalVerAllAgendamento";

function BotaoMenu({ onCancel, onUpdate, onVisao }) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="corEdite" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={onVisao}>Visão Completa</Dropdown.Item> {/* Exibe o modal completo */}
        <Dropdown.Item onClick={onUpdate}>Atualizar</Dropdown.Item> {/* Atualiza o agendamento */}
        <Dropdown.Item onClick={onCancel}>Cancelar</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function TabelaVerAgendamento({ clienteId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [veiculos, setVeiculos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [showActualizarModalAgendamento, setShowActualizarModalAgendamento] = useState(false);
  const [showVerModalAgendamento, setShowVerModalAgendamento] = useState(false);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        const responseAgendamentos = await fetch(`http://localhost:5000/api/agendamentos/cliente/${clienteId}`);
        const responseVeiculos = await fetch(`http://localhost:5000/api/veiculos/cliente/${clienteId}`);
        if (!responseAgendamentos.ok || !responseVeiculos.ok) {
          throw new Error('Erro ao buscar agendamentos ou veículos');
        }

        const dataAgendamentos = await responseAgendamentos.json();
        const dataVeiculos = await responseVeiculos.json();

        const veiculosMap = dataVeiculos.reduce((map, veiculo) => {
          map[veiculo.id_veiculo] = veiculo;
          return map;
        }, {});

        setAgendamentos(dataAgendamentos);
        setVeiculos(veiculosMap);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDados();
  }, [clienteId]);

  const handleCancelarAgendamento = async () => {
    if (agendamentoSelecionado) {
      try {
        await fetch(`http://localhost:5000/api/agendamentos/${agendamentoSelecionado}`, {
          method: 'DELETE',
        });
        setAgendamentos((prevAgendamentos) =>
          prevAgendamentos.filter((agendamento) => agendamento.id_agendamento !== agendamentoSelecionado)
        );
        setConfirmModalShow(false);
        toast.success('Agendamento cancelado com sucesso!');
      } catch (error) {
        setError('Erro ao cancelar o agendamento');
      }
    }
  };

  const handleVerAgendamento = (agendamentoId) => {
    setAgendamentoSelecionado(agendamentoId);
    setShowVerModalAgendamento(true);
  };

  const filteredAgendamentos = agendamentos.filter((agendamento) => {
    const idVeiculoStr = String(agendamento.id_veiculo || "").toLowerCase();
    return (
      idVeiculoStr.includes(searchTerm.toLowerCase()) ||
      agendamento.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agendamento.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatData = (data) => {
    return data.slice(0, 10);  // Apenas ano, mês e dia
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="bg-agendamento container mb-5">
      <h3 className="my-4">Meus Agendamentos</h3>
      <div className="row mb-3 justify-content-end">
        <div className="col-12 col-md-8 col-lg-6">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por veículo, status ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredAgendamentos.length > 0 ? (
          filteredAgendamentos.map((agendamento) => {
            const veiculo = veiculos[agendamento.id_veiculo];
            return (
              <div key={agendamento.id_agendamento} className="col-12 col-md-6 col-lg-4 my-3">
                <div className="bg-light p-3 dadoAgendamento">
                  <p><strong>Data:</strong> {formatData(agendamento.data)}</p>
                  {veiculo ? (
                    <>
                      <p><strong>Marca:</strong> {veiculo.marca}</p>
                      <p><strong>Modelo:</strong> {veiculo.modelo}</p>
                      <p><strong>Placa:</strong> {veiculo.placa}</p>
                    </>
                  ) : (
                    <p><em>Veículo não encontrado</em></p>
                  )}
                  <p><strong>Status:</strong> {agendamento.status}</p>
                  <p className="d-flex bord justify-content-between">
                    <div className="dv"></div>
                    <BotaoMenu
                      onCancel={() => {
                        setConfirmModalShow(true);
                        setAgendamentoSelecionado(agendamento.id_agendamento);
                      }}
                      onUpdate={() => {
                        setShowActualizarModalAgendamento(true);
                        setAgendamentoSelecionado(agendamento.id_agendamento);
                      }}
                      onVisao={() => handleVerAgendamento(agendamento.id_agendamento)}
                    />
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <p>Nenhum agendamento encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      <Modal show={confirmModalShow} onHide={() => setConfirmModalShow(false)} centered>
        <div className="bordarConfirma">
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Cancelamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja cancelar este agendamento?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setConfirmModalShow(false)}>Não </Button>
            <Button style={{ backgroundColor: "#044697" }} onClick={handleCancelarAgendamento}>Sim, cancelar</Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Modal de Atualização */}
      <ModalUpdateAgendamento
        show={showActualizarModalAgendamento}
        onHide={() => setShowActualizarModalAgendamento(false)}
        agendamentoId={agendamentoSelecionado}
      />

      {/* Modal de Visão Completa */}
      <ModalVerAllAgendamento
        show={showVerModalAgendamento}
        onHide={() => setShowVerModalAgendamento(false)}
        agendamentoId={agendamentoSelecionado}
      />

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
}

export default TabelaVerAgendamento;
