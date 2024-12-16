import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";

import Accordion from 'react-bootstrap/Accordion';

import  { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const FormularioEmail = () => {
  // Estado para controlar os campos do formulário
  const [dadosFormulario, setDadosFormulario] = useState({
    subject: 'Welcome to { system_name }',
    sendFrom: 'oseiasdias1953@gmail.com',
    notificationText: '<p>osieaaaaaaaaaaaaaaa</p>',
    isSend: '0',
  });

  // Função para lidar com as mudanças de input
  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({
      ...dadosFormulario,
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const lidarComEnvio = (e) => {
    e.preventDefault();
    console.log(dadosFormulario);
    // Enviar os dados do formulário para a API ou outro destino
  };

  // Função para inicializar o CKEditor
  useEffect(() => {
    if (window.CKEDITOR) {
      window.CKEDITOR.replace('editor_1', {
        toolbar: [
          { name: 'styles', items: ['Bold', 'Italic'] },
          { name: 'basicstyles', items: ['Underline', 'Subscript', 'Superscript', 'RemoveFormat'] },
          { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv'] },
          { name: 'undo', items: ['Undo', 'Redo'] },
          { name: 'styles', items: ['Format', 'Font', 'FontSize'] },
          { name: 'document', items: ['Source'] },
        ],
        format_tags: 'p;h1;h2;h3;h4;h5;h6',
      });
    }
  }, []);

  return (
    <Form className="form-horizontal" method="post" onSubmit={lidarComEnvio} name="parent_form">
      <input type="hidden" name="_token" value="bk3j4YpoonpPuy4QKird4qkoZBCD1mg6E46zHpEI" />

      {/* Assunto do Email */}
      <Row>
        <Col xs={12} md={4} className="text-end">
          <Form.Label>Assunto do email <span className="text-danger">*</span></Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Control
            type="text"
            name="subject"
            value={dadosFormulario.subject}
            placeholder="Enter email subject"
            onChange={lidarComMudanca}
            required
          />
        </Col>
      </Row>

      {/* E-mail do Remetente */}
      <Row className="mt-3">
        <Col xs={12} md={4} className="text-end">
          <Form.Label>E-mail do remetente <span className="text-danger">*</span></Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Control
            type="email"
            name="sendFrom"
            value={dadosFormulario.sendFrom}
            placeholder="Enter Sender Email"
            onChange={lidarComMudanca}
            required
          />
        </Col>
      </Row>

      {/* Modelo de E-mail de Registro */}
      <Row className="mt-3">
        <Col xs={12} md={4} className="text-end">
          <Form.Label>Modelo de e-mail de registro <span className="text-danger">*</span></Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <textarea
            name="notificationText"
            id="editor_1"
            className="form-control validate[required] txt_area"
            value={dadosFormulario.notificationText}
            onChange={lidarComMudanca}
            required
          />
        </Col>
      </Row>

      {/* Instruções sobre variáveis no modelo de e-mail */}
      <Row className="mt-3">
        <Col xs={12} md={4} className="text-end" />
      
      </Row>

      {/* Enviar Opções */}
      <Row className="mt-3">
        <Col xs={12} md={4} className="text-end" />
        <Col xs={12} md={8}>
          É Enviar
          <br />
          <label className="radio-inline">
            <input
              type="radio"
              name="isSend"
              value="0"
              checked={dadosFormulario.isSend === '0'}
              onChange={lidarComMudanca}
            />
            Permitir
          </label>
          <label className="radio-inline ms-3">
            <input
              type="radio"
              name="isSend"
              value="1"
              checked={dadosFormulario.isSend === '1'}
              onChange={lidarComMudanca}
            />
            Desativar
          </label>
        </Col>
      </Row>

      {/* Botão de Enviar */}
      <Row className="mt-3">
        <Col xs={12} md={8} className="offset-md-4">
          <Button type="submit" variant="success" className="branchSubmitButton w-25 mt-4 border-radius-zero ms-auto d-block links-acessos">
            Enviar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};




const FormularioMensagem = () => {
  // Estado para controlar os campos do formulário
  const [dadosFormulario, setDadosFormulario] = useState({
    phoneNumber: '',        // Número do telefone
    message: '',            // Mensagem a ser enviada
    isSend: '0',            // Se a mensagem está habilitada para envio
  });

  // Função para lidar com as mudanças de input
  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({
      ...dadosFormulario,
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const lidarComEnvio = (e) => {
    e.preventDefault();
    // Aqui você poderia enviar a mensagem para um serviço de SMS ou WhatsApp
    console.log('Mensagem enviada:', dadosFormulario);
  };

  return (
    <Form className="form-horizontal" method="post" onSubmit={lidarComEnvio} name="parent_form">
      <input type="hidden" name="_token" value="bk3j4YpoonpPuy4QKird4qkoZBCD1mg6E46zHpEI" />

      {/* Número de Telefone */}
      <Row>
        <Col xs={12} md={4} className="text-end">
          <Form.Label>Telefone do destinatário <span className="text-danger">*</span></Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={dadosFormulario.phoneNumber}
            placeholder="Digite o número de telefone"
            onChange={lidarComMudanca}
            required
          />
        </Col>
      </Row>

      {/* Mensagem */}
      <Row className="mt-3">
        <Col xs={12} md={4} className="text-end">
          <Form.Label>Mensagem <span className="text-danger">*</span></Form.Label>
        </Col>
        <Col xs={12} md={8}>
          <Form.Control
            as="textarea"
            name="message"
            value={dadosFormulario.message}
            placeholder="Digite sua mensagem"
            onChange={lidarComMudanca}
            rows={4}
            required
          />
        </Col>
      </Row>

      {/* Enviar Opções */}
      <Row className="mt-3">
        <Col xs={12} md={4} className="text-end" />
        <Col xs={12} md={8}>
          <label className="radio-inline">
            <input
              type="radio"
              name="isSend"
              value="0"
              checked={dadosFormulario.isSend === '0'}
              onChange={lidarComMudanca}
            />
            Permitir Envio
          </label>
          <label className="radio-inline ms-3">
            <input
              type="radio"
              name="isSend"
              value="1"
              checked={dadosFormulario.isSend === '1'}
              onChange={lidarComMudanca}
            />
            Desativar Envio
          </label>
        </Col>
      </Row>

      {/* Botão de Enviar */}
      <Row className="mt-3">
        <Col xs={12} md={8} className="offset-md-4">
          <Button type="submit" variant="success" className="w-25 mt-4 links-acessos border-radius-zero ms-auto d-block">
            Enviar Mensagem
          </Button>
        </Col>
      </Row>
    </Form>
  );
};





function AcordionEmail() {
  return (
    <div className="mt-5">
      <Accordion className="bordaritem">
        <Accordion.Item eventKey="0">
          <Accordion.Header><h6><b>Notificar Por Email</b></h6></Accordion.Header>
          <Accordion.Body className="textAliado">
            <FormularioEmail />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><h6><b>Notificar por mensagem escrita</b></h6></Accordion.Header>
          <Accordion.Body>
            <FormularioMensagem />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}



const TemplatesEmail = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Enviar Notificação" />

            <div className="vh-100 alturaPereita">
              <AcordionEmail />

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

export default TemplatesEmail;
