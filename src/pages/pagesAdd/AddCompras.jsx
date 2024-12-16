import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { MdNote, MdOutlineFileCopy, MdDeleteForever } from 'react-icons/md';
import { FaRegFileAlt, FaCalendarAlt, FaIndustry, FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaTree } from 'react-icons/fa';

function FormularioAddCompra() {
    const [dadosCompra, setDadosCompra] = useState({
        numeroCompra: 'P305714',
        dataCompra: '2024-11-25',
        fornecedor: '',
        celular: '',
        email: '',
        endereco: '',
        galho: '1',
        produtos: [{ fabricanteId: '', produtoId: '', quantidade: 1, preco: '', precoTotal: '' }],
        notas: [{ textoNota: '', arquivoNota: null, interna: false, compartilhada: false }],
    });

    const handleMudanca = (e) => {
        const { name, value } = e.target;
        setDadosCompra((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleMudancaProduto = (e, indice) => {
        const { name, value } = e.target;
        const produtosAtualizados = [...dadosCompra.produtos];
        produtosAtualizados[indice][name] = value;
        setDadosCompra((prevState) => ({
            ...prevState,
            produtos: produtosAtualizados,
        }));
    };

    const adicionarProduto = () => {
        setDadosCompra((prevState) => ({
            ...prevState,
            produtos: [
                ...prevState.produtos,
                { fabricanteId: '', produtoId: '', quantidade: 1, preco: '', precoTotal: '' },
            ],
        }));
    };

    const removerProduto = (indice) => {
        const produtosAtualizados = [...dadosCompra.produtos];
        if (produtosAtualizados.length > 1) { // Garantir que não estamos removendo a primeira linha
            produtosAtualizados.splice(indice, 1);
            setDadosCompra((prevState) => ({
                ...prevState,
                produtos: produtosAtualizados,
            }));
        }
    };

    const adicionarNota = () => {
        setDadosCompra((prevState) => ({
            ...prevState,
            notas: [
                ...prevState.notas,
                { textoNota: '', arquivoNota: null, interna: false, compartilhada: false },
            ],
        }));
    };

    const handleNotaChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const notasAtualizadas = [...dadosCompra.notas];
        if (type === 'checkbox') {
            notasAtualizadas[index][name] = checked;
        } else {
            notasAtualizadas[index][name] = value;
        }
        setDadosCompra((prevState) => ({
            ...prevState,
            notas: notasAtualizadas,
        }));
    };

    const handleFileChange = (index, e) => {
        const arquivoNota = e.target.files;
        const notasAtualizadas = [...dadosCompra.notas];
        notasAtualizadas[index].arquivoNota = arquivoNota;
        setDadosCompra((prevState) => ({
            ...prevState,
            notas: notasAtualizadas,
        }));
    };

    const removerNota = (index) => {
        const notasAtualizadas = [...dadosCompra.notas];
        notasAtualizadas.splice(index, 1);
        setDadosCompra((prevState) => ({
            ...prevState,
            notas: notasAtualizadas,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dadosCompra);
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

            <div className="mt-4 d-flex">
                <h6><strong>DETALHES DA COMPRA</strong></h6>
                <Button size="sm" onClick={adicionarProduto} className="links-acessos btn-addCompra">
                    +
                </Button>
            </div>

            {/* Tabela de Produtos */}
            <Table bordered responsive>
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
                    {dadosCompra.produtos.map((produto, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Control
                                    as="select"
                                    name="fabricanteId"
                                    value={produto.fabricanteId}
                                    onChange={(e) => handleMudancaProduto(e, index)}
                                >
                                    <option value="">Selecione o fabricante</option>
                                    {/* Adicionar opções de fabricantes aqui */}
                                </Form.Control>
                            </td>
                            <td>
                                <Form.Control
                                    as="select"
                                    name="produtoId"
                                    value={produto.produtoId}
                                    onChange={(e) => handleMudancaProduto(e, index)}
                                >
                                    <option value="">Selecione o produto</option>
                                    {/* Adicionar opções de produtos aqui */}
                                </Form.Control>
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="quantidade"
                                    value={produto.quantidade}
                                    onChange={(e) => handleMudancaProduto(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="preco"
                                    value={produto.preco}
                                    onChange={(e) => handleMudancaProduto(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="precoTotal"
                                    value={produto.precoTotal}
                                    onChange={(e) => handleMudancaProduto(e, index)}
                                    readOnly
                                />
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removerProduto(index)}
                                    className="btn-delete"
                                >
                                    <AiFillDelete fontSize={27} className="icone-delete" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="mt-4 d-flex justify-content-between bordarDiv">
                <h6 className="baixarTexto"><strong>Adicionar Notas</strong></h6>
                <Button className="btn-addCompra" size="sm" onClick={adicionarNota}>
                    +
                </Button>
            </div>

            {/* Notas */}
            {dadosCompra.notas.map((nota, index) => (
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
                        onClick={() => removerNota(index)}
                        className="mt-2 btnAddEsp"
                    >
                        <MdDeleteForever className="btnDeleteColorir" fontSize={20} />
                    </Button>
                </div>
            ))}

            <Button type="submit" className="links-acessos px-5 w-25 mx-auto d-block">
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
