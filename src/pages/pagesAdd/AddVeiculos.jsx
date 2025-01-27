import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import { MdArrowDropDown, MdDateRange, MdDeleteForever, MdPalette, MdSpeed } from "react-icons/md";
import { FaCar, FaCarSide, FaDollarSign, FaHashtag, FaKey, FaRegIdCard, FaUser } from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import { PiEngineBold } from "react-icons/pi";
import { AiOutlineEdit, AiOutlineFileText } from "react-icons/ai";
import { RiAddLargeFill } from "react-icons/ri";
import axios from "axios";

//import { useNavigate } from 'react-router-dom';


export function FormularioVeiculo() {


  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    tipo_veiculo: "",
    numero_placa: '',
    marca_veiculo: '',
    modelo_veiculo: '',
    preco: '',
    cliente_id: '',
    combustivel: '',
    numero_equipamento: '',
    ano_modelo: '',
    leitura_odometro: '',
    data_fabricacao: '',
    caixa_velocidade: '',
    numero_caixa: '',
    numero_motor: '',
    tamanho_motor: '',
    numero_chave: '',
    motor: '',
    numero_chassi: '',
    descricao: '',
    cor: ''
    //imagens: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar os dados via POST para a API
      const response = await axios.post('http://127.0.0.1:8000/api/veiculos/', formData);
      console.log('Veículo cadastrado:', response.data);
      alert('Veículo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
      alert('Erro ao cadastrar veículo.');
    }
  };




  const [showModal, setShowModal] = useState(false);

  // Função para abrir o modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);





  //const [tipoVeiculo] = useState("");
  const [novoTipo, setNovoTipo] = useState(""); // Estado para o novo tipo de veículo



  const handleNovoTipoChange = (e) => {
    setNovoTipo(e.target.value);
  };




  const handleRemoveTipo = (id) => {
    setTiposVeiculos(tiposVeiculos.filter((tipo) => tipo.id !== id));
  };

  /**Configuracoes Add Marca */
  const [showModalMarca, setShowModalMarca] = useState(false);
  const [novoMarca, setNovoMarca] = useState('');
  const [marcasVeiculos, setMarcasVeiculos] = useState([
    { id: 1, nome: 'FORD' },
    { id: 2, nome: 'TOYOTA' },
    { id: 3, nome: 'HYUNDAI' }
  ]);

  // Função para abrir a modal
  const handleShowModalMarca = () => setShowModalMarca(true);

  // Função para fechar a modal
  const handleCloseModalMarca = () => setShowModalMarca(false);

  // Função para lidar com a mudança do novo nome da marca
  const handleNovoMarcaChange = (event) => {
    setNovoMarca(event.target.value);
  };

  // Função para enviar o novo nome da marca
  const handleSubmitMarca = (event) => {
    event.preventDefault();
    // Lógica para adicionar a nova marca (adicionar ao array de marcas)
    setMarcasVeiculos([
      ...marcasVeiculos,
      { id: marcasVeiculos.length + 1, nome: novoMarca }
    ]);
    setNovoMarca(''); // Limpar campo de entrada
    handleCloseModal(); // Fechar a modal após adicionar a marca
  };

  // Função para remover uma marca
  const handleRemoveMarca = (id) => {
    setMarcasVeiculos(marcasVeiculos.filter((marca) => marca.id !== id));
  };


  /*Configuracoes do modelo*/

  // Estado para controlar a visibilidade da modal
  const [showModalModelo, setShowModalModelo] = useState(false);
  const [novoModelo, setNovoModelo] = useState('');
  const [modeloVeiculosModelo, setModeloVeiculos] = useState([
    { id: 9, nome: 'Explorer' },
    { id: 11, nome: 'Fiesta' },
    { id: 14, nome: 'Edge' },
    { id: 36, nome: 'EcoSport' },
    { id: 37, nome: 'Hilux' }
  ]);

  // Função para abrir a modal
  const handleShowModalModelo = () => setShowModalModelo(true);

  // Função para fechar a modal
  const handleCloseModalModelo = () => setShowModalModelo(false);

  // Função para lidar com a mudança do novo nome do modelo
  const handleNovoModeloChange = (event) => {
    setNovoModelo(event.target.value);
  };

  // Função para enviar o novo nome do modelo
  const handleSubmitModelo = (event) => {
    event.preventDefault();
    // Lógica para adicionar o novo modelo (adicionar ao array de modelos)
    setModeloVeiculos([
      ...modeloVeiculosModelo,
      { id: modeloVeiculosModelo.length + 1, nome: novoModelo }
    ]);
    setNovoModelo(''); // Limpar campo de entrada
    handleCloseModal(); // Fechar a modal após adicionar o modelo
  };

  // Função para remover um modelo
  const handleRemoveModelo = (id) => {
    setModeloVeiculos(modeloVeiculosModelo.filter((modelo) => modelo.id !== id));
  };


  const [showModalCombustivel, setShowModalCombustivel] = useState(false);
  const [novoCombustivel, setNovoCombustivel] = useState('');
  const [combustivelVeiculosCombustivel, setCombustivelVeiculosCombustivel] = useState([]);

  // Função para abrir a modal
  const handleShowModalCombustivel = () => setShowModalCombustivel(true);

  // Função para fechar a modal
  const handleCloseModalCombustivel = () => {
    setShowModalCombustivel(false);
    setNovoCombustivel(''); // Limpa o campo ao fechar
  };

  // Função para lidar com mudanças no campo de novo combustível
  const handleNovoCombustivelChange = (e) => {
    setNovoCombustivel(e.target.value);
  };

  // Função para adicionar um novo combustível
  const handleSubmitCombustivel = (e) => {
    e.preventDefault();
    if (novoCombustivel.trim() === '') {
      alert('Por favor, insira um nome válido para o combustível.');
      return;
    }
    // Adiciona novo combustível à lista
    setCombustivelVeiculosCombustivel([...combustivelVeiculosCombustivel, { id: Date.now(), nome: novoCombustivel }]);
    setNovoCombustivel(''); // Limpa o campo após adicionar
  };

  // Função para remover um combustível existente
  const handleRemoveCombustivel = (id) => {
    setCombustivelVeiculosCombustivel(combustivelVeiculosCombustivel.filter(combustivel => combustivel.id !== id));
  };




  /**=======================|ESPACO PARA LISTAGEM VINDO DOS INPUT|=========================== */
  /**Tipos de veiculos */
  const [tiposVeiculos, setTiposVeiculos] = useState([]);

  useEffect(() => {
    // Fazendo a requisição para a API
    fetch("http://127.0.0.1:8000/api/tipos-veiculos")
      .then((response) => response.json())
      .then((data) => {
        setTiposVeiculos(data); // Atualiza o estado com os dados da API
      })
      .catch((error) => console.error("Erro ao carregar os tipos de veículos:", error));
  }, []);


  /**Listar  Marca de veiculos */
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    // Fazendo a requisição para a API
    fetch("http://127.0.0.1:8000/api/marcas")
      .then((response) => response.json())
      .then((data) => {
        setMarcas(data); // Atualiza o estado com as marcas retornadas
      })
      .catch((error) => console.error("Erro ao carregar as marcas:", error));
  }, []);






  /**Listar Modelos */
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    // Fazendo a requisição para a API
    fetch("http://127.0.0.1:8000/api/modelos-veiculos/")
      .then((response) => response.json())
      .then((data) => {
        setModelos(data); // Atualiza o estado com os modelos retornados
      })
      .catch((error) => console.error("Erro ao carregar os modelos:", error));
  }, []);





  /**LISTAr Clientes */
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [formDataCLI, setFormDataClI] = useState({
    clienteNome: '',
    id_cliente: null,
    data: ''
  });

  // Função para selecionar um cliente da lista
  const handleClienteSelect = (cliente) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16);
    setFormDataClI(prevState => ({
      ...prevState,
      clienteNome: `${cliente.primeiro_nome} ${cliente.sobrenome}`, // Preenche o campo de pesquisa com o nome do cliente
      id_cliente: cliente.id,
      data: formattedDate
    }));

    // Não é necessário fazer nova requisição aqui, pois os clientes já foram carregados
  };

  // Função para pesquisa de cliente
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Se o campo for apagado, resetamos a lista de clientes
    if (searchTerm === "") {
      setFilteredClientes(clientes);
    } else {
      const filtered = clientes.filter(cliente => {
        const clienteInfo = `${cliente.primeiro_nome} ${cliente.sobrenome} ${cliente.celular}`;
        return clienteInfo.toLowerCase().includes(searchTerm);
      });
      setFilteredClientes(filtered);
    }

    // Atualiza o nome do cliente no estado
    setFormDataClI({
      ...formData,
      clienteNome: e.target.value
    });
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16);
    setFormDataClI(prevState => ({
      ...prevState,
      data: formattedDate
    }));

    // Fazendo a requisição para a API
    fetch('http://127.0.0.1:8000/api/clientes')
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
        setFilteredClientes(data); // Exibe todos os clientes inicialmente
      }).catch((error) => console.error("Erro ao carregar os clientes:", error));
  }, []);



  return (
    <>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="mt-5">
          <h6 className="text-uppercase">Informações Gerais</h6>
          <hr />
        </div>

        <Row>

        <Col md={6} lg={6}>
            <Form.Group controlId="tipoVeiculo">
              <Form.Label>Tipo de Veículo <span className="text-danger">*</span></Form.Label>
              <div className="d-flex">
                <div className="input-group">
                  <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>
                  <Form.Control
                    as="select"
                    name="tipo_veiculo"
                    value={formData.tipo_veiculo || ""}
                    required
                    onChange={handleChange}
                  >
                    <option value="">Selecione o tipo</option>
                    {tiposVeiculos.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.tipo}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <Button
                  className="links-acessos px-2 border-radius-zero"
                  onClick={handleShowModal} // Uso correto da função
                >
                  <RiAddLargeFill />
                </Button>
              </div>
            </Form.Group>
          </Col>



          <Col md={6} lg={6}>
            <Form.Group controlId="numeroPlaca">
              <Form.Label>Número da placa <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaRegIdCard fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="numero_placa"
                  value={formData.numero_placa}
                  onChange={handleChange}
                  required
                  placeholder="Inserir placa de número"
                />
              </div>

            </Form.Group>
          </Col>
          <Col md={6} lg={6}>
            <Form.Group controlId="marcaVeiculo">
              <Form.Label>Marca do veículo <span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-between">
                <div className="input-group">
                  <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>

                  <Form.Control
                    as="select" // Definido como select
                    name="marca_veiculo" // Nome do campo
                    value={formData.marca_veiculo} // Vinculado ao estado
                    onChange={handleChange} // Função de mudança para atualização do estado
                    required // Campo obrigatório
                  >
                    <option value="">Selecione a marca do veículo</option>
                    {/* Mapeando as marcas da API */}
                    {marcas.map((marca) => (
                      <option key={marca.id} value={marca.id}>
                        {marca.nome} {/* Exibindo o nome da marca */}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <Button
                  className="links-acessos px-2 border-radius-zero"
                  onClick={handleShowModalMarca}
                >
                  <RiAddLargeFill />
                </Button>
              </div>
            </Form.Group>
          </Col>




          <Col md={6} lg={6}>
            <Form.Group controlId="preco">
              <Form.Label>Preço (KZ) <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaDollarSign fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="preco"
                  placeholder="Entre preço"
                  value={formData.preco}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="nomeModelo">
              <Form.Label>Nome do Modelo <span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-between">
                <div className="input-group">
                  <span className="input-group-text"><FaCarSide fontSize={20} color="#0070fa" /></span>

                  <Form.Control
                    as="select"
                    name="modelo_veiculo"
                    value={formData.modelo_veiculo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione o modelo</option>
                    {/* Mapeando os modelos da API */}
                    {modelos.map((modelo) => (
                      <option key={modelo.id} value={modelo.id}>
                        {modelo.nome} {/* Exibindo o nome do modelo */}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <Button
                  className="links-acessos px-2 border-radius-zero"
                  onClick={handleShowModalModelo}
                >
                  <RiAddLargeFill />
                </Button>
              </div>
            </Form.Group>
          </Col>


          <Col md={6}>
            <Form.Label>Cliente <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaUser fontSize={22} color="#0070fa" /></span>
              <Form.Control
                type="text"
                name="clienteSearch"
                placeholder="Pesquisar Cliente"
                value={formDataCLI.clienteNome} // Exibe o nome do cliente selecionado
                onChange={handleSearch} // Permite a pesquisa
              />
            </div>

            {/* Exibição da lista de resultados */}
            {filteredClientes.length > 0 ? (
              <div className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {filteredClientes.map(cliente => (
                  <div
                    key={cliente.id}
                    className={`list-group-item text-justify list-group-item-action ${formDataCLI.id_cliente === cliente.id ? 'list-group-item-primary' : ''}`}
                    onClick={() => handleClienteSelect(cliente)}
                    style={{ cursor: 'pointer' }}
                  >
                    {`${cliente.primeiro_nome} ${cliente.sobrenome} - ${cliente.celular}`}
                  </div>
                ))}
              </div>
            ) : (
              <div className="s">Nenhum cliente encontrado</div>
            )}
          </Col>




          <Col md={6} lg={6}>
            <Form.Group controlId="nomeCombustivel">
              <Form.Label>Tipo de combustível <span className="text-danger">*</span></Form.Label>
              <div className="d-flex justify-content-between">
                <div className="input-group">
                  <span className="input-group-text"><MdArrowDropDown fontSize={20} color="#0070fa" /></span>

                  <Form.Control
                    as="select"
                    name="combustivel"
                    value={formData.combustivel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione o combustível</option>
                    <option value="1">Diesel</option>
                    <option value="2">Gasolina</option>
                    <option value="3">Gasóleo</option>
                  </Form.Control>
                </div>
                <Button
                  className="links-acessos px-2 border-radius-zero"
                  onClick={handleShowModalCombustivel}
                >
                  <RiAddLargeFill />
                </Button>
              </div>
            </Form.Group>
          </Col>


          <Col lg={12}>
            <div className="mt-4">
              <h6 className="text-uppercase">Detalhes do Veículo</h6>
              <hr />
            </div>
          </Col>


          <Col md={6} lg={6}>
            <Form.Group controlId="numeroEquipamento">
              <Form.Label>Número de equipamento</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><AiOutlineEdit fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="numero_equipamento"
                  value={formData.numero_equipamento}
                  onChange={handleChange}
                  placeholder="Insira o número do equipamento"
                />
              </div>
            </Form.Group>
          </Col>



          <Col md={6} lg={6}>
            <Form.Group controlId="anoModelo">
              <Form.Label>Ano do Modelo</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdDateRange fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="ano_modelo"
                  value={formData.ano_modelo}
                  onChange={handleChange}
                  placeholder="Insira o ano do modelo"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="leituraOdometro">
              <Form.Label>Leitura de odômetro</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdSpeed fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="leitura_odometro"
                  value={formData.leitura_odometro}
                  onChange={handleChange}
                  placeholder="Digite a leitura do odômetro"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="dataFabricacao">
              <Form.Label>Data de Fabricação</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdDateRange fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="date"
                  name="data_fabricacao"
                  value={formData.data_fabricacao}
                  onChange={handleChange}
                  placeholder="dd-mm-yyyy"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="caixaVelocidade">
              <Form.Label>Caixa de velocidade</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><GiGearStick fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="caixa_velocidade"
                  value={formData.caixa_velocidade}
                  onChange={handleChange}
                  placeholder="Digite a caixa de velocidades"

                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="numeroCaixa">
              <Form.Label>Número da caixa de câmbio</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="numero_caixa"
                  value={formData.numero_caixa}
                  onChange={handleChange}
                  placeholder="Digite o número da caixa de câmbio"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="numeroMotor">
              <Form.Label>Número do Motor</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="numero_motor"
                  value={formData.numero_motor}
                  onChange={handleChange}
                  placeholder="Digite o número do motor"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="tamanhoMotor">
              <Form.Label>Tamanho do Motor</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="tamanho_motor"
                  value={formData.tamanho_motor}
                  onChange={handleChange}
                  placeholder="Digite o tamanho do motor"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="numeroChave">
              <Form.Label>Número da Chave</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaKey fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="numero_chave"
                  value={formData.numero_chave}
                  onChange={handleChange}
                  placeholder="Digite o número da chave"

                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="motor">
              <Form.Label>Motor</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><PiEngineBold fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="motor"
                  value={formData.motor}
                  onChange={handleChange}
                  placeholder="Digite o motor"

                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6} lg={6}>
            <Form.Group controlId="numeroChassi">
              <Form.Label>Número do Chassi</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="numero_chassi"
                  value={formData.numero_chassi}
                  onChange={handleChange}
                  placeholder="Digite o número do chassi"

                />
              </div>
            </Form.Group>
          </Col>
          <Col lg={12}>
            <div className="mt-4">
              <h6 className="text-uppercase">Imagens</h6>
              <hr />
            </div>
          </Col>

          {/**  <Col md={6} lg={6}>
            <Form.Group controlId="imagens">
              <Form.Label>Imagens</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><FaImages fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="file"
                  name="imagens"
                  multiple
                  onChange={handleFileChange}
                  disabled
                />
              </div>
            </Form.Group>
          </Col>*/}




        </Row>
        <Row>
          <Col lg={12}>
            <div className="mt-4">
              <h6 className="text-uppercase">Descrição e Notas</h6>
              <hr />
            </div>
          </Col>
          <Col lg={12}>
            {/* Descrição do Veículo */}
            <Row>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="d-flex justify-content-between">
                  <h6 className="fw-700  mt-4">Descrição do veículo</h6>
                  {/*                <Button type="button" className="configurarBTN links-acessos" variant="outline-secondary" onClick={handleAddDescricao}>+</Button>
*/}
                </div>
                <div className="table-responsive mt-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Descrição</th>

                      </tr>
                    </thead>
                    <tbody>

                      <tr >
                        <td>
                          <div className="input-group">
                            <span className="input-group-text"><AiOutlineFileText fontSize={20} color="#0070fa" /></span>

                            <textarea
                              className="form-control"// Array para várias descrições

                              name="descricao"
                              value={formData.descricao}
                              onChange={handleChange}
                            />
                          </div>
                        </td>

                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cor do Veículo */}
              <div className="col-lg-6 col-md-12 col-12">

                <div className="d-flex justify-content-between">
                  <h6 className="fw-700  mt-4">Cor do veículo</h6>

                  {/*                <Button type="button" className="configurarBTN links-acessos" variant="outline-secondary" onClick={handleAddCor}>+</Button>
*/}
                </div>

                <div className="table-responsive mt-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Cores</th>

                      </tr>
                    </thead>
                    <tbody>

                      <tr >
                        <td>
                          <Form.Group controlId="cor">
                            <Form.Label>Cor <span className="text-danger">*</span></Form.Label>
                            <div className="input-group">
                              <span className="input-group-text"><MdPalette fontSize={20} color="#0070fa" /></span>
                              <Form.Control
                                type="text"
                                name="cor"
                                value={formData.cor}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </Form.Group>
                        </td>


                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

            </Row>


          </Col>
         

          <Col lg={12} className="mt-3">
            <Button type="submit" className="mx-auto mt-3 d-block links-acessos w-25 px-5">Cadastrar</Button>
          </Col>
        </Row>

      </Form >

      <div className="modalis">
        {/* Modal */}
        {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title><h5>Adicionar ou Remover Tipo de Veículo</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="novoTipo">
              <div className="d-flex justify-content-between">
                <Form.Control
                  type="text"
                  placeholder="Digite o novo tipo"
                  value={novoTipo}
                  onChange={handleNovoTipoChange}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="ml-2 links-acessos border-radius-zero"
                >
                  Enviar
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
        {/* Modal para adicionar ou remover marcas */}
        <Modal show={showModalMarca} onHide={handleCloseModalMarca} centered>
          <Modal.Header closeButton>
            <Modal.Title><h5>Adicionar ou Remover marca de Veículo</h5></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitMarca}>
              {/* Campo para adicionar um novo marca */}
              <Form.Group controlId="novoMarca">
                <div className="d-flex justify-content-between">
                  <Form.Control
                    type="text"
                    placeholder="Digite o nova marca"
                    value={novoMarca}
                    onChange={handleNovoMarcaChange}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="ml-2 links-acessos border-radius-zero"
                  >
                    Enviar
                  </Button>
                </div>
              </Form.Group>

              {/* Lista de marcas de veículos existentes com botão para remover */}
              <Form.Group controlId="removerMarcas">
                <Form.Label className="mt-2">Marcas de veículos existentes</Form.Label>
                <ul className="list-unstyled">
                  {marcasVeiculos.map((Marca) => (
                    <li key={Marca.id} className="d-flex border p-2 my-2 justify-content-between align-items-center">
                      <span>{Marca.nome}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveMarca(Marca.id)}
                        className="border-radius-zero"
                      >
                        <MdDeleteForever fontSize={22} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </Form.Group>

              <hr />
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal para adicionar ou remover modelos */}
        <Modal show={showModalModelo} onHide={handleCloseModalModelo} centered>
          <Modal.Header closeButton>
            <Modal.Title><h5>Adicionar ou Remover Modelo de Veículo</h5></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitModelo}>
              {/* Campo para adicionar um novo modelo */}
              <Form.Group controlId="novoModelo">
                <div className="d-flex justify-content-between">
                  <Form.Control
                    type="text"
                    placeholder="Digite o novo Modelo"
                    value={novoModelo}
                    onChange={handleNovoModeloChange}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="ml-2 links-acessos border-radius-zero"
                  >
                    Enviar
                  </Button>
                </div>
              </Form.Group>

              {/* Lista de modelos de veículos existentes com botão para remover */}
              <Form.Group controlId="removerModelo">
                <Form.Label className="mt-2">Modelos de veículos existentes</Form.Label>
                <ul className="list-unstyled">
                  {modeloVeiculosModelo.map((modelo) => (
                    <li key={modelo.id} className="d-flex border p-2 my-2 justify-content-between align-items-center">
                      <span>{modelo.nome}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveModelo(modelo.id)}
                        className="border-radius-zero"
                      >
                        <MdDeleteForever fontSize={22} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </Form.Group>

              <hr />
            </Form>
          </Modal.Body>
        </Modal>



        {/* Modal para adicionar ou remover Combustível */}
        <Modal show={showModalCombustivel} onHide={handleCloseModalCombustivel} centered>
          <Modal.Header closeButton>
            <Modal.Title><h5>Adicionar ou Remover Combustível de Veículo</h5></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitCombustivel}>
              {/* Campo para adicionar um novo Combustível */}
              <Form.Group controlId="novoCombustivel">
                <div className="d-flex justify-content-between">
                  <Form.Control
                    type="text"
                    placeholder="Digite o novo Combustível"
                    value={novoCombustivel}
                    onChange={handleNovoCombustivelChange}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="ml-2 links-acessos border-radius-zero"
                  >
                    Enviar
                  </Button>
                </div>
              </Form.Group>

              {/* Lista de Combustíveis de veículos existentes com botão para remover */}
              <Form.Group controlId="removerCombustivel">
                <Form.Label className="mt-2">Combustíveis de veículos existentes</Form.Label>
                <ul className="list-unstyled">
                  {combustivelVeiculosCombustivel.map((combustivel) => (
                    <li key={combustivel.id} className="d-flex border p-2 my-2 justify-content-between align-items-center">
                      <span>{combustivel.nome}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveCombustivel(combustivel.id)}
                        className="border-radius-zero"
                      >
                        <MdDeleteForever fontSize={22} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </Form.Group>

              <hr />
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
















const AddClientes = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="  Adicionar Veículos" icone={<IoPersonAdd />} leftSeta={<FaArrowLeftLong />} leftR="/veiculosPageItens" />

            <div className="vh-100 alturaPereita">
              <FormularioVeiculo />

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

export default AddClientes;
