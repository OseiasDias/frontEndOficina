import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";


import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { MdDeleteForever, MdFileUpload } from "react-icons/md";
import { FaBuilding, FaCalculator, FaCalendarAlt, FaCar, FaClipboardList, FaDollarSign,  FaFileInvoice, FaHashtag, FaIdCard, FaInfoCircle, FaMoneyBillWave, FaPercent, FaStickyNote, FaUserAlt, FaWallet } from "react-icons/fa";

function FormularioFatura() {
  const [formData, setFormData] = useState({
    tipoFatura: '',
    numeroFatura: '00000002',
    cliente: '',
    cartaoTrabalho: '',
    veiculo: '',
    valorTotal: '',
    data: '2024-12-02',
    filial: '1',
    status: '',
    totalGeral: '',
    valorPago: '',
    tipoPagamento: '',
    detalhes: '',
    desconto: '',
    notas: [{
      textoNota: '',
      arquivoNota: null,
      interna: false,
      compartilhada: false
    }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      data: e.target.value
    }));
  };

  const handleFileChange = (e, index) => {
    const newNotes = [...formData.notas];
    newNotes[index].arquivoNota = e.target.files[0];
    setFormData(prevData => ({
      ...prevData,
      notas: newNotes
    }));
  };

  const handleAddNote = () => {
    setFormData(prevData => ({
      ...prevData,
      notas: [...prevData.notas, { textoNota: '', arquivoNota: null, interna: false, compartilhada: false }]
    }));
  };

  const handleRemoveNote = (index) => {
    const newNotes = formData.notas.filter((_, i) => i !== index);
    setFormData(prevData => ({
      ...prevData,
      notas: newNotes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log('Dados da Fatura Enviados:', formData);
  };

  return (
    <form method="post" action="https://biturbomotors.com/garage/invoice/store" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="col-md-12 mt-4">
        <h6 className="text-uppercase mt-3">DETALHES DA FATURA</h6>
        <hr />

      </div>

      <Row>

        <Col md={6}>
          <Form.Group controlId="tipoFatura">
            <Form.Label>Fatura para <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text"><FaFileInvoice fontSize={20} color="#0070fa" /></span>


              <Form.Control
                as="select"
                name="tipoFatura"
                value={formData.tipoFatura}
                onChange={handleSelectChange}
              >
                <option value="">Selecione o tipo</option>
                <option value="0">Fatura de Serviço</option>
              </Form.Control>
            </div>
          </Form.Group>
        </Col>

        {formData.tipoFatura && (
          <>
            {/* Seção: Detalhes do Cliente */}
            <div className="di">
              <h6 className="text-uppercase mt-3">Detalhes do Cliente</h6>
              <hr /></div>
            <Col md={6}>
              <Form.Group controlId="cliente">
                <Form.Label>Nome do cliente<span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaUserAlt fontSize={20} color="#0070fa" /></span>


                  <Form.Control
                    as="select"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleSelectChange}
                  >
                    <option value="">Selecione o cliente</option>
                    {/* Adicione opções de clientes aqui */}
                  </Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="numeroFatura">
                <Form.Label>Número da Fatura <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaHashtag fontSize={20} color="#0070fa" /></span>


                  <Form.Control
                    type="text"
                    name="numeroFatura"
                    value={formData.numeroFatura}
                    readOnly
                  />
                </div>
              </Form.Group>
            </Col>

            {/* Seção: Informações do Cartão de Trabalho e Veículo */}
            <div className="di">   <h6 className="text-uppercase mt-3">Informações do Cartão de Trabalho e Veículo</h6>
              <hr /></div>
            <Col md={6}>
              <Form.Group controlId="cartaoTrabalho">
                <Form.Label>Número do Cartão de Trabalho <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaIdCard fontSize={20} color="#0070fa" /></span>

                 
                <Form.Control
                  as="select"
                  name="cartaoTrabalho"
                  value={formData.cartaoTrabalho}
                  onChange={handleSelectChange}
                >
                  <option value="">Selecione o cartão de trabalho</option>
                  {/* Adicione opções de cartões de trabalho aqui */}
                </Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="veiculo">
                <Form.Label>Selecione o Veículo <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>

                 
                <Form.Control
                  as="select"
                  name="veiculo"
                  value={formData.veiculo}
                  onChange={handleSelectChange}
                >
                  <option value="">Selecione o veículo</option>
                  {/* Adicione opções de veículos aqui */}
                </Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="valorTotal">
                <Form.Label>Valor Total (R$) <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaDollarSign fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="valorTotal"
                  value={formData.valorTotal}
                  readOnly
                />
                </div>
              </Form.Group>
            </Col>

            {/* Seção: Data da Fatura e Filial */}
            <div className="di">
              <h6 className="text-uppercase mt-3">Data da Fatura e Filial</h6>
              <hr />
            </div>
            <Col md={6}>
              <Form.Group controlId="data">
                <Form.Label>Data da Fatura <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaCalendarAlt fontSize={20} color="#0070fa" /></span>

                 
                <Form.Control
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleDateChange}
                  required
                />
               </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="filial">
                <Form.Label>Filial <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaBuilding fontSize={20} color="#0070fa" /></span>

                 
                <Form.Control
                  as="select"
                  name="filial"
                  value={formData.filial}
                  onChange={handleSelectChange}
                >
                  <option value="1">Filial Principal</option>
                </Form.Control>
                </div>
              </Form.Group>
            </Col>

            {/* Seção: Status de Pagamento */}
            <div className="d">
              <h6 className="text-uppercase mt-3">Status de Pagamento</h6>
              <hr />
            </div>
            <Col md={6}>
              <Form.Group controlId="status">
                <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaClipboardList fontSize={20} color="#0070fa" /></span>

                 
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status}
                  onChange={handleSelectChange}
                  required
                >
                  
                  <option value="">Selecione o Status do pagamento</option>
                  <option value="1">Parcialmente pago</option>
                  <option value="2">Pago total</option>
                  <option value="0">Não remunerado</option>
                </Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="totalGeral">
                <Form.Label>Total Geral (R$) <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaCalculator fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="totalGeral"
                  value={formData.totalGeral}
                  readOnly
                />
                </div>
              </Form.Group>
            </Col>

            {/* Seção: Valor Pago e Tipo de Pagamento */}
            <div className="di"><h6 className="text-uppercase mt-3">Valor Pago e Tipo de Pagamento</h6>
              <hr /></div>
            <Col md={6}>
              <Form.Group controlId="valorPago">
                <Form.Label>Valor Pago (KZ) <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaMoneyBillWave fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="valorPago"
                  value={formData.valorPago}
                  onChange={handleChange}
                />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="tipoPagamento">
                <Form.Label>Tipo de Pagamento <span className="text-danger">*</span></Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaWallet fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  as="select"
                  name="tipoPagamento"
                  value={formData.tipoPagamento}
                  onChange={handleSelectChange}
                >
                  <option value="">Selecione o Tipo de pagamento</option>
                  <option value="1">Dinheiro</option>
                  <option value="2">Multibanco</option>
                  <option value="3">Transferência Bancária</option>
                  <option value="4">Pagamento parcelado</option>
                  <option value="5">Cartão de crédito</option>
                </Form.Control>
                </div>
              </Form.Group>
            </Col>

            <div className="di">
              {/* Seção: Detalhes Adicionais */}
              <h6 className="text-uppercase mt-3">Detalhes Adicionais</h6>
              <hr />
            </div>
            <Col md={6}>
              <Form.Group controlId="detalhes">
                <Form.Label>Detalhes</Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaInfoCircle fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  as="textarea"
                  name="detalhes"
                  value={formData.detalhes}
                  onChange={handleChange}
                />
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="desconto">
                <Form.Label>Desconto (%)</Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaPercent fontSize={20} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  name="desconto"
                  value={formData.desconto}
                  onChange={handleChange}
                /></div>
              </Form.Group>
            </Col>
          </>
        )}
      </Row>


      {/* Seção de Notas */}
      <div className="secao-notas">
        <div className="di d-flex mt-5 justify-content-between">
          <h6 className="text-uppercase">Adicionar Notas</h6>

          <Button variant="outline-secondary" size="sm" onClick={handleAddNote} className="border-radius-zero links-acessos">+</Button>
        </div>
        <hr />
        {formData.notas.map((nota, index) => (
          <Row key={index} className="linha-nota">
            <Col md={3}>
              <h6>Nota</h6>
              <div className="input-group">
                <span className="input-group-text"><FaStickyNote fontSize={20} color="#0070fa" /></span>


                <Form.Control
                  as="textarea"
                  name={`textoNota-${index}`}
                  value={nota.textoNota}
                  onChange={(e) => {
                    const novasNotas = [...formData.notas];
                    novasNotas[index].textoNota = e.target.value;
                    setFormData(prevData => ({
                      ...prevData,
                      notas: novasNotas
                    }));
                  }}
                  placeholder="Digite a nota"
                  maxLength="100"
                />
              </div>
            </Col>
            <Col md={3}>
              <h6>Arquivo</h6>
              <div className="input-group">
                    <span className="input-group-text"><MdFileUpload  fontSize={20} color="#0070fa" /></span>

              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, index)}
              />
              </div>
            </Col>
            <Col md={3} className="mt-4">
              <Form.Check
                type="checkbox"
                label="Notas internas"
                checked={nota.interna}
                onChange={(e) => {
                  const novasNotas = [...formData.notas];
                  novasNotas[index].interna = e.target.checked;
                  setFormData(prevData => ({
                    ...prevData,
                    notas: novasNotas
                  }));
                }}
              />
              <Form.Check
                type="checkbox"
                label="Compartilhado com o cliente"
                checked={nota.compartilhada}
                onChange={(e) => {
                  const novasNotas = [...formData.notas];
                  novasNotas[index].compartilhada = e.target.checked;
                  setFormData(prevData => ({
                    ...prevData,
                    notas: novasNotas
                  }));
                }}
              />
            </Col>
            <Col md={1} className="mt-4">
              <Button onClick={() => handleRemoveNote(index)} className="colorirBTN links-acessos bordarNONE">
                <MdDeleteForever fontSize={30} />
              </Button>
            </Col>
          </Row>
        ))}
      </div>

      <div className="rodape-formulario">
        <Button variant="primary" type="submit" className="d-block mx-auto mx-auto mt-5 links-acessos w-25">
          Enviar
        </Button>
      </div>
    </form>
  );
}








export default function AddCompras() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Fatura" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR="/faturaList" />
            <div className="vh-100 alturaPereita">
              <FormularioFatura />
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
