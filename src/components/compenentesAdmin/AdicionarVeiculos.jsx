import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlineTextFields } from 'react-icons/md';
import { IoCarSportOutline, IoCarSportSharp } from 'react-icons/io5';
import { TbNumber } from 'react-icons/tb';
import { FaPlateWheat } from 'react-icons/fa6';
import { BsPerson } from 'react-icons/bs';
import { GrStatusGood } from 'react-icons/gr';


export default function AdicionarVeiculo() {
  // Estado do formulário
  const navigate = useNavigate();  // Inicializando o hook useNavigate

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    id_cliente: '',  // Inicialmente sem cliente selecionado
    fotos: null,
    status_reparacao: 'pronto a começar',
    analise_diagnostica: '',
    motivo_visita: ''
  });

  // Estado de erro de validação
  const [errors, setErrors] = useState({});

  // Estado para armazenar os clientes da API
  const [clientes, setClientes] = useState([]);

  // Estado para armazenar o filtro de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Função de validação do formulário
  // Função de validação do formulário
  const validate = () => {
    let formErrors = {};

    // Validação da Marca
    if (!formData.marca) {
      formErrors.marca = "Marca é obrigatória";
    } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.marca)) {
      formErrors.marca = "A marca deve conter apenas letras, números e os caracteres / . -";
    }

    // Validação do Modelo
    if (!formData.modelo) {
      formErrors.modelo = "Modelo é obrigatório";
    } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.modelo)) {
      formErrors.modelo = "O modelo deve conter apenas letras, números e os caracteres / . -";
    }

    // Validação do Ano
    if (!formData.ano) {
      formErrors.ano = "Ano é obrigatório";
    } else if (!/^\d{4}$/.test(formData.ano) || formData.ano < 1900 || formData.ano > new Date().getFullYear()) {
      formErrors.ano = `Ano inválido. O ano deve estar entre 1900 e ${new Date().getFullYear()}`;
    }

    // Validação da Placa
    if (!formData.placa) {
      formErrors.placa = "Placa é obrigatória";
    } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.placa)) {
      formErrors.placa = "A Placa deve conter apenas letras, números e os caracteres / . -";
    }

    // Validação do ID do Cliente
    if (!formData.id_cliente) {
      formErrors.id_cliente = "Selecione um cliente";
    }

    // Validação das Fotos - se necessário, pode descomentar a validação
    // if (!formData.fotos) {
    //     formErrors.fotos = "Envie pelo menos uma foto";
    // }

    return formErrors;
  };

  // Carregar os clientes da API
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clientes');
        if (response.ok) {
          const data = await response.json();
          setClientes(data); // Armazena os clientes no estado
        } else {
          toast.error('Erro ao carregar clientes');
        }
      } catch (error) {
        toast.error('Erro ao carregar clientes');
      }
    };

    fetchClientes();
  }, []);

  // Envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // Prepara os dados para envio
      const dataToSend = {
        marca: formData.marca,
        modelo: formData.modelo,
        ano: formData.ano,
        placa: formData.placa,
        id_cliente: formData.id_cliente,  // Campo id_cliente
        fotos: formData.fotos,  // Campo fotos (null por padrão)
        status_reparacao: formData.status_reparacao,  // Campo status_reparacao
        analise_diagnostica: formData.analise_diagnostica,
        motivo_visita: formData.motivo_visita
      };

      try {
        // Envia os dados como JSON via fetch
        const response = await fetch('http://localhost:5000/api/veiculos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Envia como JSON
          },
          body: JSON.stringify(dataToSend), // Converte o objeto para JSON
        });

        if (!response.ok) {
          throw new Error('Erro ao cadastrar veículo');
        }

        const data = await response.json();
        toast.success('Veículo cadastrado com sucesso!');
        console.log('Veículo cadastrado:', data);



        setTimeout(() => {
          navigate('/veiculosList');  // Redireciona para a página de listagem de veículos
        }, 4000);  // Redireciona após 3 segundos


        // Limpa o formulário após o sucesso
        setFormData({
          marca: '',
          modelo: '',
          ano: '',
          placa: '',
          id_cliente: '',  // Reseta o valor para id_cliente
          fotos: null,  // Reseta o valor para fotos
          status_reparacao: '',  // Reseta o valor para status_reparacao
          analise_diagnostica: '',
          motivo_visita: ''

        });
      } catch (error) {
        toast.error(error.message || 'Erro ao cadastrar veículo. Tente novamente.');
      }
    } else {
      setErrors(formErrors);
    }
  };

  // Função para lidar com a mudança dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtra os clientes com base no termo de pesquisa
  const filteredClientes = clientes.filter((cliente) => {
    const search = searchTerm.toLowerCase();
    return (
      cliente.nome.toLowerCase().includes(search) ||
      cliente.email.toLowerCase().includes(search) ||
      cliente.telefone.includes(search)
    );
  });

  // Função para lidar com a seleção de um cliente
  const handleClienteSelect = (clienteId) => {
    setFormData({
      ...formData,
      id_cliente: clienteId,
    });
  };

  return (
    <div className="container-fluid">
      <h6 className="mt-5 fw-bold">CADASTRO DE VEICULOS</h6>
      <hr />

      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label className='fw-bold'>Marca</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><IoCarSportSharp fontSize={22} color="#0070fa" /></span>
       
              <Form.Control
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                isInvalid={!!errors.marca}
                placeholder="Digite a marca do veículo"
              />
              <Form.Control.Feedback type="invalid">{errors.marca}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label className='fw-bold'>Modelo</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><IoCarSportOutline fontSize={22} color="#0070fa" /></span>
       
              <Form.Control
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                isInvalid={!!errors.modelo}
                placeholder="Digite o modelo do veículo"
              />
              <Form.Control.Feedback type="invalid">{errors.modelo}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label className='fw-bold'>Ano</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><TbNumber fontSize={22} color="#0070fa" /></span>
       
              <Form.Control
                type="text"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                isInvalid={!!errors.ano}
                placeholder="Digite o ano do veículo"
              />
              <Form.Control.Feedback type="invalid">{errors.ano}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label className='fw-bold'>Placa</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><FaPlateWheat fontSize={22} color="#0070fa" /></span>
       
              <Form.Control
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                isInvalid={!!errors.placa}
                placeholder="Digite a placa do veículo"
              />
              <Form.Control.Feedback type="invalid">{errors.placa}</Form.Control.Feedback>
            </div>
            </Form.Group>
          </div>
          <div className="col-12 col-md-12 col-lg-12">
            <Form.Group>
              <Form.Label className='fw-bold'>Motivo da Visita</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><MdOutlineTextFields fontSize={22} color="#0070fa" /></span>
       
              <Form.Control
                as="textarea" // Alterado para textarea
                rows={3} // Define o número de linhas iniciais do textarea
                name="motivo_visita" // Atualize para o nome correto do campo
                value={formData.motivo_visita || ''} // Assegura que o estado inicial não seja undefined
                onChange={handleChange}
                isInvalid={!!errors.motivo_visita} // Validação específica para o campo
                placeholder="Descreva o motivo da visita"
              />
              <Form.Control.Feedback type="invalid">{errors.motivo_visita}</Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>
          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label className='fw-bold'>Selecione o Propretário</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><BsPerson fontSize={22} color="#0070fa" /></span>
       
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Pesquisar por nome, email ou telefone"
                isInvalid={!!errors.id_cliente} // Exibe erro se não selecionar um cliente
              />
              <Form.Control.Feedback type="invalid">
                {errors.id_cliente || 'Selecione um cliente'} {/* Mensagem de erro */}
              </Form.Control.Feedback>
              </div>
              <div className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {filteredClientes.length > 0 ? (
                  filteredClientes.map(cliente => (
                    <div
                      key={cliente.id_cliente}
                      className={`list-group-item list-group-item-action ${formData.id_cliente === cliente.id_cliente ? 'list-group-item-primary' : ''}`}
                      onClick={() => handleClienteSelect(cliente.id_cliente)}
                      style={{ cursor: 'pointer' }}
                    >
                      {cliente.nome} - {cliente.email} - {cliente.telefone}
                    </div>
                  ))
                ) : (
                  <div className="list-group-item">Nenhum cliente encontrado</div>
                )}
              </div>
              
            </Form.Group>
          </div>


          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label className='fw-bold'>Status de Reparação</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><GrStatusGood fontSize={22} color="#0070fa" /></span>
       
              <Form.Control
                as="select"
                name="status_reparacao"
                value={formData.status_reparacao}
                onChange={handleChange}
              >
                <option value="">Selecione o Status</option>
                <option value="pronto a começar">Pronto a Começar</option>
                <option value="em andamento">Em Andamento</option>
                <option value="concluído">Concluído</option>
              </Form.Control>
              </div>
            </Form.Group>
          </div>




        </div>
        <hr />
        <Button variant="primary" type="submit" className="my-5 d-block mx-auto">
          Cadastrar Veículo
        </Button>
      </Form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
