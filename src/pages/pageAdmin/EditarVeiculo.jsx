import "../../css/StylesAdmin/homeAdministrador.css";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TopPerfil from "../../components/compenentesAdmin/TopPerfil";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';



function AtualizarVeiculo({ id_veiculo }) {
    const id = id_veiculo; // Pega o ID da URL
    const navigate = useNavigate(); // Para redirecionar após sucesso
    const [formData, setFormData] = useState({
        marca: "",
        modelo: "",
        ano: "",
        placa: "",
        id_cliente: "",
        status_reparacao: "",
        analise_diagnostica: "",
        motivo_visita: "",
    });
    const [errors, setErrors] = useState({});
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false); // Estado para requisição em andamento

    // Buscar dados do veículo e lista de clientes
    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                setLoading(true);
                console.log(`Buscando dados do veículo com ID: ${id}`);
                const response = await fetch(`http://localhost:5000/api/veiculos/${id}`);
                if (!response.ok) {
                    throw new Error("Erro ao carregar os dados do veículo.");
                }
                const data = await response.json();
                console.log("Dados do veículo carregados:", data);
                setFormData(data);
                toast.success("Dados do veículo carregados!");
            } catch (error) {
                console.error("Erro ao buscar dados do veículo:", error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchClientes = async () => {
            try {
                console.log("Buscando lista de clientes...");
                const response = await fetch("http://localhost:5000/api/clientes");
                if (!response.ok) {
                    throw new Error("Erro ao carregar clientes.");
                }
                const data = await response.json();
                console.log("Lista de clientes carregada:", data);
                setClientes(data);
            } catch (error) {
                console.error("Erro ao buscar lista de clientes:", error.message);
                toast.error(error.message);
            }
        };

        fetchVehicleData();
        fetchClientes();
    }, [id]);

    // Validação dos campos
    const validate = () => {
        const formErrors = {};
        if (!formData.marca) formErrors.marca = "Marca é obrigatória.";
        if (!formData.modelo) formErrors.modelo = "Modelo é obrigatório.";
        if (!formData.ano || !/^\d{4}$/.test(formData.ano)) formErrors.ano = "Ano inválido.";
        if (!formData.placa) formErrors.placa = "Placa é obrigatória.";
        if (!formData.id_cliente) formErrors.id_cliente = "Cliente é obrigatório.";
        return formErrors;
    };

    // Submissão do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            try {
                setLoading(true);
                console.log("Dados enviados ao backend:", formData);
                const response = await fetch(`http://localhost:5000/api/veiculos/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                console.log("Resposta do backend:", result);
                if (!response.ok) {
                    throw new Error(result.message || "Erro ao atualizar veículo.");
                }
                toast.success("Veículo atualizado com sucesso!");
                
                // Aguarda 4 segundos antes de redirecionar
                setTimeout(() => {
                    navigate("/veiculosList");
                }, 4000);
            } catch (error) {
                console.error("Erro na atualização:", error.message);
                toast.error(error.message || "Erro ao atualizar veículo.");
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(formErrors);
            console.log("Erros de validação:", formErrors);
            toast.error("Por favor, corrija os erros no formulário.");
        }
    };

    // Handlers de mudança
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClienteSelect = (clienteId) => {
        setFormData({ ...formData, id_cliente: clienteId });
    };

    const filteredClientes = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Marca</Form.Label>
                        <Form.Control type="text" name="marca" value={formData.marca} onChange={handleChange} isInvalid={!!errors.marca} />
                        <Form.Control.Feedback type="invalid">{errors.marca}</Form.Control.Feedback>
                    </Form.Group>
                </div>
                
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control type="text" name="modelo" value={formData.modelo} onChange={handleChange} isInvalid={!!errors.modelo} />
                        <Form.Control.Feedback type="invalid">{errors.modelo}</Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Ano</Form.Label>
                        <Form.Control type="text" name="ano" value={formData.ano} onChange={handleChange} isInvalid={!!errors.ano} />
                        <Form.Control.Feedback type="invalid">{errors.ano}</Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Placa</Form.Label>
                        <Form.Control type="text" name="placa" value={formData.placa} onChange={handleChange} isInvalid={!!errors.placa} />
                        <Form.Control.Feedback type="invalid">{errors.placa}</Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Cliente</Form.Label>
                        <Form.Control type="text" placeholder="Pesquisar cliente" value={searchTerm} onChange={handleSearchChange} />
                        <div className="list-group mt-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                            {filteredClientes.map((cliente) => (
                                <div key={cliente.id_cliente} className={`list-group-item ${formData.id_cliente === cliente.id_cliente ? "active" : ""}`} onClick={() => handleClienteSelect(cliente.id_cliente)} style={{ cursor: "pointer" }}>
                                    {cliente.nome}
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                </div>

                {/* Campo para Status de Reparação */}
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Status de Reparação</Form.Label>
                        <Form.Control as="select" name="status_reparacao" value={formData.status_reparacao} onChange={handleChange}>
                            <option value="">Selecione o status</option>
                            <option value="pronto a começar">Pronto a começar</option>
                            <option value="em andamento">Em andamento</option>
                            <option value="concluído">Concluído</option>
                        </Form.Control>
                    </Form.Group>
                </div>

            </div>

            {/* Toast Container */}
            <ToastContainer duration={3000} />

            {/* Botão de submissão */}
            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar Veículo"}
            </Button>
        </Form>
    );
}






function VisualizarVeiculo() {
  const { idVeiculo } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [client, setClient] = useState(null);
  const [agendamento, setAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      if (!idVeiculo) {
        throw new Error('ID do veículo não encontrado na URL.');
      }

      // Buscar dados do veículo
      const vehicleResponse = await fetch(`http://localhost:5000/api/veiculos/${idVeiculo}`);
      if (!vehicleResponse.ok) {
        throw new Error(`Erro ao buscar dados do veículo. Código: ${vehicleResponse.status}`);
      }
      const vehicleData = await vehicleResponse.json();
      setVehicle(vehicleData);

      // Buscar dados do cliente associado ao veículo
      if (vehicleData.id_cliente) {
        const clientResponse = await fetch(`http://localhost:5000/api/clientes/${vehicleData.id_cliente}`);
        if (!clientResponse.ok) {
          throw new Error("Erro ao buscar dados do cliente.");
        }
        const clientData = await clientResponse.json();
        setClient(clientData);
      }

      // Buscar dados do agendamento do veículo
      const agendamentoResponse = await fetch(`http://localhost:5000/api/agendamentos/`);
      if (!agendamentoResponse.ok) {
        throw new Error(`Erro ao buscar dados do agendamento. Código: ${agendamentoResponse.status}`);
      }
      const agendamentoData = await agendamentoResponse.json();
      const agendamentoVeiculo = agendamentoData.find(agendamento => agendamento.id_veiculo === parseInt(idVeiculo));
      setAgendamento(agendamentoVeiculo);
    } catch (err) {
      setError(err.message);
      toast.error(`Erro ao carregar os dados: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idVeiculo]); // Chama a função toda vez que o ID muda

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (

    <>
      <TopPerfil nome={client.nome} email={client.email} telefone={client.telefone} />

      <div className="container-fluid">
        <Tabs
          defaultActiveKey="exibir"
          id="fill-tab-example"
          className="mb-3 mt-2"
          fill

        >
          <Tab eventKey="exibir" title={<strong>Mostrar Dados</strong>}>
            <div className=" mt-5">
              <h5>Detalhes do Veículo</h5>
              {vehicle ? (
                <div className="card p-4">
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-6">
                      <p><strong>Marca:</strong> {vehicle.marca || 'Sem informação'}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                      <p><strong>Modelo:</strong> {vehicle.modelo || 'Sem informação'}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                      <p><strong>Ano:</strong> {vehicle.ano || 'Sem informação'}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                      <p><strong>Placa:</strong> {vehicle.placa || 'Sem informação'}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                      <p><strong>Status de Reparação:</strong> {vehicle.status_reparacao || 'Sem informação'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Dados do veículo não encontrados.</p>
              )}

              {client ? (
                <>
                  <h5 className="my-3">Detalhes do Cliente</h5>
                  <div className="card p-4">
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-6">
                        <p><strong>Nome:</strong> {client.nome || 'Sem informação'}</p>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <p><strong>Email:</strong> {client.email || 'Sem informação'}</p>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <p><strong>Endereço:</strong> {client.endereco || 'Sem informação'}</p>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <p><strong>Telefone:</strong> {client.telefone || 'Sem informação'}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <h6 className="my-3 text-danger">Cliente não encontrado.</h6>
              )}

              <h5 className="my-3">Detalhes do Agendamento</h5>
              {agendamento ? (
                <>
                  <div className="card p-4">
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-6">
                        <p><strong>Data de Agendada:</strong> {agendamento.data || 'Sem informação'}</p>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <p><strong>Descrição:</strong> {agendamento.descricao || 'Sem informação'}</p>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6">
                        <p><strong>Motivo de Adiamento:</strong> {agendamento.motivoAdiar || 'Sem informação'}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <h6 className="my-3 text-danger">Veículo entrou sem agendamento.</h6>
              )}

              <ToastContainer position="top-center" autoClose={3000} />
            </div>
          </Tab>
          <Tab eventKey="editarDados" title={<strong>Editar os Dados</strong>}>
            <AtualizarVeiculo  id_veiculo={idVeiculo}/>
          </Tab>

        </Tabs>


      </div>
    </>
  );
}




const EditarVeiculoAll = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin
              entrada="Editar Veículos"
              leftSeta={<FaArrowLeftLong />}
              leftR='/veiculosList' // Redireciona de volta para a lista de agendamentos
            />

            <div className="vh-100 alturaPereita">

              <VisualizarVeiculo />

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

export default EditarVeiculoAll;
