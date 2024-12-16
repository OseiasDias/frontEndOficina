import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaBuilding, FaCalendarAlt, FaCheckCircle, FaCreditCard, FaDollarSign, FaFileInvoice,  FaRegMoneyBillAlt, FaTag, FaTags } from "react-icons/fa";

const FormularioRenda = () => {
  // Definir os estados para os campos
  const [formData, setFormData] = useState({
    fatura: '',
    valorPendente: '',
    status: '',
    rotuloPrincipal: '',
    data: '',
    tipoPagamento: '',
    galho: '',
    entradaRenda: '',
    rotuloRenda: ''
  });

  // Função para lidar com alterações no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Pode ser substituído pelo envio real do formulário
  };

  return (
    <Form method="post" action="https://biturbomotors.com/garage/income/store" encType="multipart/form-data" onSubmit={handleSubmit}>
      {/* Detalhes de Renda */}
      <div className="col-md-12 mt-5">
        <h6>DETALHES DE RENDA</h6>
        <hr />
      </div>

      {/* Fatura */}
      <Row className="form-group">
        <Col md={6}>
          <Form.Label>Fatura <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaFileInvoice fontSize={22} color="#0070fa" /></span>

            <Form.Control as="select" name="fatura" value={formData.fatura} onChange={handleChange} required>
              <option value="">Selecionar Fatura</option>
              <option value="00000001">00000001</option>
            </Form.Control>
          </div>
        </Col>

        {/* Valor Pendente */}
        <Col md={6}>
          <Form.Label>Valor Pendente ($)</Form.Label>
          <div className="input-group">
                        <span className="input-group-text"><FaRegMoneyBillAlt fontSize={22} color="#0070fa" /></span>

          <Form.Control type="text" name="valorPendente" value={formData.valorPendente} onChange={handleChange} placeholder="Quantidade total de fatura" readOnly />
          <input type="hidden" name="paymentno" value="P897453" />
          </div>
        </Col>
      </Row>

      {/* Status */}
      <Row className="form-group">
        <Col md={6}>
          <Form.Label>Status <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
                        <span className="input-group-text"><FaCheckCircle fontSize={22} color="#0070fa" /></span>

          <Form.Control as="select" name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Selecionar status</option>
            <option value="2">Pago total</option>
            <option value="0">Não remunerado</option>
            <option value="1">Parcialmente pago</option>
          </Form.Control>
          </div>
        </Col>

        {/* Rótulo Principal */}
        <Col md={6}>
          <Form.Label>Rótulo Principal <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
                        <span className="input-group-text"><FaTag fontSize={22} color="#0070fa" /></span>

          <Form.Control type="text" name="rotuloPrincipal" value={formData.rotuloPrincipal} onChange={handleChange} placeholder="Digite o rótulo principal" required />
          </div>
        </Col>
      </Row>

      {/* Data */}
      <Row className="form-group">
        <Col md={6}>
          <Form.Label>Data de Recebimento <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
                        <span className="input-group-text"><FaCalendarAlt fontSize={22} color="#0070fa" /></span>

          <Form.Control type="date" name="data" value={formData.data} onChange={handleChange} required />
         </div>
        </Col>

        {/* Tipo de Pagamento */}
        <Col md={6}>
          <Form.Label>Tipo de Pagamento <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
                        <span className="input-group-text"><FaCreditCard fontSize={22} color="#0070fa" /></span>

         
          <Form.Control as="select" name="tipoPagamento" value={formData.tipoPagamento} onChange={handleChange} required>
            <option value="">Selecione o Tipo de Pagamento</option>
            <option value="1">Dinheiro</option>
            <option value="2">Multibanco</option>
            <option value="3">Transferência Bancária</option>
            <option value="4">Pagamento Parcelado</option>
            <option value="5">Cartão de Crédito</option>
          </Form.Control>
          </div>
        </Col>
      </Row>

      {/* Galho */}
      <Row className="form-group">
        <Col md={6}>
          <Form.Label>Galho <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
                        <span className="input-group-text"><FaBuilding fontSize={22} color="#0070fa" /></span>

          <Form.Control as="select" name="galho" value={formData.galho} onChange={handleChange}>
            <option value="1">Filial Principal</option>
          </Form.Control>
          </div>
        </Col>
      </Row>

      {/* Entradas de Renda */}
      <Row className="form-group">
        <Col md={6}>
          <Form.Label>Entrada de Renda ($) <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
                        <span className="input-group-text"><FaDollarSign fontSize={22} color="#0070fa" /></span>

          <Form.Control type="text" name="entradaRenda" value={formData.entradaRenda} onChange={handleChange} placeholder="Insira o valor da entrada de renda" required />
          </div>
        </Col>

        {/* Rótulo de Renda */}
        <Col md={6}>
          <Form.Label>Rótulo de Renda</Form.Label>
          <div className="input-group">
                        <span className="input-group-text"><FaTags fontSize={22} color="#0070fa" /></span>

          <Form.Control type="text" name="rotuloRenda" value={formData.rotuloRenda} onChange={handleChange} placeholder="Insira o rótulo de renda" />
        </div>
        </Col>
      </Row>

      {/* Botões */}
      <div className="form-group text-center">
        <Button type="submit" variant="success" className="px-5 mt-2 taxratesSubmitButton bordarNONE mt-5 border-radius-zero mx-auto links-acessos d-block w-25">Adicionar</Button>
      </div>

      {/* Token */}
      <input type="hidden" name="_token" value="3SdpCZa7Aj50aKHh555Fyl67CfET8SQ996mEr2dl" />
    </Form>
  );
};





export default function AddRenda() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Renda" leftSeta={<FaArrowLeftLong />} leftR="/rendasPage" />

            <div className="vh-100 alturaPereita">
              <FormularioRenda />
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