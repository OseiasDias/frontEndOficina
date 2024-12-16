import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";


import { useState } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";


const FormularioVenda = () => {
  const [dadosFormulario, setDadosFormulario] = useState({
    bill_no: "SP571928",
    salesDate: "2024-12-09",
    cus_name: "",
    salesmanname: "",
    branch: "1",
    produtos: [
      {
        Manufacturer_id: "",
        product_id: "",
        qty: "",
        price: "",
        total_price: ""
      }
    ]
  });


  // eslint-disable-next-line no-unused-vars
  const lidarComMudanca = (e, index) => {
    const { name, value } = e.target;
    const dadosAtualizados = { ...dadosFormulario };

    if (name.includes('product')) {
      const indiceProduto = name.match(/\d+/)[0];
      dadosAtualizados.produtos[indiceProduto][name.split('[')[1].split(']')[0]] = value;
    } else {
      dadosAtualizados[name] = value;
    }

    setDadosFormulario(dadosAtualizados);
  };

  const adicionarLinhaProduto = () => {
    setDadosFormulario({
      ...dadosFormulario,
      produtos: [
        ...dadosFormulario.produtos,
        { Manufacturer_id: "", product_id: "", qty: "", price: "", total_price: "" }
      ]
    });
  };

  // Função para remover um produto da lista
  const removerProduto = (index) => {
    const produtosAtualizados = dadosFormulario.produtos.filter((_, i) => i !== index);
    setDadosFormulario({ ...dadosFormulario, produtos: produtosAtualizados });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica de envio para a API
    console.log(dadosFormulario);
  };

  return (

    <>
    <div className="col-md-12 mt-5">
      <h6>INFORMAÇÕES DE VENDAS</h6>
      <hr />
    </div>
      <Form id="salespartAddForm" method="post" action="https://biturbomotors.com/garage/sales_part/store" encType="multipart/form-data" className="form-horizontal upperform salesPartAddForm" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={8} md={6}>
            <Form.Group controlId="bill_no">
              <Form.Label>Conta não <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="bill_no" value={dadosFormulario.bill_no} readOnly />
            </Form.Group>
          </Col>

          <Col xs={8} md={6}>
            <Form.Group controlId="salesDate">
              <Form.Label>Data de venda <span className="text-danger">*</span></Form.Label>
              <Form.Control type="date" name="salesDate" value={dadosFormulario.salesDate} placeholder="dd-mm-yyyy" onKeyPress={(e) => e.preventDefault()} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={8} md={6}>
            <Form.Group controlId="cus_name">
              <Form.Label>Nome do cliente <span className="text-danger">*</span></Form.Label>
              <Form.Control as="select" name="cus_name" value={dadosFormulario.cus_name} onChange={(e) => lidarComMudanca(e)}>
                <option value="">Selecione o Cliente</option>
                <option value="6">Abraão Odair Kanepa</option>
                <option value="7">Alex Ofoka</option>
                <option value="8">António Alberto Kialanda</option>
                <option value="9">Alfredo Guevara Filipe Fialho</option>
                <option value="20">Victória Da Graça Benjamim</option>
                <option value="21">Ana Da Conceição Nunes</option>
                <option value="62">Oseias Teste</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={8} md={6}>
            <Form.Group controlId="salesmanname">
              <Form.Label>Vendedor <span className="text-danger">*</span></Form.Label>
              <Form.Control as="select" name="salesmanname" value={dadosFormulario.salesmanname} onChange={(e) => lidarComMudanca(e)}>
                <option value="">Selecione Nome</option>
                <option value="2">Julia Jeremias</option>
                <option value="4">Silvana Alfredo</option>
                <option value="5">Augusto Da Silva</option>
                <option value="10">Firmino Yundula Kiala João</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={8} md={6}>
            <Form.Group controlId="branch">
              <Form.Label>Galho <span className="text-danger">*</span></Form.Label>
              <Form.Control as="select" name="branch" value={dadosFormulario.branch} onChange={(e) => lidarComMudanca(e)}>
                <option value="1">Filial Principal</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={10}>
            <div className="d-flex">
              <h6 className="me-3 baixarH6">PARTE DE VENDA</h6>
              <Button variant="outline-secondary" onClick={adicionarLinhaProduto} className="mt-2 taxratesSubmitButton bordarNONE border-radius-zero links-acessos">+</Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={12}>
            <Table bordered>
              <thead>
                <tr>
                  <td>Nome do Fabricante</td>
                  <td>Nome do Produto</td>
                  <td>Quantidade</td>
                  <td>Preço ($)</td>
                  <td>Montante ($)</td>
                  <td>Ação</td>
                </tr>
              </thead>
              <tbody>
                {dadosFormulario.produtos.map((produto, index) => (
                  <tr key={produto.product_id || index}> {/* Use produto.product_id ou o index como chave única */}
                    <td>
                      <Form.Control as="select" name={`product[Manufacturer_id][${index}]`} value={produto.Manufacturer_id} onChange={(e) => lidarComMudanca(e, index)} required>
                        <option value="">Selecione o Fabricante</option>
                        <option value="1">Filips</option>
                        <option value="2">Alemanha</option>
                      </Form.Control>
                    </td>
                    <td>
                      <Form.Control as="select" name={`product[product_id][${index}]`} value={produto.product_id} onChange={(e) => lidarComMudanca(e, index)} required>
                        <option value="">Selecione o Produto</option>
                        <option value="1">Lampadas H7</option>
                      </Form.Control>
                    </td>
                    <td>
                      <Form.Control type="number" name={`product[qty][${index}]`} value={produto.qty} onChange={(e) => lidarComMudanca(e, index)} required />
                    </td>
                    <td>
                      <Form.Control type="text" name={`product[price][${index}]`} value={produto.price} onChange={(e) => lidarComMudanca(e, index)} />
                    </td>
                    <td>
                      <Form.Control type="text" name={`product[total_price][${index}]`} value={produto.total_price} readOnly />
                    </td>
                    <td align="center">
                      <MdDeleteForever fontSize={29} onClick={() => removerProduto(index)} className="ttt" />

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>


        <Row className="mt-3">
          <Col md={12}>
            <Button variant="success" type="submit" className="mt-3 w-25   taxratesSubmitButton bordarNONE border-radius-zero mx-auto links-acessos d-block">Adicionar</Button>
          </Col>
        </Row>
      </Form></>
  );
};






export default function AddPecas() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar vendas de  Peças" leftSeta={<FaArrowLeftLong />} leftR="/vendasPage" />

            <div className="vh-100 alturaPereita">
              <FormularioVenda />
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