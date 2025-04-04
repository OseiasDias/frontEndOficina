import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdMiscellaneousServices } from "react-icons/md";
import '../css/servicos.css';
import { IoCalendarNumberOutline } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL;

export default function ServicosClientes() {
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false); // Novo estado para controlar a exibição

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await axios.get(`${API_URL}/servicos`);
                setServicos(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServicos();
    }, []);

    const handleShowAll = () => {
        setShowAll(true); // Define o estado para mostrar todos os serviços
    };

    if (loading) return <p>Carregando serviços...</p>;
    if (error) return <p>Erro ao carregar serviços: {error}</p>;

    return (
        <>
            <div className="seccao-cor pb-5">
                <div className="container">
                    <h2 className='titulo-secao text-center'>Conheça a nossa diversidade de serviços</h2>
                    <div className='row'>
                        {servicos.slice(0, showAll ? servicos.length : 9).map(servico => (
                            <div key={servico.id} className="servico-item mt-3 col-12 col-md-6 col-lg-4 h-100">
                                <div className="margem h-100">
                                    <MdMiscellaneousServices fontSize={38} className=' corIcone' />
                                    <h5 className='fw-500 tamanhoH5 my-1'>{servico.nome_servico}</h5>
                                    <p className='parSer'>{servico.descricao}</p>
                                    <p className='sizeAgenda'><strong>Agende uma avaliação! <IoCalendarNumberOutline fontSize={20} /></strong></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!showAll && servicos.length > 9 && ( // Mostra o botão apenas se houver mais de 9 serviços
                        <div className="text-center mt-3">
                            <button onClick={handleShowAll} className="btn btn-primary links-acessos px-5 my-4">Ver mais</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
