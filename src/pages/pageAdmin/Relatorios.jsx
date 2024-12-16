import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";


import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import  {  useEffect } from 'react';
import { Button, Form, Row, Col, ListGroup } from 'react-bootstrap';

const ArmazenarRelatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [novoRelatorio, setNovoRelatorio] = useState({
    titulo: '',
    descricao: '',
    arquivo: null,
  });

  // Função para carregar os relatórios existentes (simulada)
  useEffect(() => {
    // Simulação de carregamento dos relatórios de uma API
    const relatoriosCarregados = [
      { id: 1, titulo: 'Relatório 1', descricao: 'Descrição do Relatório 1', arquivo: 'relatorio1.pdf' },
      { id: 2, titulo: 'Relatório 2', descricao: 'Descrição do Relatório 2', arquivo: 'relatorio2.docx' },
    ];
    setRelatorios(relatoriosCarregados);
  }, []);

  // Função para lidar com as mudanças no formulário
  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setNovoRelatorio({
      ...novoRelatorio,
      [name]: value,
    });
  };

  // Função para lidar com a mudança do arquivo
  const lidarComArquivo = (e) => {
    const arquivo = e.target.files[0];
    setNovoRelatorio({
      ...novoRelatorio,
      arquivo: arquivo,
    });
  };

  // Função para enviar o novo relatório
  const lidarComEnvio = (e) => {
    e.preventDefault();

    // Simular o envio do relatório
    const novoRelatorioAdicionado = { 
      ...novoRelatorio, 
      id: relatorios.length + 1, // Gerar um ID único para o relatório
      arquivo: novoRelatorio.arquivo.name, // Nome do arquivo (você pode armazenar o arquivo real em um serviço)
    };
    setRelatorios([...relatorios, novoRelatorioAdicionado]);

    // Limpar o formulário
    setNovoRelatorio({
      titulo: '',
      descricao: '',
      arquivo: null,
    });
  };

  return (
    <div className="container">
      <h2 className="mt-4">Armazenar Relatórios</h2>

      {/* Formulário para adicionar um novo relatório */}
      <Form onSubmit={lidarComEnvio}>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <Form.Label>Título do Relatório</Form.Label>
          </Col>
          <Col xs={12} md={8}>
            <Form.Control
              type="text"
              name="titulo"
              value={novoRelatorio.titulo}
              onChange={lidarComMudanca}
              required
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={4}>
            <Form.Label>Descrição do Relatório</Form.Label>
          </Col>
          <Col xs={12} md={8}>
            <Form.Control
              as="textarea"
              name="descricao"
              value={novoRelatorio.descricao}
              onChange={lidarComMudanca}
              rows={3}
              required
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={4}>
            <Form.Label>Arquivo do Relatório</Form.Label>
          </Col>
          <Col xs={12} md={8}>
            <Form.Control
              type="file"
              name="arquivo"
              onChange={lidarComArquivo}
              required
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={8} className="offset-md-4">
            <Button type="submit" variant="success">
              Adicionar Relatório
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Lista de relatórios armazenados */}
      <h3 className="mt-4">Relatórios Armazenados</h3>
      <ListGroup>
        {relatorios.map((relatorio) => (
          <ListGroup.Item key={relatorio.id}>
            <strong>{relatorio.titulo}</strong> - {relatorio.descricao}
            <br />
            Arquivo: {relatorio.arquivo}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};




function RelatoriosSistemas() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-5"
    > 
    
   
    
    
    
      <Tab eventKey="home" title="SERVIÇOS">
      
      </Tab>
      <Tab eventKey="profile" title="ESTOQUE DE PRODUTOS">
        <ArmazenarRelatorios />
      </Tab>
      <Tab eventKey="contact" title="USO DO PRODUTO" >
        Tab content for Contact
      </Tab>
      <Tab eventKey="Emp" title=" EMP. SERVIÇOS" >
        Tab content for Contact
      </Tab>
      <Tab eventKey="Proximos servços" title=" PRóXIMOS SERVIçOS" >
        Tab content for Contact
      </Tab>
      <Tab eventKey="email-s" title="E-MAILS" >
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}



const Relatorios = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Relatórios"  />

            <div className="vh-100 alturaPereita">
              <RelatoriosSistemas />
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

export default Relatorios;
