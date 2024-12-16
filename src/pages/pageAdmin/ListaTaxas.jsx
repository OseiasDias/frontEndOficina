import { useState } from 'react';
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { RiAddLargeLine } from "react-icons/ri";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaIdCard, FaPercent, FaRegFileAlt } from 'react-icons/fa';

const Taxas = () => {
  // Estado para controlar a visibilidade da modal
  const [showModal, setShowModal] = useState(false);

  // Função para abrir a modal
  const handleShow = () => setShowModal(true);

  // Função para fechar a modal
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin entrada="Taxas" />

            <div className="vh-100 alturaPereita d-flex">
              <h3>Taxas</h3>

              {/* Ícone para abrir a modal */}
              <RiAddLargeLine
                fontSize={35}
                className="ms-4 links-acessos arranjarBTN p-2 border-radius-zero"
                onClick={handleShow} // Abre a modal ao clicar
              />
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

      {/* Modal de Adicionar Taxas */}
      <Modal show={showModal} onHide={handleClose} size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Taxa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulário de adicionar taxas */}
          <Form
            action=""
            method="post"
            encType="multipart/form-data"
            className="form-horizontal form-label-left"
            id="tax-rates-add-form"
          >
            {/* Nome do Imposto */}
            <Row className="form-group row-mb-0">
              <Form.Label>
                Nome do imposto <span className="text-danger">*</span>
              </Form.Label>
              
              <Col md={12} >
              <div className="input-group">
                        <span className="input-group-text"><FaRegFileAlt fontSize={22} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  required
                  name="taxrate"
                  placeholder="Enter Tax Name"
                  maxLength={20}
                />

                </div>

              </Col>
            </Row>

            {/* Número de Identificação Fiscal */}
            <Row className="form-group row-mb-0">
              <Form.Label >
                Número de identificação fiscal <span className="text-danger">*</span>
              </Form.Label>
              <Col md={12}>
              <div className="input-group">
                        <span className="input-group-text"><FaIdCard  fontSize={22} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  required
                  name="tax_number"
                  placeholder="Insira o número fiscal"
                  maxLength={20}
                />
                </div>
              </Col>
            </Row>

            {/* Taxa de Imposto */}
            <Row className="form-group row-mb-0">
              <Form.Label >
                Taxas de imposto (%) <span className="text-danger">*</span>
              </Form.Label>

              <Col md={12} >
              <div className="input-group">
                        <span className="input-group-text"><FaPercent fontSize={22} color="#0070fa" /></span>

                <Form.Control
                  type="text"
                  required
                  name="tax"
                  placeholder="Insira o nome da taxa de imposto"
                />
                </div>
              </Col>
            </Row>

            {/* Token (hidden) */}
            <input type="hidden" name="_token" value="3SdpCZa7Aj50aKHh555Fyl67CfET8SQ996mEr2dl" />

            {/* Botão Enviar */}
            <Row className="form-group row-mb-0">
              <Col className="my-2 mx-0">
                <Button type="submit" variant="success" className="px-5 mt-2 taxratesSubmitButton bordarNONE border-radius-zero mx-auto links-acessos d-block">
                  Adicionar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Taxas;
