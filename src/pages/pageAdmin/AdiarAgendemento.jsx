import "../../css/StylesAdmin/homeAdministrador.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopPerfil from "../../components/compenentesAdmin/TopPerfil";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importante para os estilos do Toast
import Spinner from 'react-bootstrap/Spinner'; // Spinner importado



import { Form, Button } from "react-bootstrap";




function TabelaAgendamento() {
  const { id } = useParams();
  const navigate = useNavigate(); // Definição de useNavigate para navegação
  const [novaData, setNovaData] = useState("");
  const [motivoAdiar, setMotivoAdiar] = useState("");
  const [loading, setLoading] = useState(false);
  const [agendamento, setAgendamento] = useState({});
  const [formErrors, setFormErrors] = useState({}); // Para armazenar os erros de validação
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  // Verifique se o id está definido
  if (!id) {
    toast.error("ID do agendamento não encontrado.");
    return <div>ID do agendamento não encontrado.</div>;
  }

  // Função de validação
  const validate = () => {
    const errors = {};
    const today = new Date();
    const selectedDate = new Date(novaData);

    // Validação da data
    if (!novaData) {
      errors.novaData = "A data é obrigatória";
    } else if (selectedDate < today) {
      errors.novaData = "A data não pode ser no passado";
    } else if (selectedDate.getDay() === 0) { // 0 = Domingo
      errors.novaData = "Agendamentos não podem ser feitos aos domingos";
    }

    // Validação do motivo de adiar
    if (!motivoAdiar) {
      errors.motivoAdiar = "O motivo para adiar é obrigatório";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Retorna true se não houver erros
  };

  // Função para salvar as edições
  const handleSalvarEdicao = async () => {
    if (!validate()) {
      // Se a validação falhar, não envia os dados
      toast.error("Por favor, corrija os erros antes de salvar.");
      return;
    }

    setIsLoading(true); // Usando isLoading para mostrar o spinner

    try {
      const response = await fetch(`http://localhost:5000/api/agendamentos/${id}/adiar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          novaData,
          motivoAdiar,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar o agendamento.");
      }

      const result = await response.json();
      console.log(result);

      toast.success("Agendamento adiado com sucesso!", {
        duration: 2000, // Duração da notificação em milissegundos
        position: "top-center", // Posição da notificação
      });

      setTimeout(() => {
        window.location.reload();
            }, 3000);

      // Limpar os campos após o sucesso
      setNovaData("");
      setMotivoAdiar("");
      setFormErrors({}); // Limpar erros
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Falha ao adiar o agendamento. Verifique os dados e tente novamente.", {
        duration: 3000, // Duração da notificação em milissegundos
        position: "top-center", // Posição da notificação
      });
    } 
  };

  useEffect(() => {
    const fetchAgendamento = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/agendamentos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAgendamento(data);
          setNovaData(data.data ? new Date(data.data).toISOString().split("T")[0] : "");
          setMotivoAdiar(data.motivoAdiar || "");
        } else {
          toast.error("Erro ao carregar os dados do agendamento. Verifique a URL e tente novamente.", {
            duration: 3000, // Duração da notificação em milissegundos
            position: "top-center", // Posição da notificação
          });
        }
      } catch (err) {
        toast.error("Erro ao carregar os dados do agendamento. Verifique a conexão e tente novamente.", {
          duration: 3000, // Duração da notificação em milissegundos
          position: "top-center", // Posição da notificação
        });
      }
    };

    fetchAgendamento();
  }, [id]);

  return (
    <div>
      <h3>Editar Agendamento</h3>
      <Form className="pt-3">
        <Form.Group controlId="formNovaData" className="mt-3">
          <Form.Label>Nova Data de Remarcação</Form.Label>
          <Form.Control
            type="date"
            value={novaData}
            onChange={(e) => setNovaData(e.target.value)}
            disabled={isLoading}
            isInvalid={formErrors.novaData} // Marca o campo como inválido se houver erro
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.novaData}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMotivoAdiar" className="mt-3">
          <Form.Label>Motivo para Adiar</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={motivoAdiar}
            onChange={(e) => setMotivoAdiar(e.target.value)}
            disabled={isLoading}
            isInvalid={formErrors.motivoAdiar} // Marca o campo como inválido se houver erro
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.motivoAdiar}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleSalvarEdicao}
          className="mt-3"
          disabled={isLoading} // Desabilita o botão enquanto você está carregando
        >
          {isLoading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            "Salvar Alterações"
          )}
        </Button>
      </Form>

      <ToastContainer /> {/* ToastContainer para mostrar as notificações */}
    </div>
  );
}




function AdiarAgendamento() {

  const { id } = useParams();  // Pega o id do agendamento da URL
  const navigate = useNavigate();  // Hook para navegação
  const [agendamento, setAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados do agendamento, cliente e veículo
  const fetchData = async () => {
    try {
      // Primeiro busca o agendamento pelo ID
      const agendamentoResponse = await fetch(`http://localhost:5000/api/agendamentos/${id}`);
      if (!agendamentoResponse.ok) throw new Error("Erro ao buscar dados do agendamento");

      const agendamentoData = await agendamentoResponse.json();

      // Depois busca os dados do cliente e do veículo com base nos IDs
      const clienteResponse = await fetch(`http://localhost:5000/api/clientes/${agendamentoData.id_cliente}`);
      const veiculoResponse = await fetch(`http://localhost:5000/api/veiculos/${agendamentoData.id_veiculo}`);

      if (!clienteResponse.ok || !veiculoResponse.ok) {
        throw new Error("Erro ao buscar dados do cliente ou do veículo");
      }

      const clienteData = await clienteResponse.json();
      const veiculoData = await veiculoResponse.json();

      // Agora, combinamos os dados do agendamento, cliente e veículo
      setAgendamento({
        ...agendamentoData,
        nome_cliente: clienteData.nome,
        email_cliente: clienteData.email,
        telefone_cliente: clienteData.telefone,
        veiculo: {
          marca: veiculoData.marca,
          modelo: veiculoData.modelo,
          ano: veiculoData.ano,
          placa: veiculoData.placa || "Sem placa"
        }
      });

    } catch (err) {
      setError(err.message);
      toast.error("Erro ao carregar dados do agendamento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();  // Chama a função de fetch ao montar o componente
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      {/* TopPerfil mostrando as informações do cliente */}
      <TopPerfil
        nome={agendamento?.nome_cliente}
        email={agendamento?.email_cliente}
        telefone={agendamento?.telefone_cliente}
      />

      <Tabs
        defaultActiveKey="detalhes-agendamento"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="detalhes-agendamento" title="Detalhes do Agendamento">
          {agendamento ? (
            <div className="row mt-4 pt-2 outrosD">
              {/* Seção de Informações do Agendamento */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Detalhes do Agendamento</h6>
                <p><strong>Cliente:</strong> {agendamento.nome_cliente}</p>
                <p><strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString()}</p>
              </section>

              {/* Seção de Informações do Veículo */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Informações do Veículo</h6>
                <p><strong>Marca:</strong> {agendamento.veiculo?.marca || 'Não disponível'}</p>
                <p><strong>Modelo:</strong> {agendamento.veiculo?.modelo || 'Não disponível'}</p>
                <p><strong>Ano:</strong> {agendamento.veiculo?.ano || 'Não disponível'}</p>
                <p><strong>Placa:</strong> {agendamento.veiculo?.placa || 'Não disponível'}</p>
              </section>

              {/* Seção de Status */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Status do Agendamento</h6>
                <p><strong>Status:</strong> {agendamento.status === 1 ? "Confirmado" : "Cancelado"}</p>
                <p><strong>Observações:</strong> {agendamento.observacoes || 'Sem observações'}</p>
              </section>
              <section className="col-12">
                <p><strong>Descrição:</strong> {agendamento.descricao}</p>

              </section>
            </div>
          ) : (
            <p>Agendamento não encontrado.</p>
          )}
        </Tab>

        <Tab eventKey="editar" title="Adiar Agendamento">
          {/* Formulário de edição pode ser adicionado aqui */}
          <TabelaAgendamento />
        </Tab>
      </Tabs>
    </div>
  );
}

const AdiarAgendamentoPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin
              entrada="Adiar Agendamento"
              leftSeta={<FaArrowLeftLong />}
              leftR='/agendamentoList' // Redireciona de volta para a lista de agendamentos
            />

            <div className="vh-100 alturaPereita">
              <AdiarAgendamento />
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

export default AdiarAgendamentoPage;
