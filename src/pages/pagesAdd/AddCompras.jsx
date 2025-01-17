import { useState } from "react";
import { Form, Row, Col, Table, Button } from "react-bootstrap";
import { MdNote, MdOutlineFileCopy } from "react-icons/md";
import { FaRegFileAlt, FaCalendarAlt, FaIndustry, FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaTree } from "react-icons/fa";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";

function FormularioAddCompra() {
    const [dadosCompra, setDadosCompra] = useState({
        numeroCompra: '',
        dataCompra: '',
        fornecedor: '',
        celular: '',
        email: '',
        endereco: '',
        galho: '1',
        fabricanteId: '',
        produtoId: '',
        quantidade: 0,
        preco: 0,
        precoTotal: 0,
        textoNota: '',
        interna: false,
        compartilhada: false,
        notaArquivos: []
    });

    const handleMudanca = (event) => {
        const { name, value, type, checked } = event.target;
        setDadosCompra({
            ...dadosCompra,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar o formulário
    };

  

    return (
        <Form onSubmit={handleSubmit}>
        <div className="col-md-12 mt-5">
            <h6>INFORMAÇÕES DA COMPRA</h6>
            <hr />
        </div>
        <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="numeroCompra">
                <Form.Label>
                    Compra Não <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaRegFileAlt fontSize={22} color="#0070fa" /></span>
                    <Form.Control
                        type="text"
                        name="numeroCompra"
                        value={dadosCompra.numeroCompra}
                        readOnly
                        placeholder="Numero de Compra"
                    />
                </div>
            </Form.Group>
    
            <Form.Group as={Col} md={6} controlId="dataCompra">
                <Form.Label>
                    Data de Compra <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaCalendarAlt fontSize={22} color="#0070fa" /></span>
                    <Form.Control
                        type="date"
                        name="dataCompra"
                        value={dadosCompra.dataCompra}
                        onChange={handleMudanca}
                        required
                    />
                </div>
            </Form.Group>
        </Row>
    
        <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="fornecedor">
                <Form.Label>
                    Nome do Fornecedor <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaIndustry fontSize={22} color="#0070fa" /></span>
                    <Form.Control
                        as="select"
                        name="fornecedor"
                        value={dadosCompra.fornecedor}
                        onChange={handleMudanca}
                        required
                    >
                        <option value="">Selecione o fornecedor</option>
                        <option value="56">Gondoafrica</option>
                    </Form.Control>
                </div>
            </Form.Group>
    
            <Form.Group as={Col} md={6} controlId="celular">
                <Form.Label>
                    Não Móvel <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaPhoneAlt fontSize={22} color="#0070fa" /></span>
                    <Form.Control
                        type="text"
                        name="celular"
                        value={dadosCompra.celular}
                        onChange={handleMudanca}
                        placeholder="Digite o número de celular"
                        readOnly
                    />
                </div>
            </Form.Group>
        </Row>
    
        <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="email">
                <Form.Label>
                    E-mail <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaEnvelope fontSize={22} color="#0070fa" /></span>
                    <Form.Control
                        type="email"
                        name="email"
                        value={dadosCompra.email}
                        onChange={handleMudanca}
                        placeholder="Digite o e-mail"
                        readOnly
                    />
                </div>
            </Form.Group>
    
            <Form.Group as={Col} md={6} controlId="endereco">
                <Form.Label>
                    Endereço de Cobrança <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaMapMarkedAlt fontSize={22} color="#0070fa" /></span>
                    <Form.Control
                        as="textarea"
                        name="endereco"
                        value={dadosCompra.endereco}
                        onChange={handleMudanca}
                        readOnly
                        placeholder="Digite o Endereço de Cobrança "
                    />
                </div>
            </Form.Group>
        </Row>
    
        <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="galho">
                <Form.Label>
                    Galho <span className="text-danger">*</span>
                </Form.Label>
                <div className="input-group">
                    <span className="input-group-text"><FaTree fontSize={22} color="#0070fa" /></span>
                    <Form.Control
                        as="select"
                        name="galho"
                        value={dadosCompra.galho}
                        onChange={handleMudanca}
                    >
                        <option value="1">Main Branch</option>
                    </Form.Control>
                </div>
            </Form.Group>
        </Row>
    
        <div className="mt-5">
            <h6><strong>DETALHES DA COMPRA</strong></h6>
        </div>
        <hr />
    
        {/* Tabela de Produtos */}
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>Nome do Fabricante</th>
                    <th>Nome do Produto</th>
                    <th>Quantidade</th>
                    <th>Preço (Kz)</th>
                    <th>Montante (Kz)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Form.Control
                            as="select"
                            name="fabricanteId"
                            value=""
                            onChange="" // Corrigir para função que manipula esse campo
                        >
                            <option value="">Selecione o fabricante</option>
                            {/* Adicionar opções de fabricantes aqui */}
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control
                            as="select"
                            name="produtoId"
                            value=""
                            onChange=""// Corrigir para função que manipula esse campo
                        >
                            <option value="">Selecione o produto</option>
                            {/* Adicionar opções de produtos aqui */}
                        </Form.Control>
                    </td>
                    <td>
                        <Form.Control
                            type="number"
                            name="quantidade"
                            value=""
                            onChange=""// Corrigir para função que manipula esse campo
                            placeholder="Quantidade"

                        />
                    </td>
                    <td>
                        <Form.Control
                            type="number"
                            name="preco"
                            value=""
                            onChange="" // Corrigir para função que manipula esse campo
                            placeholder="Preço"
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="text"
                            name="precoTotal"
                            value=""
                            onChange="" // Corrigir para função que manipula esse campo
                            readOnly
                            placeholder="Preço Total"
                        />
                    </td>
                    
                </tr>
            </tbody>
        </Table>
    
        <div className="mt-5 d-flex justify-content-between bordarDiv">
            <h6 className="baixarTexto pb-3 text-uppercase"><strong>Adicionar Notas</strong></h6>
        </div>
        
    
        <Row>
            <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="nota-texto">
                    <Form.Label className="fortificarLetter">Notas</Form.Label>
                    <div className="input-group">
                        <span className="input-group-text"><MdNote fontSize={22} color="#0070fa" /></span>
                        <Form.Control
                            as="textarea"
                            name="textoNota"
                            value={dadosCompra.textoNota || ""}
                            onChange={handleMudanca}
                            maxLength="100"
                        />
                    </div>
                </Form.Group>
            </Col>
    
            <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="nota-arquivos">
                    <Form.Label className="fortificarLetter">Arquivos</Form.Label>
                    <div className="input-group">
                        <span className="input-group-text"><MdOutlineFileCopy fontSize={22} color="#0070fa" /></span>
                        <Form.Control
                            type="file"
                            name="notaArquivos"
                            onChange="" // Adicionar função para lidar com o upload de arquivos
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
                    checked={dadosCompra.interna || false}
                    onChange={handleMudanca}
                />
                <Form.Check
                    type="checkbox"
                    label="Compartilhado com fornecedor"
                    name="compartilhada"
                    checked={dadosCompra.compartilhada || false}
                    onChange={handleMudanca}
                />
            </Col>
        </Row>
    
        <Button type="submit" className="links-acessos px-5 mt-5 w-25 mx-auto d-block">
            Enviar
        </Button>
    </Form>
    
    );
}


export default function AddCompras() {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100 ">
                        <TopoAdmin entrada="Adicionar Compra" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR="/comprasPage" />
                        <div className="vh-100 alturaPereita">
                            <FormularioAddCompra />
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
