import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";


import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaBuilding, FaCalendarAlt, FaCheckCircle,  FaDollarSign, FaTag, FaTags } from "react-icons/fa";

const FormularioDespesas = () => {
  // Estado para armazenar os valores dos campos
  const [formData, setFormData] = useState({
    rotuloPrincipal: '',
    status: '',
    data: '',
    galho: '1',
    entradaDespesa: '',
    rotuloDespesa: ''
  });

  // Função para lidar com a mudança nos campos do formulário
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
    console.log(formData); // Aqui você pode enviar o formulário para o backend
  };

  return (
    <Form method="post" action="https://biturbomotors.com/garage/expense/store" encType="multipart/form-data" onSubmit={handleSubmit}>
      {/* Detalhes de Despesas */}
      <div className="col-md-12 mt-5">
        <h6>DETALHES DE DESPESAS</h6>
        <hr />
      </div>

      {/* Rótulo Principal e Status */}
      <Row className="mt-3">
        <Col md={6}>
          <Form.Label>Rótulo Principal <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaTag fontSize={22} color="#0070fa" /></span>


            <Form.Control
              type="text"
              name="rotuloPrincipal"
              value={formData.rotuloPrincipal}
              onChange={handleChange}
              placeholder="Digite a etiqueta principal"
              required
            />
          </div>
        </Col>

        <Col md={6}>
          <Form.Label>Status <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaCheckCircle fontSize={22} color="#0070fa" /></span>


            <Form.Control as="select" name="status" value={formData.status} onChange={handleChange} required>
              <option value="">Selecionar status</option>
              <option value="1">Pago total</option>
              <option value="2">Não remunerado</option>
              <option value="0">Parcialmente pago</option>
            </Form.Control>
          </div>
        </Col>
      </Row>

      {/* Data e Galho */}
      <Row className="mt-3">
        <Col md={6}>
          <Form.Label>Data de Recebimento <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaCalendarAlt fontSize={22} color="#0070fa" /></span>


            <Form.Control
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>
        </Col>

        <Col md={6}>
          <Form.Label>Galho <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaBuilding fontSize={22} color="#0070fa" /></span>


            <Form.Control
              as="select"
              name="galho"
              value={formData.galho}
              onChange={handleChange}
              required
            >
              <option value="1">Filial Principal</option>
            </Form.Control>
          </div>
        </Col>
      </Row>

      {/* Entradas de Despesas */}
      <Row className="mt-3">
        <Col md={6}>
          <Form.Label>Entrada de Despesa ($) <span className="text-danger">*</span></Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaDollarSign fontSize={22} color="#0070fa" /></span>


            <Form.Control
              type="number"
              name="entradaDespesa"
              value={formData.entradaDespesa}
              onChange={handleChange}
              placeholder="Valor da despesa"
              required
            />
          </div>
        </Col>

        <Col md={6}>
          <Form.Label>Rótulo de Despesa</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaTags fontSize={22} color="#0070fa" /></span>


            <Form.Control
              type="text"
              name="rotuloDespesa"
              value={formData.rotuloDespesa}
              onChange={handleChange}
              placeholder="Rótulo de entrada de despesas"
            />
          </div>
        </Col>
      </Row>

      {/* Botões */}
      <div className="mt-3 text-center">
        <Button type="submit" variant="success" className="px-5 mt-2 taxratesSubmitButton bordarNONE mt-5 border-radius-zero mx-auto links-acessos d-block w-25">Adicionar</Button>
      </div>

      {/* Token */}
      <input type="hidden" name="_token" value="3SdpCZa7Aj50aKHh555Fyl67CfET8SQ996mEr2dl" />
    </Form>
  );
};






export default function AddDispesas() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar  Dispesas" leftSeta={<FaArrowLeftLong />} leftR="/ DispesassPage" />

            <div className="vh-100 alturaPereita">
              <FormularioDespesas />
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