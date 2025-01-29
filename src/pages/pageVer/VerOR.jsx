import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCar, FaFilePdf, FaPrint, FaRegEdit } from 'react-icons/fa';
import { MdEditNote } from 'react-icons/md';
import { ImWhatsapp } from 'react-icons/im';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import logotipo from "../../assets/lgo.png"; // Ajuste para logo correto
import imgErro from "../../assets/error.webp"; // Imagem de erro
import imgN from "../../assets/not-found.png"; // Imagem para "não encontrado"
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoIosAdd } from 'react-icons/io';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';
import SideBar from '../../components/compenentesAdmin/SideBar';
import axios from 'axios';

const OrdemDeReparo = () => {
    const { id } = useParams(); // Obtém o ID diretamente da URL
    const [ordem, setOrdem] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [veiculo, setVeiculo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [empresaData, setEmpresaData] = useState(null);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const ordemResponse = await fetch(`http://127.0.0.1:8000/api/ordens-de-reparo/${id}`);
                const ordemData = await ordemResponse.json();
                setOrdem(ordemData);

                const clienteResponse = await fetch(`http://127.0.0.1:8000/api/clientes/${ordemData.cliente_id}`);
                const clienteData = await clienteResponse.json();
                setCliente(clienteData);

                const veiculoResponse = await fetch(`http://127.0.0.1:8000/api/veiculos/${ordemData.veiculo_id}`);
                const veiculoData = await veiculoResponse.json();
                setVeiculo(veiculoData);
                const empresaResponse = await axios.get(`http://127.0.0.1:8000/api/empresas/1`);
                setEmpresaData(empresaResponse.data);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDados();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center">
                <h4>Carregando...</h4>
                <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
            </div>
        );
    }

    if (!ordem || !cliente || !veiculo) {
        return (
            <div className="text-center">
                <h3 className="text-danger">Dados não encontrados.</h3>
                <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
            </div>
        );
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.html(document.querySelector("#productDetailsTable"), {
            callback: function (doc) {
                doc.save(`${ordem.numero_trabalho}.pdf`);
            },
            x: 10,
            y: 10,
        });
    };

    const shareOnWhatsApp = () => {
        const message = `Confira a ordem de reparação: ${ordem.numero_trabalho}\nDetalhes: ${ordem.detalhes}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="container-fl">
            <div className="d-flex">
                <div className="flexAuto w-100">
                    <div className="vh-100 alturaPereita">
                        {/* Exibir os dados da ordem de reparação */}


                        {ordem && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="topBarraVer w-100 d-flex">
                                        <div className="divFoto">
                                            <FaCar className="d-block mt-4 mx-auto" fontSize={80} color="#fff" />
                                        </div>

                                        <div className="divInfo mt-4 ms-3 text-white">
                                            <p className="fs-5 especuraTexto">
                                                Ordem de Reparação: {ordem.numero_trabalho}
                                                <span>
                                                    <FaRegEdit
                                                        fontSize={38}
                                                        className="links-acessos bg-CorNone p-2"
                                                        onClick={() => navigate(`/editarOrdemReparacao/${id}`)}
                                                    />
                                                </span>
                                            </p>
                                            <p className="ajusteParagrafo">
                                                <span className="me-2">
                                                    <strong>Status:</strong> {ordem.status}
                                                </span>
                                                <span className="ms-2">
                                                    <strong>Data de Entrada:</strong> {new Date(ordem.data_inicial_entrada).toLocaleString()}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Informações da Ordem de Reparação */}
                                <div className="visual-order mt-3 row">
                                    <h6 className="h5 fw-900">DADOS DA ORDEM DE REPARAÇÃO</h6>
                                    <hr />
                                    <div className="row pb-3">
                                        <div className="col-12 col-md-4 col-lg-3">
                                            <img src={logotipo} alt="Logotipo" className="w-100" />
                                        </div>
                                        <div className="col-12 col-md-4 col-lg-6">
                                            <h5 className="fw-bold">{empresaData.nome_empresa}</h5>
                                            <span className="d-block">{empresaData.nif_empresa}</span>
                                            <span className="d-block">{empresaData.rua}, {empresaData.bairro}, {empresaData.municipio}</span>
                                            <span className="d-block">Email: {empresaData.email} - Fone: {empresaData.telefone}</span>
                                            <span className="d-block">
                                                <b>Site:</b>
                                                <a href={empresaData.site_empresa} className="text-black" target="_blank" rel="noopener noreferrer">
                                                    {empresaData.site_empresa}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="col-12 col-md-4 col-lg-3">
                                            <span className="d-block"><b>Nº OR:</b> {ordem.numero_trabalho}</span>
                                            <span className="d-block"><b>Emissão:</b> {new Date().toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    {/* Dados da Ordem */}
                                    <h6 className="h5emGe text-uppercase fw-bold">Informações da Ordem de Reparação</h6>
                                    <table className="table table-bordered mt-4">
                                        <thead>
                                            <tr>
                                                <th>Campo</th>
                                                <th>Detalhes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ordem.numero_trabalho && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Número da Ordem</td>
                                                    <td className="sizelinha">{ordem.numero_trabalho}</td>
                                                </tr>
                                            )}
                                            {ordem.categoria_reparo && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Categoria de Reparação</td>
                                                    <td className="sizelinha">{ordem.categoria_reparo}</td>
                                                </tr>
                                            )}
                                            {ordem.km_entrada && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">KM Entrada</td>
                                                    <td className="sizelinha">{ordem.km_entrada}</td>
                                                </tr>
                                            )}
                                            {ordem.cobrar_reparo && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Valor Reparação</td>
                                                    <td className="sizelinha">{ordem.cobrar_reparo}</td>
                                                </tr>
                                            )}
                                            {ordem.status && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Status</td>
                                                    <td className="sizelinha">{ordem.status}</td>
                                                </tr>
                                            )}
                                            {ordem.garantia_dias && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Garantia (Dias)</td>
                                                    <td className="sizelinha">{ordem.garantia_dias}</td>
                                                </tr>
                                            )}
                                            {ordem.data_inicial_entrada && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Data Inicial de Entrada</td>
                                                    <td className="sizelinha">{new Date(ordem.data_inicial_entrada).toLocaleString()}</td>
                                                </tr>
                                            )}
                                            {ordem.data_final_saida && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Data Final de Saída</td>
                                                    <td className="sizelinha">{new Date(ordem.data_final_saida).toLocaleString()}</td>
                                                </tr>
                                            )}
                                            {ordem.detalhes && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Detalhes</td>
                                                    <td className="sizelinha">{ordem.detalhes} </td>
                                                </tr>
                                            )}
                                            {ordem.defeito_ou_servico && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Defeito ou Serviço</td>
                                                    <td className="sizelinha">{ordem.defeito_ou_servico}</td>
                                                </tr>
                                            )}
                                            {ordem.observacoes && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Observações</td>
                                                    <td className="sizelinha">{ordem.observacoes}</td>
                                                </tr>
                                            )}
                                            {ordem.laudo_tecnico && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Avaliação Técnica</td>
                                                    <td className="sizelinha">{ordem.laudo_tecnico}</td>
                                                </tr>
                                            )}
                                            {ordem.lavagem !== undefined && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Lavagem Realizada</td>
                                                    <td className="sizelinha">{ordem.lavagem ? 'Sim' : 'Não'}</td>
                                                </tr>
                                            )}
                                            {ordem.cobrar_lavagem && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Cobrar Lavagem</td>
                                                    <td className="sizelinha">{ordem.cobrar_lavagem}</td>
                                                </tr>
                                            )}
                                            {ordem.status_test_mot !== undefined && (
                                                <tr>
                                                    <td className="fw-bold sizelinha">Status de Teste de Motor</td>
                                                    <td className="sizelinha">{ordem.status_test_mot ? 'Aprovado' : 'Não Aprovado'}</td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>



                                    {/* Dados do Cliente */}
                                    <div className="ro p-0">
                                        <div className="col-12  col-12 col-md-12 col-lg-12 ">

                                            <h6 className="h5emGe text-uppercase fw-bold">Informações do Cliente</h6>

                                            <div className="border p-2">
                                                <p><strong>Nome:</strong> {cliente.primeiro_nome} {cliente.sobrenome}</p>
                                                <p><strong>Celular:</strong> {cliente.celular}</p>
                                                <p><strong>Email:</strong> {cliente.email}</p>
                                                <p><strong>Endereço:</strong> {cliente.endereco}</p>
                                            </div>

                                        </div>


                                        <div className="col-12 col-md-12 col-lg-12 p-0">

                                            {/*<h6 className="text-uppercase fw-bold">RESPONSÁVEL</h6>
                                            <div className="border p-2">
                                                <span className='d-block sizeSpan mt-3'><b>Nome:</b></span>
                                                <span className='d-block sizeSpan mt-3'><b>Email:</b></span>
                                                <span className='d-block sizeSpan mt-3'><b>Telefone:</b></span>
                                            </div>*/}


                                        </div>
                                    </div>
                                    {/* Dados do Veículo */}
                                    <div className=" p-0 mt-3">
                                        <h6 className="h5emG text-uppercase fw-bold">Informações do Veículo</h6>

                                        <div className="border p-2 col-lg-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><strong>Marca e Modelo:</strong> {veiculo.marca_veiculo} {veiculo.modelo_veiculo}</p>
                                                    <p><strong>Ano Modelo:</strong> {veiculo.ano_modelo}</p>
                                                    <p><strong>Placa:</strong> {veiculo.numero_placa}</p>
                                                    <p><strong>Combustível:</strong> {veiculo.combustivel}</p>
                                                    <p><strong>Leitura Odômetro:</strong> {veiculo.leitura_odometro}</p>
                                                    <p><strong>Preço:</strong> {veiculo.preco}</p>
                                                    <p><strong>Equipamento:</strong> {veiculo.numero_equipamento}</p>
                                                    <p><strong>Data de Fabricação:</strong> {new Date(veiculo.data_fabricacao).toLocaleDateString()}</p>
                                                    <p><strong>Caixa de Velocidade:</strong> {veiculo.caixa_velocidade}</p>
                                                 

                                                </div>
                                                <div className="col-md-6">

                                                     <p><strong>Número da Caixa:</strong> {veiculo.numero_caixa}</p>
                                                    <p><strong>Número do Motor:</strong> {veiculo.numero_motor}</p>
                                                    <p><strong>Tamanho do Motor:</strong> {veiculo.tamanho_motor}</p>
                                                    <p><strong>Número da Chave:</strong> {veiculo.numero_chave}</p>
                                                    <p><strong>Motor:</strong> {veiculo.motor}</p>
                                                    <p><strong>Número do Chassi:</strong> {veiculo.numero_chassi}</p>
                                                    <p><strong>Descrição:</strong> {veiculo.descricao}</p>
                                                    <p><strong>Cor:</strong> {veiculo.cor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Ações */}
                                    <div className="d-flex justify-content-end mt-4">
                                        <div className="ms-2">
                                            <Button variant="outline-secondary" onClick={() => window.print()}>
                                                <FaPrint className="me-2" fontSize={20} />
                                                Imprimir
                                            </Button>
                                        </div>
                                        <div className="ms-2">
                                            <Button variant="outline-danger" onClick={generatePDF}>
                                                <FaFilePdf className="me-2" fontSize={20} />
                                                Gerar PDF
                                            </Button>
                                        </div>
                                        <div className="ms-2">
                                            <Button variant="primary" className="links-acessos" onClick={() => navigate(`/editarOrdemReparacao/${id}`)}>
                                                <MdEditNote fontSize={24} />
                                                Editar Ordem
                                            </Button>
                                        </div>
                                        <div className="ms-2">
                                            <Button variant="success" onClick={shareOnWhatsApp}>
                                                <ImWhatsapp /> Compartilhar no WhatsApp
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};



const OrdemReparacao = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100">
                        <TopoAdmin
                            entrada="  Dados da Ordem de Reparação"
                            leftSeta={<FaArrowLeftLong />}
                            icone={<IoIosAdd />}
                            leftR="/listarOrdemServico"
                        />
                        <div className="vh-100 alturaPereita">
                            <OrdemDeReparo />
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
        </>
    );
};

export default OrdemReparacao;
