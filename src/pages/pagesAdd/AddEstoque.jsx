import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
//import AdicionarEstoque from "../../components/compenentesAdmin/AdcionarEstoque.jsx";


import { Form, Button, Row, Col, Table } from 'react-bootstrap';

const FormularioAddEstoque = () => {
  return (
    <Form id="purchaseAdd-Form" method="post" action="https://biturbomotors.com/garage/purchase/store" encType="multipart/form-data" className="form-horizontal upperform purchaseAddForm">
      <Row className="mb-0">
        {/* Compra Não */}
        <Col md={6} lg={6} xl={6}>
          <Form.Group as={Row} controlId="p_no">
            <Form.Label column sm={4}>Compra Não <span className="text-danger">*</span></Form.Label>
            <Col sm={8}>
              <Form.Control type="text" value="P853406" readOnly />
            </Col>
          </Form.Group>
        </Col>

        {/* Data de Compra */}
        <Col md={6} lg={6} xl={6}>
          <Form.Group as={Row} controlId="pur_date">
            <Form.Label column sm={4}>Data de Compra <span className="text-danger">*</span></Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="dd-mm-yyyy"
                value="2024-11-25"
                onKeyPress={(e) => e.preventDefault()}
                required
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-0">
        {/* Nome do Fornecedor */}
        <Col md={6} lg={6} xl={6}>
          <Form.Group as={Row} controlId="s_name">
            <Form.Label column sm={4}>Nome do Fornecedor <span className="text-danger">*</span></Form.Label>
            <Col sm={8}>
              <Form.Control as="select" required>
                <option value="">Fornecedor Selecionado</option>
                <option value="56">Gondoafrica</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>

        {/* Não Móvel */}
        <Col md={6} lg={6} xl={6}>
          <Form.Group as={Row} controlId="mobile">
            <Form.Label column sm={4}>Não Móvel <span className="text-danger">*</span></Form.Label>
            <Col sm={8}>
              <Form.Control type="text" placeholder="Digite o número de celular" readOnly />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-0">
        {/* E-mail */}
        <Col md={6} lg={6} xl={6}>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={4}>E-mail <span className="text-danger">*</span></Form.Label>
            <Col sm={8}>
              <Form.Control type="text" placeholder="Digite e-mail" readOnly />
            </Col>
          </Form.Group>
        </Col>

        {/* Endereço de Cobrança */}
        <Col md={6} lg={6} xl={6}>
          <Form.Group as={Row} controlId="address">
            <Form.Label column sm={4}>Endereço de Cobrança <span className="text-danger">*</span></Form.Label>
            <Col sm={8}>
              <Form.Control as="textarea" readOnly />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-0">
        {/* Galho */}
        <Col md={6} lg={6} xl={6}>
          <Form.Group as={Row} controlId="branch">
            <Form.Label column sm={4}>Galho <span className="text-danger">*</span></Form.Label>
            <Col sm={8}>
              <Form.Control as="select">
                <option value="1">Main Branch</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>
      </Row>

      {/* Tabela de Detalhes da Compra */}
      <Row className="mt-4">
        <Col md={12}>
          <h4><b>DETALHES DA COMPRA</b>
            <Button variant="outline-secondary" size="sm" className="ms-2">+</Button>
          </h4>
        </Col>
      </Row>

      <Row className="table-responsive mt-2">
        <Col md={12}>
          <Table bordered>
            <thead>
              <tr>
                <th>Nome do Fabricante</th>
                <th>Nome do Produto</th>
                <th>Quantidade</th>
                <th>Preço ($)</th>
                <th>Montante ($)</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control as="select" required>
                    <option value="">Selecione o Fabricante</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control as="select" required>
                    <option value="">Selecione o Produto</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control type="number" value="1" />
                </td>
                <td>
                  <Form.Control type="text" />
                </td>
                <td>
                  <Form.Control type="text" readOnly />
                </td>
                <td align="center">
                  <Button variant="danger" size="sm">Excluir</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Notas */}
      <Row className="note-row mb-4">
        <Col md={6}>
          <h2><b>Adicionar Notas</b></h2>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="outline-secondary" size="sm" className="mt-1">+</Button>
        </Col>
        <Col md={12}>
          <Row id="notes-1" className="mt-2">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Notas</Form.Label>
              <Col sm={3}>
                <Form.Control as="textarea" maxlength="100" />
              </Col>
              <Col sm={3}>
                <Form.Control type="file" multiple accept="image/*,application/pdf,video/*" />
              </Col>
              <Col sm={3}>
                <Form.Check type="checkbox" label="Notas Internas" />
                <Form.Check type="checkbox" label="Compartilhado com Fornecedor" />
              </Col>
              <Col sm={1} className="text-center">
                <Button variant="link" className="text-danger">Excluir</Button>
              </Col>
            </Form.Group>
          </Row>
        </Col>
      </Row>

      {/* Botão Enviar */}
      <Row>
        <Col md={12}>
          <Button variant="success" type="submit" className="purchaseSubmitButton">ENVIAR</Button>
        </Col>
      </Row>
    </Form>
  );
};






const AddEstoque = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Produtos em Estoque"  leftSeta={<FaArrowLeftLong />} leftR="/estoqueList" />

            <div className="vh-100 alturaPereita">
         
                <FormularioAddEstoque />
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

export default AddEstoque;
