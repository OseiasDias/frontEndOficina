/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useParams e useNavigate para capturar o id da URL e fazer navegação
import axios from 'axios'; // Para fazer a requisição à API
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong, FaUserGear } from "react-icons/fa6";
import { FaEnvelopeOpenText, FaMapMarkerAlt, FaRegEdit } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import imgN from "../../assets/not-found.png"; // Imagem para o estado de "não encontrado"
import imgErro from "../../assets/error.webp"; // Imagem para o estado de erro

export function VerCliente() {
    const { id } = useParams(); // Captura o id da URL
    const [clienteData, setClienteData] = useState(null); // Estado para armazenar os dados do cliente
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const navigate = useNavigate(); // Navegação após sucesso

    // Função para buscar os dados do cliente com o id
    const fetchClienteData = async () => {
        try {
            setLoading(true); // Inicia o carregamento
            const response = await axios.get(`http://127.0.0.1:8000/api/clientes/${id}`);
            setClienteData(response.data); // Armazenar os dados do cliente no estado
        } catch (error) {
            setError('Erro ao carregar os dados do cliente.'); // Mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    useEffect(() => {
        fetchClienteData(); // Chama a função para buscar os dados quando o componente for montado
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
        // Redireciona para a rota de visualização passando o ID
        navigate(`/editarCliente/${id}`);
    };

    return (
        <div className="contain">
            <div className="d-flex">
                <div className="flexAuto w-100">
                    <div className="vh-100 alturaPereita">
                        {/* Exibir os dados do cliente */}
                        {clienteData && (
                            <>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="topBarraVer w-100 d-flex">
                                            <div className="divFoto">
                                                <FaUserGear className="d-block mt-4 mx-auto" fontSize={80} color="#fff" />
                                            </div>

                                            <div className="divInfo mt-4 ms-3 text-white">
                                                <p className="fs-5 especuraTexto">
                                                    {clienteData.primeiro_nome} {clienteData.sobrenome}{" "}
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
                                                        <IoCall fontSize={18} /> {clienteData.telefone_fixo}
                                                    </span>
                                                    <span className="ms-2">
                                                        <FaEnvelopeOpenText fontSize={17} className="me-2" />
                                                        {clienteData.email}
                                                    </span>
                                                </p>
                                                <p className="ajusteParagrafo">
                                                    <span className="ms-1">
                                                        <FaMapMarkerAlt fontSize={18} className="me-2" />
                                                        {clienteData.endereco}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-details">
                                    <h6 className="h5emGeral px-2">EM GERAL</h6>

                                    <div className="col-lg-9 d-flex justify-content-between">
                                        <p>
                                            Nome Completo <br />
                                            <b>
                                                {clienteData.primeiro_nome} {clienteData.sobrenome}
                                            </b>
                                        </p>
                                        <p>
                                            Nome Exibido <br />
                                            <b>{clienteData.nome_exibicao}</b>
                                        </p>
                                        <p>
                                            Empresa <br />
                                            <b>{clienteData.nome_empresa}</b>
                                        </p>
                                    
                                        
                                        <p>
                                            NIF <br />
                                            <b>{clienteData.nif}</b>
                                        </p>
                                    </div>

                                    <div className="user-info row">
                                        {/* Informações de contato */}
                                        <section className="section col-lg-4 mb-3">
                                            <div className="border p-3">
                                                <h6>Informações de Contato</h6>
                                                <p>
                                                    <b>Email:</b> {clienteData.email}
                                                </p>
                                                <p>
                                                    <b>Telefone Fixo:</b> {clienteData.telefone_fixo}
                                                </p>
                                                <p>
                                                    <b>Celular:</b> {clienteData.celular}
                                                </p>
                                                <p>
                                                    <b>Data de Nascimento:</b> {new Date(clienteData.data_nascimento).toLocaleDateString()}
                                                </p>
                                            <p>
                                                    <b>Gênero:</b> {clienteData.genero}
                                                </p>
                                            
                                            </div>
                                        </section>

                                        {/* Informações de Endereço */}
                                        <section className="section col-lg-4 mb-3">
                                            <div className="border p-3">
                                                <h6>Informações de Endereço</h6>
                                                <p>
                                                    <b>Endereço:</b> {clienteData.endereco}
                                                </p>
                                                <p>
                                                    <b>Município:</b> {clienteData.municipio}
                                                </p>
                                                <p>
                                                    <b>Província:</b> {clienteData.id_provincia}
                                                </p>
                                            </div>
                                        </section>

                                        {/* Localização */}
                                        <section className="section col-lg-4 mb-3">
                                            <div className="border p-3">
                                                <h6>Localização</h6>
                                                <p>
                                                    <b>País:</b> {clienteData.id_pais}
                                                </p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const Cliente = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100">
                        <TopoAdmin
                            entrada="  Dados do Cliente"
                            leftSeta={<FaArrowLeftLong />}
                            icone={<IoIosAdd />}
                            leftR="/clienteList"
                        />
                        <div className="vh-100 alturaPereita">
                            <VerCliente />
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

export default Cliente;
