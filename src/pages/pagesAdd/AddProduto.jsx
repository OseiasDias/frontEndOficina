import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd, IoMdAddCircle } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import { MdAttachMoney, MdBusiness, MdCategory, MdDateRange, MdDeleteForever, MdImage, MdNote, MdOutlineFileCopy, MdPalette, MdSecurity, MdStore, MdStraighten, MdTextFields } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";

function FormularioProduto() {
  const [showCorModal, setShowCorModal] = useState(false); // Modal para cores
  const [showUnidadeModal, setShowUnidadeModal] = useState(false); // Modal para unidades
  //const [unidadeMedida, setUnidadeMedida] = useState(""); // Estado para o select
  const [unidades, setUnidades] = useState([
    { id: 1, nome: 'Dúzia' },
    { id: 2, nome: 'Litro' },
  ]); // Unidades de medida

  const [novaCor, setNovaCor] = useState({ nome: '', hex: '' });

  const [cores, setCores] = useState([
    { nome: 'Preto', hex: '#080808' },
    { nome: 'Branco', hex: '#faf9f9' },
    { nome: 'Cinza', hex: '#808080' },
    { nome: 'Prata', hex: '#c0c0c0' },
    { nome: 'Vermelho', hex: '#f70202' },
    { nome: 'Azul', hex: '#0f0ff0' },
    { nome: 'Verde', hex: '#156f38' },
    { nome: 'Bege', hex: '#f5f5dc' },
    { nome: 'Amarelo', hex: '#ffff00' },
    { nome: 'Marrom', hex: '#6f4f37' },
  ]);

  const handleShowCorModal = () => setShowCorModal(true);
  const handleCloseCorModal = () => setShowCorModal(false);

  const handleShowUnidadeModal = () => setShowUnidadeModal(true);
  const handleCloseUnidadeModal = () => setShowUnidadeModal(false);

  const handleAddCor = () => {
    if (novaCor.nome && novaCor.hex) {
      setCores([...cores, novaCor]);
      setNovaCor({ nome: '', hex: '' }); // Limpar os campos após adicionar
      handleCloseCorModal();
    }
  };

  const handleRemoveCor = (corHex) => {
    setCores(cores.filter(cor => cor.hex !== corHex));
  };

  const handleAddUnidade = () => {
    if (novaUnidade) {
      setUnidades([...unidades, { id: unidades.length + 1, nome: novaUnidade }]);
      setNovaUnidade(""); // Limpar o campo de entrada
      handleCloseUnidadeModal(); // Fechar a modal após adicionar
    }
  };

  const handleRemoveUnidade = (id) => {
    setUnidades(unidades.filter((unidade) => unidade.id !== id));
  };

  const [novaUnidade, setNovaUnidade] = useState(""); // Estado para adicionar nova unidade
  const [produto, setProduto] = useState({
    numeroProduto: 'PR286549',
    dataCompra: '2024-11-22',
    nome: '',
    galho: '1',
    fabricante: '',
    preco: '',
    unidadeMedida: '',
    fornecedor: '',
    cor: '',
    garantia: '',
    imagem: null,
    notas: [
      {
        textoNota: '',
        arquivosNota: [],
        interna: false,
        compartilhada: false,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduto({ ...produto, imagem: e.target.files[0] });
  };

  const handleNotaChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newNotas = [...produto.notas];
    newNotas[index][name] = type === 'checkbox' ? checked : value;
    setProduto({ ...produto, notas: newNotas });
  };

  const handleFileChange = (index, e) => {
    const newNotas = [...produto.notas];
    newNotas[index].arquivosNota = e.target.files;
    setProduto({ ...produto, notas: newNotas });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(produto);
  };

  const handleAddNota = () => {
    // Adiciona uma nova nota vazia
    setProduto({
      ...produto,
      notas: [
        ...produto.notas,
        {
          textoNota: '',
          arquivosNota: [],
          interna: false,
          compartilhada: false,
        },
      ],
    });
  };

  const handleRemoveNota = (index) => {
    // Remove a nota no índice especificado
    const newNotas = produto.notas.filter((_, i) => i !== index);
    setProduto({ ...produto, notas: newNotas });
  };


  return (
    <>

      <Form id="produtoForm" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="col-md-12 mt-5">
          <h6>INFORMAÇÕES DO PRODUTO</h6>
          <hr />
        </div>
        <Row>
          {/* Número do Produto */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="numeroProduto">
              <Form.Label className="fortificarLetter">Número de Produto <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><AiOutlineFieldNumber  fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="numeroProduto"
                  value={produto.numeroProduto}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </Form.Group>
          </Col>

          {/* Data de Compra */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="dataCompra">
              <Form.Label className="fortificarLetter">Data de Compra <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdDateRange fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="date"
                  name="dataCompra"
                  value={produto.dataCompra}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Nome */}
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="nome">
              <Form.Label className="fortificarLetter">Nome do produto<span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdTextFields fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="nome"
                  value={produto.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome do produto"
                  maxLength="30"
                  required
                />
              </div>
            </Form.Group>
          </Col>

          {/* Galho */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="galho">
              <Form.Label className="fortificarLetter">Galho <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdCategory fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  as="select"
                  name="galho"
                  value={produto.galho}
                  onChange={handleChange}
                >


                  <option value="1">Galho Principal</option>
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Fabricante */}
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="fabricante">
              <Form.Label className="fortificarLetter">Nome do Fabricante <span className="text-danger">*</span></Form.Label>
              <div className="d-flex">
                <div className="input-group">
                  <span className="input-group-text"><MdBusiness fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    as="select"
                    name="fabricante"
                    value={produto.fabricante}
                    onChange={handleChange}
                    className="mr-2"
                  >
                    <option value="">--Selecione o nome da fabricação--</option>
                    <option value="1">Filips</option>
                    <option value="2">Alemanha</option>
                  </Form.Control>
                  <button onClick={handleShowUnidadeModal} className="btn btn-primary ms-3 links-acessos">Adicionar/remover</button>
                </div>
              </div>
            </Form.Group>

          </Col>

          {/* Preço */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="preco">
              <Form.Label className="fortificarLetter">Preço ($) <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdAttachMoney fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="preco"
                  value={produto.preco}
                  onChange={handleChange}
                  placeholder="Digite o preço do produto"
                  maxLength="10"
                  required
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Unidade de Medida */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="unidadeMedida">
              <Form.Label className="fortificarLetter">Unidade de Medida <span className="text-danger">*</span></Form.Label>
              <div className="d-flex">
                <div className="input-group">
                  <span className="input-group-text"><MdStraighten fontSize={22} color="#0070fa" /></span>
                  <Form.Control
                    as="select"
                    name="unidadeMedida"
                    value={produto.unidadeMedida}
                    onChange={handleChange}
                  >
                    <option value="">- Selecionar Unidade -</option>
                    {unidades.map((unidade) => (
                      <option key={unidade.id} value={unidade.nome}>{unidade.nome}</option>
                    ))}
                  </Form.Control>
                </div>
                <button onClick={handleShowUnidadeModal} className="btn btn-primary ms-3 links-acessos">Adicionar/remover</button>
              </div>
            </Form.Group>
          </Col>

          {/* Fornecedor */}
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="fornecedor">
              <Form.Label className="fortificarLetter">Fornecedor <span className="text-danger">*</span></Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdStore fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  as="select"
                  name="fornecedor"
                  value={produto.fornecedor}
                  onChange={handleChange}
                >
                  <option value="">- Selecione Fornecedor -</option>
                  <option value="56">Gondoafrica</option>
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Cor */}
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="cor">
              <Form.Label className="fortificarLetter">Cor</Form.Label>
              <div className="d-flex align-items-center">
                <div className="w-100">
                  <div className="input-group">
                    <span className="input-group-text"><MdPalette fontSize={22} color="#0070fa" /></span>
                    <Form.Select
                      value={produto.cor}

                    >
                      <option value="">-- Selecione a cor --</option>
                      {cores.map((cor) => (
                        <option key={cor.hex} value={cor.hex} style={{ backgroundColor: cor.hex }}>
                          {cor.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
                <button
                  onClick={handleShowCorModal}
                  className="btn btn-primary ms-3 links-acessos"
                >
                  Adicionar/Remover
                </button>
              </div>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="garantia">
              <Form.Label className="fortificarLetter">Garantia</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdSecurity fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="text"
                  name="garantia"
                  value={produto.garantia}
                  onChange={handleChange}
                  placeholder="Insira a garantia do produto"
                  maxLength="20"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Garantia */}
        <Row>

        </Row>

        {/* Imagem */}
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="imagem">
              <Form.Label className="fortificarLetter">Imagem</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><MdImage fontSize={22} color="#0070fa" /></span>
                <Form.Control
                  type="file"
                  name="imagem"
                  onChange={handleImageChange}
                />
              </div>
              {produto.imagem && (
                <img
                  src={URL.createObjectURL(produto.imagem)}
                  alt="Imagem do produto"
                  style={{ width: 100, marginTop: '10px' }}
                />
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Notas */}

        <Form.Group>
          <div className="d-flex justify-content-between">
            <h6 className="mt-5">Adicionar Notas</h6>
            {/* Botão de Adicionar Nota */}
            <Button
              variant="primary"
              type="button"
              onClick={handleAddNota}
              className="mt-3 btnAddEsp"
            >
              <IoMdAddCircle className="btnColorir" />
            </Button>
          </div>
          <hr />
          {produto.notas.map((nota, index) => (
            <div key={index} className="nota d-flex">
              <Row>
                <Col xs={12} md={6} lg={4}>
                  <Form.Group controlId={`nota-texto-${index}`}>
                    <Form.Label className="fortificarLetter">Notas</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text"><MdNote fontSize={22} color="#0070fa" /></span>
                      <Form.Control
                        as="textarea"
                        name="textoNota"
                        value={nota.textoNota}
                        onChange={(e) => handleNotaChange(index, e)}
                        maxLength="100"
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={4}>
                  <Form.Group controlId={`nota-arquivos-${index}`}>
                    <Form.Label className="fortificarLetter">Arquivos</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text"><MdOutlineFileCopy fontSize={22} color="#0070fa" /></span>
                      <Form.Control
                        type="file"
                        name={`nota-arquivos-${index}`}
                        onChange={(e) => handleFileChange(index, e)}
                        multiple
                      />
                    </div>

                  </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={4} className="pt-4">
                  <Form.Check
                    type="checkbox"
                    label="Nota Interna"
                    name="interna"
                    checked={nota.interna}
                    onChange={(e) => handleNotaChange(index, e)}
                  />

                  <Form.Check
                    type="checkbox"
                    label="Compartilhado com fornecedor"
                    name="compartilhada"
                    checked={nota.compartilhada}
                    onChange={(e) => handleNotaChange(index, e)}
                  />
                </Col>
              </Row>

              {/* Botão de Remover Nota */}
              <Button
                variant="danger"
                type="button"
                onClick={() => handleRemoveNota(index)}
                className="mt-2 btnAddEsp"
              >
                <MdDeleteForever className="btnDeleteColorir" fontSize={20} />
              </Button>
            </div>
          ))}


        </Form.Group>

        {/* Botão de Enviar */}
        <Button variant="success" type="submit" className="links-acessos w-25 px-5 mt-5 d-block mx-auto">
          Enviar
        </Button>
      </Form>

      {/* Modal para adicionar nova cor */}
      <Modal show={showCorModal} onHide={handleCloseCorModal} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Cor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex">
              <Form.Group controlId="novaCorNome" className="w-100">
                <Form.Label className="fortificarLetter">Nome da Cor</Form.Label>
                <Form.Control
                  type="text"
                  value={novaCor.nome}
                  onChange={(e) => setNovaCor({ ...novaCor, nome: e.target.value })}
                  placeholder="Digite o nome da cor"
                />
              </Form.Group>
              <Form.Group controlId="novaCorHex" >
                <Form.Label className="fortificarLetter"><span className="opacity-0"> b</span></Form.Label>
                <Form.Control
                  type="color"
                  value={novaCor.hex}
                  onChange={(e) => setNovaCor({ ...novaCor, hex: e.target.value })}
                  placeholder="Digite o código hexadecimal"
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-end my-2">
              <Button variant="primary" onClick={handleAddCor} className="links-acessos btnAddCor">
                Adicionar
              </Button>
            </div>
          </Form>
          <hr />
          <h5>Cores Atuais</h5>
          <ul className="list-group">
            {cores.map((cor) => (
              <li
                key={cor.hex}
                className="list-group-item  d-flex justify-content-between align-items-center"
                style={{ backgroundColor: cor.hex }}
              >
                {cor.nome}

                <MdDeleteForever
                  className="text-black"
                  fontSize={20}
                  onClick={() => handleRemoveCor(cor.hex)}
                  style={{ cursor: 'pointer' }}
                />
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>

      {/* Modal para adicionar nova unidade */}
      <Modal show={showUnidadeModal} onHide={handleCloseUnidadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar unidade de medida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex">
              <Form.Group className="mb-3 w-100">
                <Form.Control
                  type="text"
                  value={novaUnidade}
                  onChange={(e) => setNovaUnidade(e.target.value)}
                  placeholder="Digite a unidade de medida"
                  maxLength="30"
                />
              </Form.Group>

              <Button className="h-25 ms-2" onClick={handleAddUnidade}>
                Enviar
              </Button>
            </div>
          </Form>

          <table className="table unitproductname mt-3">
            <tbody>
              {unidades.map((unidade) => (
                <tr key={unidade.id} className="delete-1 data_unit_name row mx-1 border my-2">
                  <td className="text-start col-6 ">{unidade.nome}</td>
                  <td className="text-end col-6">
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveUnidade(unidade.id)}
                    >
                      <MdDeleteForever fontSize={26} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
}









export default function AddProdutos() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Produtos" direccao="/AddProdutos" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR="/produtosPage" />

            <div className="vh-100 alturaPereita">
              <FormularioProduto />
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