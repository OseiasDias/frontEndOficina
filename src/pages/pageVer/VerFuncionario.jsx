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

export function VerFuncionario() {
    const { id } = useParams(); // Captura o id da URL
    const [funcionarioData, setFuncionarioData] = useState(null); // Estado para armazenar os dados do funcionário
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const navigate = useNavigate(); // Navegação após sucesso

    // Função para buscar os dados do funcionário com o id
    const fetchFuncionarioData = async () => {
        try {
            setLoading(true); // Inicia o carregamento
            const response = await axios.get(`http://127.0.0.1:8000/api/funcionarios/${id}`);
            setFuncionarioData(response.data); // Armazenar os dados do funcionário no estado
        } catch (error) {
            setError('Erro ao carregar os dados do funcionário.'); // Mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    useEffect(() => {
        fetchFuncionarioData(); // Chama a função para buscar os dados quando o componente for montado
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
        navigate(`/editarFuncionario/${id}`);
    };

    return (
        <div className="contain">
            <div className="d-flex">
                <div className="flexAuto w-100">
                    <div className="vh-100 alturaPereita">
                        {/* Exibir os dados do funcionário */}
                        {funcionarioData && (
                            <>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="topBarraVer w-100 d-flex">
                                            <div className="divFoto">
                                                <FaUserGear className="d-block mt-4 mx-auto" fontSize={80} color="#fff" />
                                            </div>

                                            <div className="divInfo mt-4 ms-3 text-white">
                                                <p className="fs-5 especuraTexto">
                                                    {funcionarioData.nome} {funcionarioData.sobrenome}{" "}
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
                                                        <IoCall fontSize={18} /> {funcionarioData.telefone_fixo}
                                                    </span>
                                                    <span className="ms-2">
                                                        <FaEnvelopeOpenText fontSize={17} className="me-2" />
                                                        {funcionarioData.email}
                                                    </span>
                                                </p>
                                                <p className="ajusteParagrafo">
                                                    <span className="ms-1">
                                                        <FaMapMarkerAlt fontSize={18} className="me-2" />
                                                        {funcionarioData.endereco}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-details">
                                    <h6 className="h5emGeral px-2">INFORMAÇÕES GERAIS</h6>

                                    <div className="col-lg-10 d-flex justify-content-between">
                                        <p>
                                            Nome Completo <br />
                                            <b>
                                                {funcionarioData.nome} {funcionarioData.sobrenome}
                                            </b>
                                        </p>
                                        <p>
                                            Nome Exibido <br />
                                            <b>{funcionarioData.nome_exibicao}</b>
                                        </p>
                                        <p>
                                            Cargo <br />
                                            <b>{funcionarioData.cargo}</b>
                                        </p>
                                        <p>
                                            Filial <br />
                                            <b>{funcionarioData.filial}</b>
                                        </p>
                                       
                                    </div>

                                    <div className="user-info row">
                                        {/* Informações de contato */}
                                        <section className="section col-lg-4">
                                            <div className="border p-3">
                                                <h6>Informações de Funcionário</h6>
                                                <p>
                                                    <b>Email:</b> {funcionarioData.email}
                                                </p>
                                                <p>
                                                    <b>Telefone Fixo:</b> {funcionarioData.telefone_fixo}
                                                </p>
                                                <p>
                                                    <b>Celular:</b> {funcionarioData.celular}
                                                </p>
                                                <p>
                                                    <b>Data de Nascimento:</b> {new Date(funcionarioData.data_nascimento).toLocaleDateString()}
                                                </p>
                                                <p>
                                                    <b> Data de Admissão:</b> {new Date(funcionarioData.data_admissao).toLocaleDateString()}
                                                </p>
                                                <p>
                                                    <b> Gênero:</b> {funcionarioData.genero}
                                                </p>

                                           
                                     
                                            </div>
                                        </section>

                                        {/* Informações de Endereço */}
                                        <section className="section col-lg-4">
                                            <div className="border p-3">
                                                <h6>Informações de Endereço</h6>
                                                <p>
                                                    <b>Endereço:</b> {funcionarioData.endereco}
                                                </p>
                                                <p>
                                                    <b>Cidade:</b> {funcionarioData.cidade}
                                                </p>
                                                <p>
                                                    <b>Estado:</b> {funcionarioData.estado}
                                                </p>
                                                <p>
                                                    <b>País:</b> {funcionarioData.pais}
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

const Funcionario = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100">
                        <TopoAdmin
                            entrada="  Dados do Funcionário"
                            leftSeta={<FaArrowLeftLong />}
                            icone={<IoIosAdd />}
                            leftR="/funcionariosList"
                        />
                        <div className="vh-100 alturaPereita">
                            <VerFuncionario />
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

export default Funcionario;
