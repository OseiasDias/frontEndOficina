import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { RiAddLargeFill } from 'react-icons/ri';
import { FaCalendarAlt, FaCar, FaClipboard, FaClipboardCheck, FaDollarSign, FaDoorClosed, FaFileAlt, FaFileUpload, FaHashtag, FaHeading, FaInfoCircle, FaListAlt, FaMapMarkerAlt, FaTint, FaTools, FaUser, FaWrench } from 'react-icons/fa';

import Accordion from 'react-bootstrap/Accordion';
import { MdDeleteForever } from "react-icons/md";



const FormularioCotacao = () => {
    const [formData, setFormData] = useState({
        jobno: 'Q000006',
        customerName: '',
        vehicleName: '',
        date: '2024-12-02 09:17:31',
        branch: '1',
        repairCategory: '',
        serviceType: 'paid', // Valor inicial definido para 'paid'
        charge: '', // Inicializado como vazio
        title: '',
        washBay: false,
        washBayCharge: '',
        motTest: false,
        motTestCharge: '',
        details: '',
    });

    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [showRepairCategoryModal, setShowRepairCategoryModal] = useState(false);
    const [newRepairCategory, setNewRepairCategory] = useState('');
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newVehicleName, setNewVehicleName] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleRepairCategoryChange = (e) => {
        setNewRepairCategory(e.target.value);
    };

    const handleCustomerNameChange = (e) => {
        setNewCustomerName(e.target.value);
    };

    const handleVehicleNameChange = (e) => {
        setNewVehicleName(e.target.value);
    };

    const handleRepairCategorySave = () => {
        if (newRepairCategory.trim() !== '') {
            setFormData((prevData) => ({
                ...prevData,
                repairCategory: newRepairCategory,
            }));
            setNewRepairCategory('');
            setShowRepairCategoryModal(false);
        }
    };

    const handleCustomerSave = () => {
        if (newCustomerName.trim() !== '') {
            setFormData((prevData) => ({
                ...prevData,
                customerName: newCustomerName,
            }));
            setNewCustomerName('');
            setShowCustomerModal(false);
        }
    };

    const handleVehicleSave = () => {
        if (newVehicleName.trim() !== '') {
            setFormData((prevData) => ({
                ...prevData,
                vehicleName: newVehicleName,
            }));
            setNewVehicleName('');
            setShowVehicleModal(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Simula o envio ou processamento do formulário
    };

    // Definindo os estados para os checkboxes
    const [washBayChecked, setWashBayChecked] = useState(false);
    const [motTestChecked, setMotTestChecked] = useState(false);

    // Função para manipular a mudança do checkbox de lavagem
    const handleWashBayChange = (e) => {
        setWashBayChecked(e.target.checked);
    };

    // Função para manipular a mudança do checkbox de teste MOT
    const handleMotTestChange = (e) => {
        setMotTestChecked(e.target.checked);
    };

    // Estado inicial para notas
    const [dadosFormulario, setDadosFormulario] = useState({
        notas: [
            { textoNota: '', interna: false, compartilhado: false, arquivos: [] },
        ],
    });

    // Função para lidar com mudanças nos campos do formulário
    const handleNotaChange = (index, e) => {
        const { name, value, type, checked, files } = e.target;
        const updatedNotas = [...dadosFormulario.notas];

        if (type === 'checkbox') {
            updatedNotas[index] = { ...updatedNotas[index], [name]: checked };
        } else if (type === 'file') {
            updatedNotas[index] = { ...updatedNotas[index], arquivos: files };
        } else {
            updatedNotas[index] = { ...updatedNotas[index], [name]: value };
        }

        setDadosFormulario({ ...dadosFormulario, notas: updatedNotas });
    };

    // Função para remover uma nota
    const handleRemoveNota = (index) => {
        const updatedNotas = dadosFormulario.notas.filter((_, i) => i !== index);
        setDadosFormulario({ ...dadosFormulario, notas: updatedNotas });
    };

    // Função para adicionar uma nova nota
    const handleAddNota = () => {
        setDadosFormulario({
            ...dadosFormulario,
            notas: [
                ...dadosFormulario.notas,
                { textoNota: '', interna: false, compartilhado: false, arquivos: [] },
            ],
        });
    };

    return (
        <Container>
            <div className="col-md-12 mt-5">
                <h6 className="text-uppercase">INFORMAÇÕES Cotação  </h6>
                <hr />
            </div>
            <Form onSubmit={handleSubmit}>
                {/* Número da Cotação */}
                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Group controlId="jobno">
                            <Form.Label>Número da Cotação <span className="text-danger">*</span></Form.Label>
                            <div className="d-flex">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaHashtag fontSize={20} color="#0070fa" />
                                    </span>  <Form.Control type="text" name="jobno" value={formData.jobno} readOnly />
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="customerName">
                            <Form.Label>Nome do Cliente <span className="text-danger">*</span></Form.Label>
                            <div className="d-flex">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaUser fontSize={20} color="#0070fa" />
                                    </span>

                                    <Form.Control
                                        as="select"
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione o Cliente</option>
                                        <option value="6">Abraão Odair Kanepa</option>
                                        <option value="7">Alex Ofoka</option>
                                        <option value="8">António Alberto Kialanda</option>
                                        <option value="9">Alfredo Guevara Filipe Fialho</option>
                                    </Form.Control>
                                </div>
                                <Button
                                    variant="outline-secondary"
                                    className="px-2 border-radius-zero ms-1 links-acessos"
                                    onClick={() => setShowCustomerModal(true)}
                                >
                                    <RiAddLargeFill />
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Nome do Veículo */}
                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Group controlId="vehicleName">
                            <Form.Label>Nome do Veículo <span className="text-danger">*</span></Form.Label>
                            <div className="d-flex">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCar fontSize={20} color="#0070fa" />
                                    </span>
                                    <Form.Control
                                        as="select"
                                        name="vehicleName"
                                        value={formData.vehicleName}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione o nome do veículo</option>
                                    </Form.Control>
                                </div>
                                <Button
                                    variant="outline-secondary"
                                    className="px-2 border-radius-zero ms-1 links-acessos"
                                    onClick={() => setShowVehicleModal(true)}
                                >
                                    <RiAddLargeFill />
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="date">
                            <Form.Label>Encontro <span className="text-danger">*</span></Form.Label>
                            <div className="d-flex">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaCalendarAlt fontSize={20} color="#0070fa" />
                                    </span>
                                    <Form.Control
                                        type="datetime-local"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Galho */}
                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Group controlId="branch">
                            <Form.Label>Galho <span className="text-danger">*</span></Form.Label>
                            <div className="d-flex">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaMapMarkerAlt  fontSize={20} color="#0070fa" />
                                    </span>
                                    <Form.Control
                                        as="select"
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="1">Filial Principal</option>
                                    </Form.Control>
                                </div>
                            </div>
                        </Form.Group>
                    </Col>

                    {/* Categoria de Reparo */}
                    <Col xs={12} md={6}>
                        <Form.Group controlId="repairCategory">
                            <Form.Label>Categoria de Reparo <span className="text-danger">*</span></Form.Label>
                            <div className="d-flex">
                                <div className="input-group">

                                    <span className="input-group-text">
                                        <FaWrench  fontSize={20} color="#0070fa" />
                                    </span>
                                    <Form.Control
                                        as="select"
                                        name="repairCategory"
                                        value={formData.repairCategory}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">- Selecione a Categoria de Reparo -</option>
                                        <option value="breakdown">Quebra</option>
                                        <option value="booked vehicle">Veículo Agendado</option>
                                        <option value="repeat job">Trabalho Repetido</option>
                                        <option value="customer waiting">Aguardando Cliente</option>
                                        <option value="reclamação">Reclamação</option>
                                        <option value="revisão periódica">Revisão Periódica</option>
                                    </Form.Control>
                                </div>
                                <Button
                                    variant="outline-secondary"
                                    className="px-2 border-radius-zero ms-1 links-acessos"
                                    onClick={() => setShowRepairCategoryModal(true)}
                                >
                                    <RiAddLargeFill />
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>

                    {/* Tipo de Serviço */}
                    <Col xs={12} md={6}>
                        <Form.Label>Tipo de Serviço <span className="text-danger">*</span></Form.Label>
                        <div className="d-flex">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaListAlt fontSize={20} color="#0070fa" />
                                </span>
                                <div className="d-flex ms-2">
                                    <Form.Check
                                        type="radio"
                                        label="Livre"
                                        name="serviceType"
                                        value="free"
                                        checked={formData.serviceType === 'free'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Pago"
                                        name="serviceType"
                                        value="paid"
                                        checked={formData.serviceType === 'paid'}
                                        onChange={handleChange}
                                        required
                                        className="ms-3"
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>


                    {/* Taxa de Serviço */}
                    {formData.serviceType === 'paid' && (

                        <Col xs={12} md={6}>
                            <Form.Group controlId="charge">
                                <Form.Label>Taxa de Serviço ($) <span className="text-danger">*</span></Form.Label>
                                <div className="d-flex">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaDollarSign fontSize={20} color="#0070fa" />
                                        </span>
                                        <Form.Control
                                            type="number"
                                            name="charge"
                                            value={formData.charge}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </Form.Group>
                        </Col>

                    )}

                </Row>




                {/* Detalhes */}
                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Group controlId="details">
                            <Form.Label>Detalhes</Form.Label>
                            <div className="d-flex">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaInfoCircle fontSize={20} color="#0070fa" />
                                    </span>
                                    <Form.Control
                                        as="textarea"
                                        name="details"
                                        value={formData.details}
                                        onChange={handleChange}
                                        maxLength={100}
                                    />
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="title">
                            <Form.Label>Título</Form.Label>
                            <div className="d-flex">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaHeading fontSize={20} color="#0070fa" />
                                    </span>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Digite o título"
                                    />
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3 d-flex">
                    <Col xs={12} md={6}>
                        <Form.Group controlId="washBay" className="d-flex bordando">
                            <Form.Label className="me-3">Lavagem</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="washbay"
                                checked={washBayChecked}
                                onChange={handleWashBayChange}
                                style={{ height: "20px", width: "20px", marginRight: "5px" }}
                            />
                        </Form.Group>
                    </Col>

                    {/* Carga da baía de lavagem */}
                    {washBayChecked && (
                        <Col xs={12} md={6}>
                            <Form.Group controlId="washBayCharge">
                                <Form.Label>Preço de lavagem (kz)</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaTint fontSize={20} color="#0070fa" /></span>
                                    <Form.Control
                                        type="text"
                                        name="washBayCharge"
                                        placeholder="Insira o preço de lavagem"
                                        maxLength="10"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    )}
                </Row>

                {/* Teste MOT */}
                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Group controlId="motTestStatusCheckbox" className="d-flex bordando">
                            <Form.Label className="me-2">Teste MOT</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="motTestStatusCheckbox"
                                checked={motTestChecked}
                                onChange={handleMotTestChange}
                                style={{ height: "20px", width: "20px", marginRight: "5px" }}
                            />
                        </Form.Group>
                    </Col>

                    {/* Taxa de teste MOT */}
                    {motTestChecked && (
                        <> <Col xs={12} md={6}>
                            <Form.Group controlId="motTestCharge">
                                <Form.Label>Preço de teste MOT (kz)</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaTools fontSize={20} color="#0070fa" /></span>
                                    <Form.Control
                                        type="text"
                                        name="motTestCharge"
                                        placeholder="Insira o preço de teste MOT"
                                        maxLength="10"
                                    />
                                </div>
                            </Form.Group>
                        </Col>


                            <Row className="mt-5">
                                <h6>Teste MOT</h6>
                                <Accordion defaultActiveKey="0" className="bordaritem">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><FaClipboardCheck className="iconeFaq" /> <strong >Visualização de teste MOT</strong></Accordion.Header>
                                        <Accordion.Body className="textAliado" >
                                            {/**SUB Acordion */}
                                            <Accordion defaultActiveKey="0" className="bordaritem">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header><FaClipboard className="iconeFaq" /> <strong >Etapa 1: Preencher detalhes de MOT</strong></Accordion.Header>
                                                    <Accordion.Body className="textAliado" >
                                                        <div className="row text-center">
                                                            <div className="col-md-3">
                                                                <h6 className="boldFont">OK = Satisfatório</h6>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h6 className="boldFont">X = item de segurança desativado</h6>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h6 className="boldFont">R = Reparo Necessário</h6>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h6 className="boldFont">NA = Não aplicável</h6>
                                                            </div>
                                                        </div>

                                                        {/**SUBTErc Acordion */}
                                                        <Accordion defaultActiveKey="0" className="bordaritem">
                                                            <Accordion.Item eventKey="0">
                                                                <Accordion.Header><FaDoorClosed Accordion className="iconeFaq" /> <strong >Cabine Interna</strong></Accordion.Header>
                                                                <Accordion.Body className="textAliado" >
                                                                    <div className="panel-body">
                                                                        <div className="row">
                                                                            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 table-responsive">
                                                                                <table className="table">
                                                                                    <thead className="thead-dark">
                                                                                        <tr>
                                                                                            <th><b>Código</b></th>
                                                                                            <th><b>Detalhes de inspeção</b></th>
                                                                                            <th><b>Responda</b></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {[
                                                                                            { codigo: 1, inspecao: "Assentos" },
                                                                                            { codigo: 3, inspecao: "Espelhos" },
                                                                                            { codigo: 5, inspecao: "Limpadores e lavadores de para-brisa" },
                                                                                            { codigo: 7, inspecao: "Buzina" },
                                                                                            { codigo: 9, inspecao: "Controles de direção" },
                                                                                            { codigo: 11, inspecao: "Operação do freio de serviço" },
                                                                                            { codigo: 13, inspecao: "Alavanca de mão para freio mecânico" },
                                                                                            { codigo: 15, inspecao: "Pisos e degraus da cabine" },
                                                                                            { codigo: 17, inspecao: "Dispositivo antirroubo/alarme" },
                                                                                            { codigo: 19, inspecao: "Luzes internas e do painel" },
                                                                                            { codigo: 21, inspecao: "Licenças" },
                                                                                            { codigo: 23, inspecao: "Teste de bafômetro" },
                                                                                            { codigo: 25, inspecao: "Kit de primeiros socorros" },
                                                                                            { codigo: 27, inspecao: "Martelo de vidro de emergência" },
                                                                                        ].map((item) => (
                                                                                            <tr key={item.codigo}>
                                                                                                <td>{item.codigo}</td>
                                                                                                <td>{item.inspecao}</td>
                                                                                                <td>
                                                                                                    <select name={`inspecao[${item.codigo}]`} data-id={item.codigo} className="common" id={item.codigo}>
                                                                                                        <option value="ok">OK</option>
                                                                                                        <option value="x">X</option>
                                                                                                        <option value="r">R</option>
                                                                                                        <option value="na">NA</option>
                                                                                                    </select>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>

                                                                            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6">
                                                                                <table className="table">
                                                                                    <thead className="thead-dark smallDisplayTheadHiddenInsideCab">
                                                                                        <tr>
                                                                                            <th><b>Código</b></th>
                                                                                            <th><b>Detalhes de inspeção</b></th>
                                                                                            <th><b>Responda</b></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {[
                                                                                            { codigo: 2, inspecao: "Kit mãos livres" },
                                                                                            { codigo: 4, inspecao: "Vidros e visão da estrada" },
                                                                                            { codigo: 6, inspecao: "Velocímetro/Taxógrafo" },
                                                                                            { codigo: 8, inspecao: "Controles de direção" },
                                                                                            { codigo: 10, inspecao: "Pedal do freio de serviço" },
                                                                                            { codigo: 12, inspecao: "Aviso de pressão/vácuo e acumulação" },
                                                                                            { codigo: 14, inspecao: "Válvula de controle do freio operado manualmente" },
                                                                                            { codigo: 16, inspecao: "Condições do interior da cabine" },
                                                                                            { codigo: 18, inspecao: "Outros instrumentos" },
                                                                                            { codigo: 20, inspecao: "Sistema de aquecimento e desembaçamento" },
                                                                                            { codigo: 22, inspecao: "Escrita legal" },
                                                                                            { codigo: 24, inspecao: "Extintor de incêndio" },
                                                                                            { codigo: 26, inspecao: "Cintos de segurança e sistemas de retenção suplementares" },
                                                                                        ].map((item) => (
                                                                                            <tr key={item.codigo}>
                                                                                                <td>{item.codigo}</td>
                                                                                                <td>{item.inspecao}</td>
                                                                                                <td>
                                                                                                    <select name={`inspecao[${item.codigo}]`} data-id={item.codigo} className="common" id={item.codigo}>
                                                                                                        <option value="ok">OK</option>
                                                                                                        <option value="x">X</option>
                                                                                                        <option value="r">R</option>
                                                                                                        <option value="na">NA</option>
                                                                                                    </select>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Accordion>
                                                        <Accordion defaultActiveKey="0" className="bordaritem mt-4" >
                                                            <Accordion.Item eventKey="0">
                                                                <Accordion.Header><FaDoorClosed Accordion className="iconeFaq" /> <strong >Nível do solo e sob o veículo</strong></Accordion.Header>
                                                                <Accordion.Body className="textAliado" >
                                                                    <div className="panel-body">
                                                                        <div className="row">
                                                                            {/* Primeira coluna com dois itens */}
                                                                            <div className="col-md-6 col-xxl-6 col-lg-6 col-sm-12 col-xs-12 table-responsive">
                                                                                <table className="table">
                                                                                    <thead className="thead-dark">
                                                                                        <tr>
                                                                                            <th><b>Código</b></th>
                                                                                            <th><b>Detalhes de Inspeção</b></th>
                                                                                            <th><b>Responda</b></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {[
                                                                                            { codigo: 28, inspecao: "Placa de registro" },
                                                                                            { codigo: 30, inspecao: "Segurança da cabine" },
                                                                                            { codigo: 32, inspecao: "Condição da carroceria" },
                                                                                            { codigo: 34, inspecao: "Rodas e cubos" },
                                                                                            { codigo: 36, inspecao: "Roda sobressalente e suporte" },
                                                                                            { codigo: 38, inspecao: "Acoplamento veículo para reboque" }
                                                                                        ].map((item) => (
                                                                                            <tr key={item.codigo}>
                                                                                                <td>{item.codigo}</td>
                                                                                                <td>{item.inspecao}</td>
                                                                                                <td>
                                                                                                    <select name={`inspection[${item.codigo}]`} data-id={item.codigo} className="common" id={item.codigo}>
                                                                                                        <option value="ok">OK</option>
                                                                                                        <option value="x">X</option>
                                                                                                        <option value="r">R</option>
                                                                                                        <option value="na">NA</option>
                                                                                                    </select>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>

                                                                            {/* Segunda coluna com dois itens */}
                                                                            <div className="col-md-6 col-xxl-6 col-lg-6 col-sm-12 col-xs-12 table-responsive">
                                                                                <table className="table">
                                                                                    <thead className="thead-dark">
                                                                                        <tr>
                                                                                            <th><b>Código</b></th>
                                                                                            <th><b>Detalhes de Inspeção</b></th>
                                                                                            <th><b>Responda</b></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {[
                                                                                            { codigo: 40, inspecao: "Supressão de spray, asas e para-lamas" },
                                                                                            { codigo: 42, inspecao: "Fiação elétrica e equipamentos" },
                                                                                            { codigo: 44, inspecao: "Vazamentos de óleo" },
                                                                                            { codigo: 46, inspecao: "Sistema de exaustão" },
                                                                                            { codigo: 48, inspecao: "Suspensão" },
                                                                                            { codigo: 50, inspecao: "Transmissão" }
                                                                                        ].map((item) => (
                                                                                            <tr key={item.codigo}>
                                                                                                <td>{item.codigo}</td>
                                                                                                <td>{item.inspecao}</td>
                                                                                                <td>
                                                                                                    <select name={`inspection[${item.codigo}]`} data-id={item.codigo} className="common" id={item.codigo}>
                                                                                                        <option value="ok">OK</option>
                                                                                                        <option value="x">X</option>
                                                                                                        <option value="r">R</option>
                                                                                                        <option value="na">NA</option>
                                                                                                    </select>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        </Accordion>


                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion defaultActiveKey="0" className="bordaritem mt-4" >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><FaDoorClosed Accordion className="iconeFaq" /> <strong >Etapa 2: Mostrar detalhes MOT preenchidos</strong></Accordion.Header>
                                        <Accordion.Body className="textAliado">

                                            <div className="panel-body">
                                                <div className="row">
                                                    {/* Primeira coluna com dois itens */}
                                                    <div className="col-md-6 col-xxl-6 col-lg-6 col-sm-12 col-xs-12 table-responsive">
                                                        <table className="table">
                                                            <thead className="thead-dark">
                                                                <tr>
                                                                    <th><b>Código</b></th>
                                                                    <th><b>Detalhes de Inspeção</b></th>
                                                                    <th><b>Responda</b></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {[
                                                                    { codigo: 28, inspecao: "Placa de registro" },
                                                                    { codigo: 30, inspecao: "Segurança da cabine" },
                                                                    { codigo: 32, inspecao: "Condição da carroceria" },
                                                                    { codigo: 34, inspecao: "Rodas e cubos" },
                                                                    { codigo: 36, inspecao: "Roda sobressalente e suporte" },
                                                                    { codigo: 38, inspecao: "Acoplamento veículo para reboque" }
                                                                ].map((item) => (
                                                                    <tr key={item.codigo}>
                                                                        <td>{item.codigo}</td>
                                                                        <td>{item.inspecao}</td>
                                                                        <td>
                                                                            <select name={`inspection[${item.codigo}]`} data-id={item.codigo} className="common" id={item.codigo}>
                                                                                <option value="ok">OK</option>
                                                                                <option value="x">X</option>
                                                                                <option value="r">R</option>
                                                                                <option value="na">NA</option>
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/* Segunda coluna com dois itens */}
                                                    <div className="col-md-6 col-xxl-6 col-lg-6 col-sm-12 col-xs-12 table-responsive">
                                                        <table className="table">
                                                            <thead className="thead-dark">
                                                                <tr>
                                                                    <th><b>Código</b></th>
                                                                    <th><b>Detalhes de Inspeção</b></th>
                                                                    <th><b>Responda</b></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {[
                                                                    { codigo: 40, inspecao: "Supressão de spray, asas e para-lamas" },
                                                                    { codigo: 42, inspecao: "Fiação elétrica e equipamentos" },
                                                                    { codigo: 44, inspecao: "Vazamentos de óleo" },
                                                                    { codigo: 46, inspecao: "Sistema de exaustão" },
                                                                    { codigo: 48, inspecao: "Suspensão" },
                                                                    { codigo: 50, inspecao: "Transmissão" }
                                                                ].map((item) => (
                                                                    <tr key={item.codigo}>
                                                                        <td>{item.codigo}</td>
                                                                        <td>{item.inspecao}</td>
                                                                        <td>
                                                                            <select name={`inspection[${item.codigo}]`} data-id={item.codigo} className="common" id={item.codigo}>
                                                                                <option value="ok">OK</option>
                                                                                <option value="x">X</option>
                                                                                <option value="r">R</option>
                                                                                <option value="na">NA</option>
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>


                                                </div>
                                            </div>

                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                            </Row>

                        </>
                    )}
                </Row>
                <div>
                    <div className="d-flex justify-content-between">
                        <h6 className="baixarText">Notas</h6>
                        {/* Botão para adicionar nova nota */}
                        <Button className="mt-3 links-acessos border-radius-zero" onClick={handleAddNota}>
                            +
                        </Button>
                    </div>
                    <hr />
                    {dadosFormulario.notas.map((nota, index) => (
                        <div key={index} className="nota">
                            <div className="d-flex">
                                <Row>
                                    {/* Campo de Texto */}
                                    <Col md={6}>
                                        <Form.Group controlId={`nota-texto-${index}`}>
                                            <Form.Label>Nota</Form.Label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FaFileAlt fontSize={20} color="#0070fa" />
                                                </span>
                                                <Form.Control
                                                    as="textarea"
                                                    name="textoNota"
                                                    value={nota.textoNota}
                                                    onChange={(e) => handleNotaChange(index, e)}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>

                                    {/* Campo de Arquivo */}
                                    <Col md={6}>
                                        <Form.Group controlId={`nota-arquivos-${index}`}>
                                            <Form.Label>Arquivos</Form.Label>
                                            <div className="d-flex">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <FaFileUpload fontSize={20} color="#0070fa" />
                                                    </span>
                                                    <Form.Control
                                                        type="file"
                                                        name="arquivoNota"
                                                        onChange={(e) => handleNotaChange(index, e)}
                                                        multiple
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Checkboxes */}
                                <Row className="m-4">
                                    <Col>
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
                                            name="compartilhado"
                                            checked={nota.compartilhado}
                                            onChange={(e) => handleNotaChange(index, e)}
                                        />
                                    </Col>
                                </Row>

                                {/* Botão Remover Nota */}
                                <Button className="mt-2 btnAddEsp" type="button" onClick={() => handleRemoveNota(index)}>
                                    <MdDeleteForever className="links-acessos colorirBTN" fontSize={30} />
                                </Button>
                            </div>
                        </div>
                    ))}


                </div>



                <Button type="submit" className="links-acessos w-25 d-block mx-auto mt-5">Enviar</Button>
            </Form>

            {/* Modal para Adicionar Categoria de Reparo */}
            <Modal show={showRepairCategoryModal} onHide={() => setShowRepairCategoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Categoria de Reparo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="newRepairCategory">
                        <Form.Label>Nova Categoria de Reparo</Form.Label>
                        <Form.Control
                            type="text"
                            value={newRepairCategory}
                            onChange={handleRepairCategoryChange}
                            placeholder="Digite a Categoria de Reparo"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRepairCategoryModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleRepairCategorySave}>
                        Salvar Categoria
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Adicionar Cliente */}
            <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="newCustomerName">
                        <Form.Label>Nome do Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            value={newCustomerName}
                            onChange={handleCustomerNameChange}
                            placeholder="Digite o nome do cliente"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleCustomerSave}>
                        Salvar Cliente
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Adicionar Veículo */}
            <Modal show={showVehicleModal} onHide={() => setShowVehicleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Veículo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="newVehicleName">
                        <Form.Label>Nome do Veículo</Form.Label>
                        <Form.Control
                            type="text"
                            value={newVehicleName}
                            onChange={handleVehicleNameChange}
                            placeholder="Digite o nome do veículo"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowVehicleModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleVehicleSave}>
                        Salvar Veículo
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
};










export default function AddCompras() {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100 ">
                        <TopoAdmin entrada="Adicionar Cotação" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR="/cotacaoPage" />
                        <div className="vh-100 alturaPereita">
                            <FormularioCotacao />
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
