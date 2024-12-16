import '../css/ConteudoHomeCliente.css';
import fotoCadVeiculo from '../assets/img/cadVeiculo.png';
import fotoAgendarManutecao from '../assets/img/capAgendar.png';

import ModalCadastrarVeiculo from './ModalCadastrarVeiculo';
import { useState } from 'react';


export default function ConteudoHomeCliente() {

    const [modalCadVeiculoShow, setModalCadVeiculoShow] = useState(false);


    return (

        <>
            <div className="container alturaVh">
                <div className="row espacoTop mb-5">
                    <h3>Guia de acções!</h3>
                    <div className="col-12 col-md-12 my-3 mx-auto col-lg-12">
                        <div className="passo1">
                            <p className='pGuia'><span className='tamenhoOrdem'>Passo 1: </span>Aqui, facilitamos todo o processo de cuidar do seu veículo. Para garantir um atendimento rápido e eficiente, o primeiro passo é realizar o cadastro do seu carro. Ao cadastrar seu veículo, você nos fornece todas as informações necessárias, como marca, modelo, ano e placa, para que possamos entender melhor suas necessidades e oferecer o serviço adequado.</p>
                            <img src={fotoCadVeiculo} className='w-100 bordarFotoCad' alt="tela modal cadastrar veiculo" />
                            <h5 className='my-3'>Passos para Preencher o Formulário de Cadastro de Veículo</h5>
                            <ol>
                                <li>
                                    <strong>Marca do Veículo</strong>
                                    <ul>
                                        <li>Digite a marca do seu veículo no campo {"Marca"} (Ex.: Toyota, Honda, Ford).</li>
                                        <li>Certifique-se de inserir uma marca válida. Se houver erro, uma mensagem será exibida.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Modelo do Veículo</strong>
                                    <ul>
                                        <li>No campo {"Modelo"}, insira o modelo do seu veículo (Ex.: Corolla, Civic, Focus).</li>
                                        <li>Verifique se o modelo está correto. Erros de validação aparecerão, caso necessário.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Ano de Fabricação</strong>
                                    <ul>
                                        <li>Preencha o campo {"Ano"} com o ano de fabricação do veículo (Ex.: 2020, 2021).</li>
                                        <li>Somente valores válidos serão aceitos. Um erro será mostrado se o ano for inválido.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Placa do Veículo</strong>
                                    <ul>
                                        <li>Digite a placa do veículo no campo {"Placa"} (Ex.: LD-35-21-IJ).</li>
                                        <li>O sistema vai verificar a placa, e você verá um erro se a formatação ou os dados estiverem incorretos.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Adicionar Fotos do Veículo</strong>
                                    <ul>
                                        <li>No campo {"Fotos"}, selecione as imagens do veículo diretamente do seu dispositivo (JPEG, PNG, etc.).</li>
                                        <li>Certifique-se de que as fotos sejam claras e representem bem o veículo. O arquivo deve ser uma imagem válida.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Enviar o Formulário</strong>
                                    <ul>
                                        <li>Depois de preencher todos os campos, clique no botão{"Cadastrar Veículo"} para submeter o formulário.</li>
                                        <li>Se todos os dados estiverem corretos, o veículo será cadastrado no sistema. Caso contrário, os erros serão exibidos abaixo de cada campo.</li>
                                    </ul>
                                </li>
                            </ol>

                            <button className='links-acessos tirarTransicao w-100 py-2' onClick={() => setModalCadVeiculoShow(true)}>Cadastrar Veiculo</button>
                        </div>

                        {/* Modal Cadastrar veiculo */}
                        <ModalCadastrarVeiculo
                            show={modalCadVeiculoShow}
                            onHide={() => setModalCadVeiculoShow(false)}
                        />
                    </div>

                    <div className="col-12 col-md-12 my-3 mx-auto col-lg-12">
                        <div className="passo1">
                            <p className='pGuia'><span className='tamenhoOrdem'>Passo 2: </span> Após concluir o cadastro, você estará pronto para agendar sua próxima manutenção. Com seu veículo registrado, é simples e prático marcar revisões, consertos ou qualquer outro serviço que precisar, diretamente pela nossa plataforma. Lembre-se, o cadastro é o primeiro passo para garantir que o seu carro esteja sempre em dia com as manutenções!</p>
                            <img src={fotoAgendarManutecao} className='w-100 bordarFotoCad' alt="tela modal fazer agendamento" />
                            <h5 className='my-3'>Passos para Preencher o Formulário de Agendamento</h5>
                            <ol>
                                <li>
                                    <strong>Descrição do Objetivo de Manutenção</strong>
                                    <ul>
                                        <li>No campo {"Descrição"}, escreva detalhadamente o que precisa ser feito no veículo. Seja claro e específico sobre o problema ou serviço necessário. Exemplo: {"Troca de óleo e revisão dos freios"}.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Selecione a Data de Manutenção</strong>
                                    <ul>
                                        <li>No campo {"Data"}, escolha a data em que deseja realizar a manutenção, utilizando o seletor de datas. Certifique-se de selecionar uma data válida e disponível no sistema.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Escolha a Placa do Veículo</strong>
                                    <ul>
                                        <li>No campo {"Matrícula do Veículo"}, selecione a placa do veículo para o qual deseja realizar a manutenção. As opções aparecerão em uma lista suspensa, e você deverá escolher o veículo correto.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Enviar o Formulário</strong>
                                    <ul>
                                        <li>Após preencher todos os campos corretamente, clique no botão de envio do formulário para confirmar o agendamento. Caso haja erros, eles serão destacados em vermelho logo abaixo dos campos correspondentes.</li>
                                    </ul>
                                </li>
                            </ol>


                            <button className='links-acessos tirarTransicao w-100 py-2' onClick={() => setModalCadVeiculoShow(true)}>Agendar Manutenção</button>
                        </div>

                        {/* Modal Cadastrar veiculo */}
                        <ModalCadastrarVeiculo
                            show={modalCadVeiculoShow}
                            onHide={() => setModalCadVeiculoShow(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
