/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useParams e useNavigate para capturar o id da URL e fazer navegação
import axios from 'axios'; // Para fazer a requisição à API
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { FaRegEdit } from 'react-icons/fa';
import imgN from "../../assets/not-found.png"; // Imagem para o estado de "não encontrado"
import imgErro from "../../assets/error.webp"; // Imagem para o estado de erro
import { FaArrowLeftLong } from 'react-icons/fa6';

export function VerVeiculo() {
    const { id } = useParams(); // Captura o id da URL
    const [veiculoData, setVeiculoData] = useState(null); // Estado para armazenar os dados do veículo
    const [clienteData, setClienteData] = useState(null); // Estado para armazenar os dados do cliente (dono)
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const navigate = useNavigate(); // Navegação após sucesso

    // Função para buscar os dados do veículo com o id
    const fetchVeiculoData = async () => {
        try {
            setLoading(true); // Inicia o carregamento
            const response = await axios.get(`http://127.0.0.1:8000/api/veiculos/${id}`);
            if (response.status === 200) {
                setVeiculoData(response.data); // Armazenar os dados do veículo no estado

                // Buscar os dados do cliente (dono) usando o id do cliente
                const clienteResponse = await axios.get(`http://127.0.0.1:8000/api/clientes/${response.data.cliente.id}`);
                setClienteData(clienteResponse.data); // Armazenar os dados do cliente no estado
            } else {
                setError('Veículo não encontrado!');
            }
        } catch (error) {
            console.error("Erro ao carregar dados do veículo", error); // Log do erro no console
            setError('Erro ao carregar os dados do veículo.'); // Mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    useEffect(() => {
        fetchVeiculoData(); // Chama a função para buscar os dados quando o componente for montado
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
        navigate(`/editarVeiculo/${id}`);
    };

    return (
        <div className="container-f">
            <div className="d-flex">
                <div className="flexAuto w-100">
                    <div className="vh-100 alturaPereita">
                        {/* Exibir os dados do veículo */}
                        {veiculoData && (
                            <>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="topBarraVer w-100 d-flex">
                                            <div className="divFoto">
                                                <FaCar className="d-block mt-4 mx-auto" fontSize={80} color="#fff" />
                                            </div>

                                            <div className="divInfo mt-4 ms-3 text-white">
                                                <p className="fs-5 especuraTexto">
                                                    {veiculoData.marca_veiculo} {veiculoData.modelo_veiculo}
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
                                                        <strong>Placa:</strong> {veiculoData.numero_placa}
                                                    </span>
                                                    <span className="ms-2">
                                                        <strong>Combustível:</strong> {veiculoData.combustivel}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-details">
                                    <h6 className="h5emGeral px-2">DADOS DO VEÍCULO</h6>

                                    <div className="col-lg-9 d-flex justify-content-between">
                                        <p>
                                            Tipo de Veículo <br />
                                            <b>{veiculoData.tipo_veiculo}</b>
                                        </p>
                                        <p>
                                            Ano de Fabricação <br />
                                            <b>{veiculoData.ano_modelo}</b>
                                        </p>
                                        <p>
                                            Preço <br />
                                            <b>{veiculoData.preco}</b>
                                        </p>
                                        <p>
                                            Número de Equipamento <br />
                                            <b>{veiculoData.numero_equipamento}</b>
                                        </p>
                                    </div>

                                    <div className="user-info row">
                                        {/* Informações de contato do veículo */}
                                        <section className="section col-lg-4 mb-3">
                                            <div className="border p-3">
                                                <h6>Informações Gerais</h6>
                                                <p>
                                                    <b>Descrição:</b> {veiculoData.descricao}
                                                </p>
                                                <p>
                                                    <b>Motor:</b> {veiculoData.motor}
                                                </p>
                                                <p>
                                                    <b>Tamanho do Motor:</b> {veiculoData.tamanho_motor}
                                                </p>
                                                <p>
                                                    <b>Caixa de Velocidade:</b> {veiculoData.caixa_velocidade}
                                                </p>
                                            </div>
                                        </section>

                                          {/* Mais informações */}
                                          <section className="section col-lg-4 mb-3">
                                            <div className="border p-3">
                                                <h6>Mais Informação</h6>
                                                <p>
                                                    <b>Chassi:</b> {veiculoData.numero_chassi}
                                                </p>
                                                <p>
                                                    <b>Caixa:</b> {veiculoData.numero_caixa}
                                                </p>
                                                <p>
                                                    <b>Motor:</b> {veiculoData.numero_motor}
                                                </p>
                                                <p>
                                                    <b>Chave:</b> {veiculoData.numero_chave}
                                                </p>
                                            </div>
                                        </section>

                                        {/* Informações de contato do cliente */}
                                        {clienteData && (
                                            <section className="section col-lg-4 mb-3">
                                                <div className="border p-3">
                                                    <h6>Contato do Dono</h6>
                                                    <p><strong>Nome:</strong> {clienteData.nome_exibicao}</p>
                                                    <p><strong>Empresa:</strong> {clienteData.nome_empresa}</p>
                                                    <p><strong>Email:</strong> {clienteData.email}</p>
                                                    <p><strong>Telefone:</strong> {clienteData.telefone_fixo}</p>
                                                    <p><strong>Celular:</strong> {clienteData.celular}</p>
                                                </div>
                                            </section>
                                        )}

                                        {/* Imagens do Veículo */}
                                        <section className="section col-lg-4 mb-3">
                                            <div className="border p-3">
                                                <h6>Imagens</h6>
                                                <div className="image-gallery">
                                                    {JSON.parse(veiculoData.imagens).map((imgUrl, index) => (
                                                        <img
                                                            key={index}
                                                            src={imgUrl}
                                                            alt={`Imagem do veículo ${index + 1}`}
                                                            className="img-fluid mb-3"
                                                        />
                                                    ))}
                                                </div>
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

const Veiculo = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100">
                        <TopoAdmin
                            entrada="  Dados do Veículo"
                            leftSeta={<FaArrowLeftLong />}
                            icone={<IoIosAdd />}
                            leftR="/veiculosPageItens"
                        />
                        <div className="vh-100 alturaPereita">
                            <VerVeiculo />
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

export default Veiculo;
