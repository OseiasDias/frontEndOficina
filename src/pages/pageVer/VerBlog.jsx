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
import { FaEnvelopeOpenText, FaMapMarkerAlt } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';

export default function VerBlog() {
    const { id } = useParams(); // Captura o id da URL
    const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para buscar os dados do blog com o id
    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/blogs/${id}`);
            setUserData(response.data); // Armazenar os dados do blog no estado
        } catch (error) {
            setError('Erro ao carregar os dados do blog.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogData(); // Chama a função para buscar os dados quando o componente for montado
    }, [id]);

    // Verifica se os dados estão sendo carregados ou se ocorreu algum erro
    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex">
                <SideBar />
                <div className="flexAuto w-100">
                    <TopoAdmin
                        entrada={<>Blog: {userData?.titulo || "Sem título"}</>}
                        leftSeta={<FaArrowLeftLong />}
                        icone={<IoIosAdd />}
                        leftR="/BlogPage"
                    />

                    <div className="vh-100 alturaPereita">
                        {/* Exibir os dados do blog */}
                        {userData && (
                            <>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="topBarraVer w-100 d-flex">
                                            <div className="divFoto">
                                                <img
                                                    src={userData.foto ? `http://127.0.0.1:8000/storage/${userData.foto}` : '/images/sem-foto.jpg'}
                                                    alt={userData.titulo}
                                                    className="img-fluid mt-4 mx-auto"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            </div>

                                            <div className="divInfo mt-4 ms-3 text-white">
                                                <h5 className="fs-5 especuraTexto">{userData.titulo}</h5>
                                                <p className="ajusteParagrafo">
                                                    <span className="me-2"><FaEnvelopeOpenText fontSize={17} className="me-2" />{userData.email}</span>
                                                    <span className="ms-2"><BiSolidPhoneCall fontSize={18} /> {userData.telefone_fixo}</span>
                                                </p>
                                                <p className="ajusteParagrafo">
                                                    <span className="ms-1"><FaMapMarkerAlt fontSize={18} className="me-2" />{userData.endereco}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Informações adicionais sobre o blog */}
                                <div className="user-details">
                                    <h6 className="h5emGeral px-2">EM GERAL</h6>

                                    <div className="col-lg-9 d-flex justify-content-between">
                                        <p>Mostrar título <br /><b>{userData.titulo}</b></p>
                                        <p>Data de publicação <br />
                                            <b>{new Date(userData.data_publicacao).toLocaleDateString()}</b>
                                        </p>
                                        <p>Categoria <br />
                                            <b>{userData.categoria}</b>
                                        </p>
                                    </div>

                                    <div className="user-info row">
                                        {/* Informações do blog */}
                                        <section className="section col-lg-12">
                                            <div className="border p-3">
                                                <h6>Conteúdo do Blog</h6>
                                                <p>{userData.conteudo}</p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </>
                        )}
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
    );
}
