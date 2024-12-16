import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoDocumentTextSharp, IoPersonAdd } from "react-icons/io5";
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import { MdArrowDropDown, MdDateRange, MdDeleteForever, MdFileCopy, MdSpeed } from "react-icons/md";
import { FaCar, FaCarSide, FaDollarSign, FaHashtag, FaImages, FaKey, FaPalette, FaRegIdCard, FaTag } from "react-icons/fa";
import { GiGearStick} from "react-icons/gi";
import { PiEngineBold } from "react-icons/pi";
import { AiOutlineEdit,  AiOutlineFileText } from "react-icons/ai";
import { RiAddLargeFill } from "react-icons/ri";



export function FormularioVeiculo(){
  const [dadosFormulario, setDadosFormulario] = useState({
    veiculoPara: "0", // Serviço selecionado por padrão
    tipoVeiculo: "",
    numeroPlaca: "",
    marcaVeiculo: "",
    preco: "",
    cliente: "",
    tipoCombustivel: "",
    numeroEquipamento: "",
    nomeModelo: "",
    anoModelo: "",
    leituraOdometro: "",
    dataFabricacao: "",
    caixaVelocidade: "",
    numeroCaixa: "",
    numeroMotor: "",
    tamanhoMotor: "",
    numeroChave: "",
    motor: "",
    numeroChassi: "",
    imagens: [],
    descricao: [""], // Array para várias descrições
    cor: ""
  });


  const handleFileChange = (e) => {
    const arquivos = Array.from(e.target.files);
    setDadosFormulario({
      ...dadosFormulario,
      imagens: arquivos
    });
  };


  const [descricao, setDescricao] = useState([{ text: '' }]);
  const [cor, setCor] = useState([{ cor: '' }]);
  const [notas, setNotas] = useState([{ text: '', internal: false, shared: false, file: [] }]);

  const handleDescricaoChange = (index, value) => {
    const updatedDescricao = descricao.map((desc, i) => i === index ? { ...desc, text: value } : desc);
    setDescricao(updatedDescricao);
  };

  const handleAddDescricao = () => {
    setDescricao([...descricao, { text: '' }]);
  };

  const handleCorChange = (index, value) => {
    const updatedCor = cor.map((color, i) => i === index ? { ...color, cor: value } : color);
    setCor(updatedCor);
  };

  const handleAddCor = () => {
    setCor([...cor, { cor: '' }]);
  };

  const handleNotaChange = (index, field, value) => {
    const updatedNotas = notas.map((nota, i) => i === index ? { ...nota, [field]: value } : nota);
    setNotas(updatedNotas);
  };

  const handleAddNota = () => {
    setNotas([...notas, { text: '', internal: false, shared: false, file: [] }]);
  };




  const [showModal, setShowModal] = useState(false);
  const [tipoVeiculo, setTipoVeiculo] = useState("");
  const [novoTipo, setNovoTipo] = useState(""); // Estado para o novo tipo de veículo
  const [tiposVeiculos, setTiposVeiculos] = useState([
    { id: "1", nome: "Turismo" },
    { id: "2", nome: "SUV" },
    { id: "3", nome: "Jeep 4x4" },
    { id: "4", nome: "Carrinhas" },
  ]); // Lista de tipos de veículos (pode vir de uma API ou banco de dados)

  const handleChange = (e) => {
    setTipoVeiculo(e.target.value);
  };

  const handleNovoTipoChange = (e) => {
    setNovoTipo(e.target.value);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novoTipo) {
      // Adiciona um novo tipo de veículo
      setTiposVeiculos([
        ...tiposVeiculos,
        { id: (tiposVeiculos.length + 1).toString(), nome: novoTipo },
      ]);
      setNovoTipo(""); // Limpa o campo de novo tipo
    }
    handleCloseModal(); // Fecha a modal após a ação
  };

  const handleRemoveTipo = (id) => {
    setTiposVeiculos(tiposVeiculos.filter((tipo) => tipo.id !== id));
  };



  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">

      <div className="mt-5">
        <h6 className="text-uppercase">Informações Gerais</h6>
        <hr />
      </div>

      <Row>


        <Col lg={6}>
          <Form.Group controlId="tipoVeiculo">
            <Form.Label>Tipo de Veículo <span className="text-danger">*</span></Form.Label>

            <div className="d-flex">
              <div className="input-group">
                <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  as="select"
                  name="tipoVeiculo"
                  value={tipoVeiculo}
                  required
                  onChange={handleChange}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="1">Turismo</option>
                  <option value="2">SUV</option>
                  <option value="3">Jeep 4x4</option>
                  <option value="4">Carrinhas</option>
                </Form.Control>
              </div>
              <Button
                className="links-acessos px-2 border-radius-zero"
                onClick={handleShowModal}
              >
               <RiAddLargeFill />
              </Button>
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="numeroPlaca">
            <Form.Label>Número da placa <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaRegIdCard fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="numeroPlaca"
                placeholder="Inserir placa de número"
                value={dadosFormulario.numeroPlaca}
                onChange={handleChange}
                required
              />
            </div>

          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="marcaVeiculo">
            <Form.Label>Marca do veículo <span className="text-danger">*</span></Form.Label>
            <div className="d-flex justify-content-between">
              <div className="input-group">
                <span className="input-group-text"><FaTag fontSize={20} color="#0070fa" /></span>

                <Form.Control as="select" name="marcaVeiculo" required onChange={handleChange}>
                  <option value="">Selecione a marca</option>
                  <option value="4">FORD</option>
                  <option value="5">TOYOTA</option>
                  <option value="6">HYUNDAI</option>
                </Form.Control>
              </div>
              <Button
                className="links-acessos px-2 border-radius-zero"
                onClick={handleShowModal}
              >
               <RiAddLargeFill />
              </Button>
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="preco">
            <Form.Label>Preço ($) <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaDollarSign fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="preco"
                placeholder="Entre preço"
                value={dadosFormulario.preco}
                onChange={handleChange}
                required
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="nomeModelo">
            <Form.Label>Nome do Modelo <span className="text-danger">*</span></Form.Label>
            <div className="d-flex justify-content-between">
              <div className="input-group">
                <span className="input-group-text"><FaCarSide fontSize={20} color="#0070fa" /></span>

                <Form.Control as="select" name="nomeModelo" required onChange={handleChange}>
                  <option value="">Selecione o modelo</option>
                  <option value="9">Explorer</option>
                  <option value="11">Fiesta</option>
                  <option value="14">Edge</option>
                  <option value="36">EcoSport</option>
                  <option value="37">Hilux</option>
                </Form.Control>
              </div>
              <Button
                className="links-acessos px-2 border-radius-zero"
                onClick={handleShowModal}
              >
               <RiAddLargeFill />
              </Button>
            </div>
          </Form.Group>
        </Col>



        <Col lg={6}>
          <Form.Group controlId="cliente">
            <Form.Label>Selecione o Cliente <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><MdArrowDropDown fontSize={20} color="#0070fa" /></span>

              <Form.Control as="select" name="cliente" required onChange={handleChange}>
                <option value="">Selecione o Cliente</option>
                <option value="6">Abraão Odair Kanepa</option>
                <option value="7">Alex Ofoka</option>
                <option value="47">Waridu Lda</option>
                <option value="48">Wilson Jacinto F Morais</option>
              </Form.Control>
            </div>
          </Form.Group>
        </Col>

        
        <Col lg={6}>
          <Form.Group controlId="nomeModelo">
          <Form.Label>Tipo de combustível <span className="text-danger">*</span></Form.Label>
          <div className="d-flex justify-content-between">
              <div className="input-group">
                <span className="input-group-text"><MdArrowDropDown fontSize={20} color="#0070fa" /></span>

                <Form.Control as="select" name="nomeModelo" required onChange={handleChange}>
                <option value="">Selecione o combustível</option>
                  <option value="1">Diesel</option>
                  <option value="2">Gasolina</option>
                  <option value="3">Gasóleo</option>
                </Form.Control>
              </div>
              <Button
                className="links-acessos px-2 border-radius-zero"
                onClick={handleShowModal}
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


        <Col lg={6}>
          <Form.Group controlId="numeroEquipamento">
            <Form.Label>Número de equipamento</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><AiOutlineEdit fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="numeroEquipamento"
                placeholder="Insira o número do equipamento"
                value={dadosFormulario.numeroEquipamento}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>



        <Col lg={6}>
          <Form.Group controlId="anoModelo">
            <Form.Label>Ano do Modelo</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><MdDateRange  fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="anoModelo"
                placeholder="Insira o ano do modelo"
                value={dadosFormulario.anoModelo}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="leituraOdometro">
            <Form.Label>Leitura de odômetro</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><MdSpeed  fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="leituraOdometro"
                placeholder="Digite a leitura do odômetro"
                value={dadosFormulario.leituraOdometro}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="dataFabricacao">
            <Form.Label>Data de Fabricação</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><MdDateRange fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="date"
                name="dataFabricacao"
                placeholder="dd-mm-yyyy"
                value={dadosFormulario.dataFabricacao}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="caixaVelocidade">
            <Form.Label>Caixa de velocidade</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><GiGearStick fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="caixaVelocidade"
                placeholder="Digite a caixa de velocidades"
                value={dadosFormulario.caixaVelocidade}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="numeroCaixa">
            <Form.Label>Número da caixa de câmbio</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="numeroCaixa"
                placeholder="Digite o número da caixa de câmbio"
                value={dadosFormulario.numeroCaixa}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="numeroMotor">
            <Form.Label>Número do Motor</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="numeroMotor"
                placeholder="Digite o número do motor"
                value={dadosFormulario.numeroMotor}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="tamanhoMotor">
            <Form.Label>Tamanho do Motor</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="tamanhoMotor"
                placeholder="Digite o tamanho do motor"
                value={dadosFormulario.tamanhoMotor}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="numeroChave">
            <Form.Label>Número da Chave</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaKey fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="numeroChave"
                placeholder="Digite o número da chave"
                value={dadosFormulario.numeroChave}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="motor">
            <Form.Label>Motor</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><PiEngineBold fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="motor"
                placeholder="Digite o motor"
                value={dadosFormulario.motor}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="numeroChassi">
            <Form.Label>Número do Chassi</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="text"
                name="numeroChassi"
                placeholder="Digite o número do chassi"
                value={dadosFormulario.numeroChassi}
                onChange={handleChange}
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

        <Col lg={6}>
          <Form.Group controlId="imagens">
            <Form.Label>Imagens</Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaImages fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="file"
                name="imagens"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </Form.Group>
        </Col>

      


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

                <Button type="button" className="configurarBTN links-acessos" variant="outline-secondary" onClick={handleAddDescricao}>+</Button>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {descricao.map((desc, index) => (
                      <tr key={index}>
                        <td>
                          <div className="input-group">
                            <span className="input-group-text"><AiOutlineFileText fontSize={20} color="#0070fa" /></span>

                            <textarea
                              className="form-control"
                              value={desc.text}
                              onChange={(e) => handleDescricaoChange(index, e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <button type="button" onClick={() => {
                            const updatedDescricao = descricao.filter((_, i) => i !== index);
                            setDescricao(updatedDescricao);
                          }} className="d-block mx-auto mt-2 colorirBTN border-0 tranformBTN">
                            <MdDeleteForever fontSize={30} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cor do Veículo */}
            <div className="col-lg-6 col-md-12 col-12">

              <div className="d-flex justify-content-between">
                <h6 className="fw-700  mt-4">Cor do veículo</h6>

                <Button type="button" className="configurarBTN links-acessos" variant="outline-secondary" onClick={handleAddCor}>+</Button>

              </div>

              <div className="table-responsive mt-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Cores</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cor.map((color, index) => (
                      <tr key={index}>
                        <td>
                          <div className="input-group">
                            <span className="input-group-text"><FaPalette fontSize={20} color="#0070fa" /></span>

                            <select
                              className="form-control"
                              value={color.cor}
                              onChange={(e) => handleCorChange(index, e.target.value)}
                            >
                              <option value="">Selecione a cor</option>
                              <option value="preto">Preta</option>
                              <option value="branco">Branca</option>
                              <option value="azul">Azul</option>
                              {/* Adicione mais opções conforme necessário */}
                            </select>
                          </div>
                        </td>
                        <td>
                          <button type="button" onClick={() => {
                            const updatedDescricao = descricao.filter((_, i) => i !== index);
                            setDescricao(updatedDescricao);
                          }} className="d-block mx-auto mt-2 colorirBTN border-0 tranformBTN">
                            <MdDeleteForever fontSize={30} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </Row>


        </Col>
        <Col lg={12}>{/* Notas */}
          <div>

            <div className="d-flex justify-content-between">
              <h6 className="fw-700 text-uppercase mt-4">Adicionar notas</h6>

              <Button type="button" className="configurarBTN links-acessos" variant="outline-secondary" onClick={handleAddNota}>+</Button>

            </div>
            <hr />
            <div className="mt-3">
              <h6>Texto da Nota</h6>
              {notas.map((nota, index) => (
                <div key={index} className="row">
                  <Col lg={3}>
                    <div className="input-group">
                      <span className="input-group-text"><IoDocumentTextSharp fontSize={20} color="#0070fa" /></span>

                      <textarea
                        className="form-control"
                        value={nota.text}
                        onChange={(e) => handleNotaChange(index, 'text', e.target.value)}
                      />
                    </div>
                  </Col>
                  
                  <Col lg={3}>
                  <h6>Arquivo</h6>
                    <div className="input-group">
                    
                      <span className="input-group-text"><MdFileCopy fontSize={20} color="#0070fa" /></span>

                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleNotaChange(index, 'file', e.target.files)}
                        multiple
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <input
                      type="checkbox"
                      checked={nota.internal}
                      onChange={(e) => handleNotaChange(index, 'internal', e.target.checked)}
                    />
                    <label className="ms-2">Notas internas</label><br />
                    <input
                      type="checkbox"
                      checked={nota.shared}
                      onChange={(e) => handleNotaChange(index, 'shared', e.target.checked)}
                    />
                    <label className="ms-2">Compartilhado com o cliente</label>
                  </Col>
                  <Col lg={1} className="text-center">
                    <button type="button" onClick={() => {
                      const updatedDescricao = descricao.filter((_, i) => i !== index);
                      setDescricao(updatedDescricao);
                    }} className="d-block mx-auto mt-2 colorirBTN border-0 tranformBTN">
                      <MdDeleteForever fontSize={30} />
                    </button>
                  </Col>
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col lg={12} className="mt-3">
          <Button type="submit" className="mx-auto mt-3 d-block links-acessos w-25 px-5">Cadastrar</Button>
        </Col>
      </Row>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}  centered>
        <Modal.Header closeButton>
          <Modal.Title><h5>Adicionar ou Remover Tipo de Veículo</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Campo para adicionar um novo tipo */}
            <Form.Group controlId="novoTipo">

              <div className="d-flex justify-content-between">
                <Form.Control
                  type="text"
                  placeholder="Digite o novo tipo"
                  value={novoTipo}
                  onChange={handleNovoTipoChange}
                /> <Button
                  type="submit"
                  variant="primary"
                  className="ml-2 links-acessos border-radius-zero"
                >
                  Enviar
                </Button>
              </div>
            </Form.Group>

            {/* Lista de tipos de veículos existentes com botão para remover */}
            <Form.Group controlId="removerTipo">
              <Form.Label className="mt-2">Tipos de veículos existentes</Form.Label>
              <ul className="list-unstyled">
                {tiposVeiculos.map((tipo) => (
                  <li key={tipo.id} className="d-flex border p-2 my-2 justify-content-between align-items-center">
                    <span>{tipo.nome}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveTipo(tipo.id)}
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
    </Form >
  );
};




 






const AddClientes = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Veículos" icone={<IoPersonAdd />} leftSeta={<FaArrowLeftLong />} leftR="/clienteList" />

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
