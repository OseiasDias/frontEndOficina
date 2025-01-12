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



export function VerOrdemReparacao() {
    const { id } = useParams(); // Captura o id da URL
    const [ordemData, setOrdemData] = useState(null); // Estado para armazenar os dados da ordem de reparação
    const [veiculoData, setVeiculoData] = useState(null); // Estado para armazenar os dados do veículo
    const [clienteData, setClienteData] = useState(null); // Estado para armazenar os dados do cliente (dono)
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const navigate = useNavigate(); // Navegação após sucesso
    const [empresaData, setEmpresaData] = useState(null);


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
                                    
                                    <h6 className="h5emGeral px-2">Informações da Empresa</h6>
                                    {empresaData && (
                                        <div className="col-lg-4">
                                            <div className="border p-3">
                                                <p><strong>Nome da Empresa:</strong> {empresaData.nome_empresa}</p>
                                                <p><strong>NIF:</strong> {empresaData.nif_empresa}</p>
                                                <p><strong>Tipo de Empresa:</strong> {empresaData.tipo_empresa}</p>
                                                <p><strong>Setor:</strong> {empresaData.setor_empresa}</p>
                                                <p><strong>Telefone:</strong> {empresaData.telefone}</p>
                                                <p><strong>Email:</strong> {empresaData.email}</p>
                                                <p><strong>Endereço:</strong> {empresaData.rua}, {empresaData.bairro}, {empresaData.municipio}</p>
                                                <p><strong>Site:</strong> <a href={empresaData.site_empresa} className="text-black" target="_blank" rel="noopener noreferrer">{empresaData.site_empresa}</a></p>
                                                <p><strong>Data de Criação:</strong> {empresaData.data_criacao}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <h6 className="h5emGeral px-2">Informações da Ordem de Reparação</h6>
                                    <table className="table table-bordered mt-4">
                                        <thead>
                                            <tr>
                                                <th>Campo</th>
                                                <th>Detalhes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Defeito ou Serviço</td>
                                                <td>{ordemData.defeito_ou_servico}</td>
                                            </tr>
                                            <tr>
                                                <td>Detalhes</td>
                                                <td>{ordemData.details}</td>
                                            </tr>
                                            <tr>
                                                <td>Garantia (dias)</td>
                                                <td>{ordemData.garantia_dias}</td>
                                            </tr>
                                            <tr>
                                                <td>Observações</td>
                                                <td>{ordemData.observacoes}</td>
                                            </tr>
                                            <tr>
                                                <td>Laudo Técnico</td>
                                                <td>{ordemData.laudo_tecnico}</td>
                                            </tr>
                                            <tr>
                                                <td>Data Final de Saída</td>
                                                <td>{ordemData.data_final_saida}</td>
                                            </tr>
                                            <tr>
                                                <td>Km Entrada</td>
                                                <td>{ordemData.km_entrada}</td>
                                            </tr>
                                            <tr>
                                                <td>Charge Required</td>
                                                <td>{ordemData.charge_required}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Informações do cliente */}
                                    <div className="user-details">
                                        <h6 className="h5emGeral px-2">Informações do Cliente</h6>
                                        {clienteData && (
                                            <div className="col-lg-4">
                                                <div className="border p-3">
                                                    <p><strong>Nome:</strong> {clienteData.nome_exibicao}</p>
                                                    <p><strong>Primeiro Nome:</strong> {clienteData.primeiro_nome}</p>
                                                    <p><strong>Sobrenome:</strong> {clienteData.sobrenome}</p>
                                                    <p><strong>Data de Nascimento:</strong> {clienteData.data_nascimento}</p>
                                                    <p><strong>Email:</strong> {clienteData.email}</p>
                                                    <p><strong>Telefone Fixo:</strong> {clienteData.telefone_fixo}</p>
                                                    <p><strong>Celular:</strong> {clienteData.celular}</p>
                                                    <p><strong>Endereço:</strong> {clienteData.endereco}</p>
                                                    <p><strong>Empresa:</strong> {clienteData.nome_empresa}</p>
                                                    <p><strong>NIF:</strong> {clienteData.nif}</p>
                                                    <img src={clienteData.foto} alt="Foto do Cliente" className="img-fluid" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Informações do veículo */}
                                    <h6 className="h5emGeral px-2">Informações do Veículo</h6>
                                    {veiculoData && (
                                        <div className="col-lg-4">
                                            <div className="border p-3">
                                                <p><strong>Marca:</strong> {veiculoData.marca_veiculo}</p>
                                                <p><strong>Modelo:</strong> {veiculoData.modelo_veiculo}</p>
                                                <p><strong>Placa:</strong> {veiculoData.numero_placa}</p>
                                                <p><strong>Combustível:</strong> {veiculoData.combustivel}</p>
                                                <p><strong>Ano Modelo:</strong> {veiculoData.ano_modelo}</p>
                                                <p><strong>Leitura Odômetro:</strong> {veiculoData.leitura_odometro}</p>
                                                <p><strong>Caixa de Velocidade:</strong> {veiculoData.caixa_velocidade}</p>
                                                <p><strong>Preço:</strong> {veiculoData.preco}</p>
                                                <p><strong>Descrição:</strong> {veiculoData.descricao}</p>
                                                <img src={veiculoData.imagens[0]} alt="Imagem do Veículo" className="img-fluid" />
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
                                            <Button variant="primary" onClick={() => navigate(`/editarOrdemReparacao/${ordemData.id}`)}>
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
                            entrada="Dados da Ordem de Reparação"
                            leftSeta={<FaArrowLeftLong />}
                            icone={<IoIosAdd />}
                            leftR="/ordensDeReparacaoPageItens"
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

