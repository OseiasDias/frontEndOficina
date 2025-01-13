import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Para fazer a requisição à API
import "../../css/StylesAdmin/homeAdministrador.css";
import { FaCar, FaFilePdf, FaPrint } from "react-icons/fa";
import { FaRegEdit } from 'react-icons/fa';
import imgN from "../../assets/not-found.png"; // Imagem para o estado de "não encontrado"
import imgErro from "../../assets/error.webp"; // Imagem para o estado de erro
import SideBar from '../../components/compenentesAdmin/SideBar';
import TopoAdmin from '../../components/compenentesAdmin/TopoAdmin';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoIosAdd } from 'react-icons/io';
import { Button } from 'react-bootstrap';
import { MdEditNote } from 'react-icons/md';
import jsPDF from 'jspdf';
import { ImWhatsapp } from 'react-icons/im';
import logotipo from "../../assets/lgo.png"; // Imagem para o estado de "não encontrado"



export function VerOrdemReparacao() {
    const { id } = useParams(); // Captura o id da URL
    const [ordemData, setOrdemData] = useState(null); // Estado para armazenar os dados da ordem de reparação
    const [veiculoData, setVeiculoData] = useState(null); // Estado para armazenar os dados do veículo
    const [clienteData, setClienteData] = useState(null); // Estado para armazenar os dados do cliente (dono)
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const navigate = useNavigate(); // Navegação após sucesso
    const [empresaData, setEmpresaData] = useState(null);

    const [dataHoraAtual, setDataHoraAtual] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        setDataHoraAtual(formattedDate);
    }, []);  // Chamado apenas uma vez ao carregar o componente




    // Função para buscar os dados da ordem de reparação com o id
    const fetchOrdemData = async () => {
        try {
            setLoading(true); // Inicia o carregamento
            const response = await axios.get(`http://127.0.0.1:8000/api/ordens-de-servico/${id}`);
            if (response.status === 200) {
                setOrdemData(response.data); // Armazenar os dados da ordem de reparação no estado

                // Buscar os dados do veículo relacionado
                const veiculoResponse = await axios.get(`http://127.0.0.1:8000/api/veiculos/${response.data.vhi_id}`);
                setVeiculoData(veiculoResponse.data); // Armazenar os dados do veículo no estado

                // Buscar os dados do cliente relacionado
                const clienteResponse = await axios.get(`http://127.0.0.1:8000/api/clientes/${response.data.cust_id}`);
                setClienteData(clienteResponse.data); // Armazenar os dados do cliente no estado
                const empresaResponse = await axios.get(`http://127.0.0.1:8000/api/empresas/1`);
                setEmpresaData(empresaResponse.data);
            } else {
                setError('Ordem de reparação não encontrada!');
            }
        } catch (error) {
            console.error("Erro ao carregar dados da ordem de reparação", error); // Log do erro no console
            setError('Erro ao carregar os dados da ordem de reparação.'); // Mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    useEffect(() => {
        fetchOrdemData(); // Chama a função para buscar os dados quando o componente for montado
    }, [id]); // Dependência para que a requisição seja feita sempre que o id mudar

    // Verifica se os dados estão sendo carregados ou se ocorreu algum erro
    if (loading) {
        return (
            <div className="text-center">
                <h4>Carregando...</h4>
                <img src={imgN} alt="Carregando" className="w-75 d-block mx-auto" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <h3 className="text-danger">{error}</h3>
                <img src={imgErro} alt="Erro" className="w-50 d-block mx-auto" />
            </div>
        );
    }

    const handleViewEdit = (id) => {
        // Redireciona para a rota de edição passando o ID
        navigate(`/editarOrdemReparacao/${id}`);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.html(document.querySelector("#productDetailsTable"), {
            callback: function (doc) {
                doc.save(`${ordemData.jobno}.pdf`);
            },
            x: 10,
            y: 10,
        });
    };

    const shareOnWhatsApp = () => {
        const message = `Confira a ordem de reparação: ${ordemData.jobno}\nDetalhes: ${ordemData.defeito_ou_servico}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };




    return (
        <div className="container-fl">
            <div className="d-flex">
                <div className="flexAuto w-100">
                    <div className="vh-100 alturaPereita">
                        {/* Exibir os dados da ordem de reparação */}
                        {ordemData && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="topBarraVer w-100 d-flex">
                                        <div className="divFoto">
                                            <FaCar className="d-block mt-4 mx-auto" fontSize={80} color="#fff" />
                                        </div>

                                        <div className="divInfo mt-4 ms-3 text-white">
                                            <p className="fs-5 especuraTexto">
                                                Ordem de Reparação: {ordemData.jobno}
                                                <span>
                                                    <FaRegEdit
                                                        fontSize={38}
                                                        className="links-acessos bg-CorNone p-2"
                                                        onClick={() => handleViewEdit(id)}
                                                    />
                                                </span>
                                            </p>
                                            <p className="ajusteParagrafo">
                                                <span className="me-2">
                                                    <strong>Status:</strong> {ordemData.status}
                                                </span>
                                                <span className="ms-2">
                                                    <strong>Data de Entrada:</strong> {ordemData.data_inicial_entrada}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="visual-order row">
                                    {/* Tabela para exibir os dados da ordem de reparação */}

                                    <h6 className="h5 fw-900">DADOS DA ORDEM DE REPARAÇÃO</h6>
                                    <hr />
                                    <div className="row pb-3">
                                        <div className="imagem col-12 col-md-4 col-lg-3">
                                            <img src={logotipo} alt="logotipo biturbo" className='w-100' />
                                        </div>
                                        <div className="imagem col-12 col-md-4 col-lg-6">
                                            <h5 className='fw-bold'>{empresaData.nome_empresa}</h5>
                                            <span className='d-block tamanhoSpan'>{empresaData.nif_empresa}</span>
                                            <span className='d-block tamanhoSpan'>{empresaData.rua}, {empresaData.bairro}, {empresaData.municipio}</span>
                                            <span className='d-block tamanhoSpan'>Email: {empresaData.email} - Fone: {empresaData.telefone} </span>
                                            <span className='d-block tamanhoSpan'><b>Site:</b><a href={empresaData.site_empresa} className="text-black" target="_blank" rel="noopener noreferrer">{empresaData.site_empresa}</a></span>
                                        </div>
                                        <div className="imagem col-12 col-md-4 col-lg-3">
                                            <span className='d-block sizeSpan mt-3'><b>Nº OR:</b> 0{ordemData.id}</span>
                                            <span className='d-block sizeSpan mt-1'><b>Emissão:</b> {dataHoraAtual}</span>


                                        </div>
                                    </div>
                                    <hr />
                                    {/* Informações do cliente */}
                                    <div className="user-details">

                                        {clienteData && (
                                            <div className="row">
                                                <div className="col-12 col-md-6 col-lg-6">
                                                    <h6 className="text-uppercase fw-bold">Informações do Cliente</h6>
                                                    <div className="borde pb-3">
                                                        <span className='d-block sizeSpan mt-3'><b>Nome:</b>{clienteData.nome_exibicao}  {clienteData.primeiro_nome}</span>
                                                        <span className='d-block sizeSpan mt-3'><b>Email:</b> {clienteData.email}</span>
                                                        <span className='d-block sizeSpan mt-3'><b>Telefone:</b> {clienteData.celular}</span>
                                                        <span className='d-block sizeSpan mt-3'><b>Endereço:</b> {clienteData.endereco}</span>

                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-6">
                                                    {/**  <div className="borde pb-3">
                                                    <h6 className="text-uppercase fw-bold">RESPONSÁVEL</h6>
                                                        <span className='d-block sizeSpan mt-3'><b>Nome:</b>{clienteData.nome_exibicao}  {clienteData.primeiro_nome}</span>
                                                        <span className='d-block sizeSpan mt-3'><b>Email:</b> {clienteData.email}</span>
                                                        <span className='d-block sizeSpan mt-3'><b>Telefone:</b> {clienteData.celular}</span>

                                                    </div>*/}
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                    <hr />


                                    <h6 className="h5emGe text-uppercase fw-bold">Informações da Ordem de Reparação</h6>
                                    <table className="table table-bordered mt-4">
                                        <thead>
                                            <tr>
                                                <th>Campo</th>
                                                <th>Detalhes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='fw-bold sizelinha'>Defeito ou Serviço</td>
                                                <td className='sizelinha'>{ordemData.defeito_ou_servico}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold sizelinha'>Detalhes</td>
                                                <td className='sizelinha'>{ordemData.details} </td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold sizelinha'>Garantia (dias)</td>
                                                <td className='sizelinha'>{ordemData.garantia_dias}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold sizelinha'>Observações</td>
                                                <td className='sizelinha'>{ordemData.observacoes}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold sizelinha'>Laudo Técnico</td>
                                                <td className='sizelinha'>{ordemData.laudo_tecnico}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold sizelinha'>Data Final de Saída</td>
                                                <td className='sizelinha'>{ordemData.data_final_saida}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold sizelinha'>Km Entrada</td>
                                                <td className='sizelinha'>{ordemData.km_entrada}</td>
                                            </tr>
                                            <tr className='fw-bold sizelinha'>
                                                <td>Charge Required</td>
                                                <td className='sizelinha'>{ordemData.charge_required}</td>
                                            </tr>
                                        </tbody>
                                    </table>


                                    {/* Informações do veículo */}
                                    <h6 className="h5e text-uppercase fw-bold">Informações do Veículo</h6>
                                    <hr />
                                    {veiculoData && (
                                        <div className="">
                                            
                                            <div className="row">
                                                <span className='col-6 col-md-4 col-lg-3 sizeSpan mt-3'><b>Marca:</b> {veiculoData.marca_veiculo}</span>
                                                <span className='col-6 col-md-4 col-lg-3  sizeSpan mt-3'><b>Modelo:</b> {veiculoData.modelo_veiculo}</span>
                                                <span className='col-6 col-md-4 col-lg-3  sizeSpan mt-3'><b>Placa:</b> {veiculoData.numero_placa}</span>
                                                <span className='col-6 col-md-4 col-lg-3  sizeSpan mt-3'><b>Combustível:</b> {veiculoData.combustivel}</span>
                                                <span className='col-6 col-md-4 col-lg-3  sizeSpan mt-3'><b>Ano Modelo:</b> {veiculoData.ano_modelo}</span>
                                                <span className='col-6 col-md-4 col-lg-3  sizeSpan mt-3'><b>Leitura Odômetro:</b> {veiculoData.leitura_odometro}</span>
                                                <span className='col-6 col-md-4 col-lg-3  sizeSpan mt-3'><b>Caixa de Velocidade:</b> {veiculoData.caixa_velocidade}</span>
                                                <span className='col-12 border py-3 col-md-12 col-lg-12 sizeSpan mt-3'><b>Descrição:</b> {veiculoData.descricao}</span>

                                                <h5 className='col-12 text-end col-md-12 col-lg-12   mt-3'><b>Preço:</b> {veiculoData.preco} Kz</h5>

                                            </div>
                                        </div>
                                    )}


                                    {/* Informações da empresa */}



                                    <div className="d-flex justify-content-end mt-4">
                                        {/* Botões: Imprimir, Gerar PDF, Editar e WhatsApp */}
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
                                            <Button variant="primary" className='links-acessos' onClick={() => navigate(`/editarOrdemReparacao/${ordemData.id}`)}>
                                                <MdEditNote fontSize={24} />
                                                Editar Ordem
                                            </Button>
                                        </div>
                                        <div className="ms-2">
                                            <Button variant="success" onClick={shareOnWhatsApp}>
                                                <ImWhatsapp />  Compartilhar no WhatsApp
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
}


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
                            <VerOrdemReparacao />
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

