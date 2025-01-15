import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaCar, FaClipboardList, FaUser } from "react-icons/fa";
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";

const FormularioAgendamento = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [formData, setFormData] = useState({
    data: '',
    id_cliente: '',
    id_veiculo: '',
    id_servico: '',
    status: 'agendado',
    descricao: ''
  });

  // Função de mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para pesquisa de cliente
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filtered = clientes.filter(cliente => {
      const clienteInfo = `${cliente.primeiro_nome} ${cliente.sobrenome} ${cliente.celular}`;
      return clienteInfo.toLowerCase().includes(searchTerm);
    });

    setFilteredClientes(filtered);

    // Atualiza o nome do cliente no estado
    setFormData({
      ...formData,
      clienteNome: e.target.value
    });
  };

   // Função para selecionar um cliente da lista
 // Função para selecionar um cliente da lista
  // Função para selecionar um cliente da lista
  const handleClienteSelect = (cliente) => {
    setFormData({
      ...formData,
      id_cliente: cliente.id,
      clienteNome: `${cliente.primeiro_nome} ${cliente.sobrenome}`, // Atualiza o nome do cliente no estado
    });
    setFilteredClientes([]); // Limpar a lista de resultados ao selecionar um cliente
  };




  // Função de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    fetch('http://127.0.0.1:8000/api/agendamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao criar o agendamento');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Agendamento criado:', data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16);
    setFormData(prevState => ({
      ...prevState,
      data: formattedDate
    }));

    fetch('http://127.0.0.1:8000/api/clientes')
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
        setFilteredClientes(data); // Exibe todos os clientes inicialmente
        setLoading(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setError('Erro ao carregar clientes');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <h4>Carregando...</h4>
        <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-danger">{error}</h3>
        <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
      </div>
    );
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <div className="col-md-12 mt-5">
        <h6>DETALHES DE AGENDAMENTO</h6>
        <hr />
      </div>

      <Row className="mt-3">
      <Col md={6}>
          <Form.Label>Cliente <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaUser fontSize={22} color="#0070fa" /></span>
            <Form.Control
              type="text"
              name="clienteSearch"
              placeholder="Pesquisar Cliente"
              value={formData.clienteNome} // Exibe o nome do cliente selecionado
              onChange={handleSearch} // Permite a pesquisa
            />
          </div>

          {/* Exibição da lista de resultados */}
          {filteredClientes.length > 0 ? (
            <div className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filteredClientes.map(cliente => (
                <div
                  key={cliente.id}
                  className={`list-group-item list-group-item-action ${formData.id_cliente === cliente.id ? 'list-group-item-primary' : ''}`}
                  onClick={() => handleClienteSelect(cliente)}
                  style={{ cursor: 'pointer' }}
                >
                  {`${cliente.primeiro_nome} ${cliente.sobrenome} - ${cliente.celular}`}
                </div>
              ))}
            </div>
          ) : (
            <div className="list-group-item">Nenhum cliente encontrado</div>
          )}
        </Col>
        <Col md={6}>
          <Form.Label>Veículo <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaCar fontSize={22} color="#0070fa" /></span>
            <Form.Control
              as="select"
              name="id_veiculo"
              value={formData.id_veiculo}
              onChange={handleChange}
              required
            >
              <option value="">Selecionar Veículo</option>
              <option value="12">Veículo 12</option>
              <option value="13">Veículo 13</option>
            </Form.Control>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Label>Serviço <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaClipboardList fontSize={22} color="#0070fa" /></span>
            <Form.Control
              as="select"
              name="id_servico"
              value={formData.id_servico}
              onChange={handleChange}
              required
            >
              <option value="">Selecionar Serviço</option>
              <option value="5">Serviço 5</option>
              <option value="6">Serviço 6</option>
            </Form.Control>
          </div>
        </Col>

        <Col md={6}>
          <Form.Label>Data e Hora <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaCalendarAlt fontSize={22} color="#0070fa" /></span>
            <Form.Control
              type="datetime-local"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={12}>
          <Form.Label>Descrição</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaClipboardList fontSize={22} color="#0070fa" /></span>
            <Form.Control
              as="textarea"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva o motivo do agendamento"
              rows={4}
            />
          </div>
        </Col>
      </Row>

      <div className="mt-3 text-center">
        <Button type="submit" variant="success" className="px-5 mt-2 taxratesSubmitButton bordarNONE mt-5 border-radius-zero mx-auto links-acessos d-block w-25">
          Agendar
        </Button>
      </div>

      <input type="hidden" name="_token" value="3SdpCZa7Aj50aKHh555Fyl67CfET8SQ996mEr2dl" />
    </Form>
  );
};

export default function AddAgendamento() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin entrada="  Marcar Agendamento" leftSeta={<FaArrowLeftLong />} leftR="/AgendamentosPage" />

            <div className="vh-100 alturaPereita">
              <FormularioAgendamento />
            </div>

            <div className="div text-center np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">
                Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
                <br />
                Desenvolvido por: <b>Oseias Dias</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
