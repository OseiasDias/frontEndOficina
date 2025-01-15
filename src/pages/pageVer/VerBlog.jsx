/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams para capturar o id da URL
import axios from 'axios'; // Para fazer a requisição à API
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong, FaUserGear } from "react-icons/fa6";
import { FaBlogger, FaRegEdit, FaUserShield } from 'react-icons/fa';
import { IoDocumentTextSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para redirecionamento
import imgN from "../../assets/not-found.png";
import imgErro from "../../assets/error.webp";


export function VerBlog() {
    const { id } = useParams(); // Captura o id da URL
    const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Hook do React Router para navegação

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
        <div className="container-f">
            <div className="d-flex">
                <div className="vh-100 alturaPereita">
                    {/* Exibir os dados do blog */}
                    {userData && (
                        <>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="topBarraVer w-100 d-flex">
                                        <div className="divFoto">
                                            {userData.foto ? (
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${userData.foto}`}
                                                    alt={userData.titulo}
                                                    className="img-fluid mt-4 mx-auto"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <FaBlogger style={{ fontSize: '100px', color: '#fff', margin: 'auto', display: 'block' }} className='mt-2' />
                                            )}
                                        </div>

                                        <div className="divInfo mt-4 ms-3 text-white">
                                            <h5 className="fs-5 especuraTexto">
                                                <IoDocumentTextSharp fontSize={18} className="me-2" />
                                                {userData.titulo}
                                            </h5>

                                            <p className="ajusteParagrafo">
                                                <span><FaUserShield fontSize={18} className="me-2" />{userData.autor}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Informações adicionais sobre o blog */}
                            <div className="user-details">
                                <h6 className="h5emGeral px-2">EM GERAL</h6>

                                <div className="col-lg-12 d-flex justify-content-between">
                                    <p>Mostrar título <br /><b>{userData.titulo}</b></p>
                                    <p>Data de publicação <br />
                                        <b>{new Date(userData.data_publicacao).toLocaleDateString()}</b>
                                    </p>
                                    <p>Autor <br />
                                        <b>{userData.autor}</b>
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <span></span> 
                                        <span>
                                            <FaRegEdit fontSize={38} className='links-acessos p-2' onClick={() => handleViewEdit(id)} />
                                        </span>
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

             
            </div>
        </div>
    );
}

const Blogger = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100">
                        <TopoAdmin
                            entrada="  Visualização de Blog"
                            leftSeta={<FaArrowLeftLong />}
                            icone={<IoIosAdd />}
                            leftR="/blogList"
                        />

                        <div className="vh-100 alturaPereita">
                            <VerBlog />
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

export default Blogger;
