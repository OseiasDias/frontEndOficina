/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams para capturar o id da URL
import axios from 'axios'; // Para fazer a requisição à API
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong, FaUserGear } from "react-icons/fa6";
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaEnvelopeOpenText, FaMapMarkerAlt, FaRegEdit } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import imgN from "../../assets/not-found.png"; // Imagem para o estado de "não encontrado"
import imgErro from "../../assets/error.webp"; // Imagem para o estado de erro

const API_URL = import.meta.env.VITE_API_URL;




export  function VerEquipeSuporte() {
    const { id } = useParams(); // Captura o id da URL
    const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Navegação após sucesso


    // Função para buscar os dados do usuário com o id
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_URL}/equipe-suporte/${id}`);
            setUserData(response.data); // Armazenar os dados do usuário no estado
        } catch (error) {
            setError('Erro ao carregar os dados do usuário.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData(); // Chama a função para buscar os dados quando o componente for montado
    }, [id]);

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
        navigate(`/editarBlog/${id}`);
    };

    return (
        <div className="container-flu">
           
           
                    <div className="vh-100 alturaPereita">
                        {/* Exibir os dados do usuário */}
                        {userData && (

                            <>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="topBarraVer w-100 d-flex">
                                            <div className="divFoto">
                                                <FaUserGear className='d-block mt-4 mx-auto' fontSize={80} color='#fff' />
                                            </div>

                                            <div className="divInfo mt-4 ms-3 text-white">
                                                <p className='fs-5 especuraTexto'> {userData.nome_exibicao} {userData.sobrenome} <span><FaRegEdit fontSize={38} className='links-acessos bg-CorNone p-2'
                                                
                                                                                            onClick={() => handleViewEdit(id)} /></span></p>
                                                <p className='ajusteParagrafo'> <span className='me-2'><IoCall fontSize={18} /> {userData.telefone_fixo}</span>
                                                    <span className='ms-2' ><FaEnvelopeOpenText fontSize={17} className='me-2' />{userData.email} </span></p>
                                                <p className='ajusteParagrafo'>
                                                    <span className='ms-1' ><FaMapMarkerAlt fontSize={18} className='me-2' />{userData.endereco}</span></p>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="user-details">
                                    <h6 className='h5emGeral px-2'>EM GERAL</h6>

                                    <div className="col-lg-9 d-flex justify-content-between">
                                        <p>Mostrar nome <br /><b>{userData.nome_exibicao} {userData.sobrenome}</b></p>
                                        <p>Data de nascimento <br />
                                            <b> {userData.data_admissao}</b>
                                        </p>
                                        <p>Gênero <br />
                                            <b>{userData.genero}</b>
                                        </p>
                                    </div>

                                    <div className="user-info row">
                                        {/* Informações de contato */}
                                        <section className="section col-lg-4 mb-3">
                                            <div className="border p-3">
                                                <h6>Informações de Contato</h6>
                                                <p><b>Email:</b> {userData.email}</p>
                                                <p><b>Telefone Fixo:</b> {userData.telefone_fixo}</p>
                                                <p><b>Celular:</b> {userData.celular}</p>
                                                <p><b>Cargo:</b> {userData.cargo}</p>
                                                <p><b>Data de Admissão:</b> {userData.data_admissao}</p>

                                            </div>
                                        </section>

                                        {/* Informações de Filial e Endereço */}
                                        <section className="section col-lg-4 mb-3">
                                           <div className="border p-3">
                                           <h6>Informações de Filial e Endereço</h6>
                                            <p><b>Filial:</b> {userData.filial}</p>
                                            <p><b>Endereço:</b> {userData.endereco}</p>
                                           </div>
                                        </section>

                                        {/* Localização */}
                                        <section className="section col-lg-4 mb-3">
                                           <div className="border p-3">
                                           <h6>Localização</h6>
                                            <p><b>País:</b> {userData.pais}</p>
                                            <p><b>Estado:</b> {userData.provincia}</p>
                                            <p><b>Cidade:</b> {userData.municipio}</p>
                                           </div>
                                        </section>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>

                   
             
        </div>
    );
}




const EquipeSuporte = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100">
                        <TopoAdmin
                            entrada="  Dados da Equipe de Suporte"
                            leftSeta={<FaArrowLeftLong />}
                            icone={<IoIosAdd />}
                            leftR="/equipeSuportePage"
                        />
                        <div className="vh-100 alturaPereita">
                            <VerEquipeSuporte />
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

export default EquipeSuporte;
