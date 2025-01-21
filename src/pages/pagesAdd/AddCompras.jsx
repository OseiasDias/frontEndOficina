import { useState } from "react";
import { Form, Row, Col, Table, Button } from "react-bootstrap";
import { MdNote, MdOutlineFileCopy } from "react-icons/md";
import { FaCalendarAlt, FaIndustry, FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaTree } from "react-icons/fa";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { useEffect } from 'react';
import axios from 'axios';

function FormularioAddCompra() {
    const [dadosCompra, setDadosCompra] = useState({
        numeroCompra: '',
        dataCompra: '',
        fornecedor: '',
        celular: '',
        email: '',
        endereco: '',
        galho: '1',
        fabricanteId: '',
        produtoId: '',
        quantidade: 0,
        preco: 0,
        precoTotal: 0,
        textoNota: '',
        interna: false,
        compartilhada: false,
        notaArquivos: []
    });

    const [distribuidores, setDistribuidores] = useState([]);  // Lista de distribuidores
    const [dadosCompraFilias, setDadosCompraFilias] = useState({
        filial: '',  // valor do campo de filial selecionada
        fornecedor: '',  // valor do campo de fornecedor selecionado
    });

    const [filias, setFilias] = useState([]);  // Lista de filiais


    // Carregar filiais e distribuidores
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filiasResponse = await axios.get('http://127.0.0.1:8000/api/filiais'); // API para as filiais
        const distribuidoresResponse = await axios.get('http://127.0.0.1:8000/api/distribuidores/'); // API para distribuidores
        setFilias(filiasResponse.data);
        setDistribuidores(distribuidoresResponse.data);
      } catch (error) {
        console.error('Erro ao carregar filiais ou distribuidores:', error);
      }
    };
    fetchData();
  }, []);

  // Função para lidar com mudanças nos inputs
  const handleMudanca = (e) => {
    const { name, value } = e.target;
    setDadosCompra((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMudancaFilias = (e) => {
    const { name, value } = e.target;
    setDadosCompraFilias((prevState) => ({
      ...prevState,
      [name]: value
    }));

    // Verificar se o campo alterado foi o fornecedor, se sim, fazer a requisição
    if (name === 'fornecedor' && value) {
      // Requisição para buscar o fornecedor
      axios.get(`http://127.0.0.1:8000/api/distribuidores/${value}`)
        .then((response) => {
          const fornecedor = response.data;
          setDadosCompra((prevState) => ({
            ...prevState,
            celular: fornecedor.celular,
            email: fornecedor.email,
            endereco: fornecedor.endereco
          }));
        })
        .catch((error) => {
          console.error('Erro ao carregar fornecedor:', error);
        });
    }
  };



   


    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar o formulário
    };

    /**LOGICA PARA EXIBIR OS DADOS DA FIALIS */

    // Variáveis com nomes terminando em 'filias'



    // Função para buscar os distribuidores da API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/distribuidores/')
            .then(response => {
                setDistribuidores(response.data);  // Preenche o estado 'distribuidores' com os dados da API
            })
            .catch(error => {
                console.error('Erro ao carregar os distribuidores:', error);
            });
    }, []);

    // Função para buscar as filiais da API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/filiais')
            .then(response => {
                setFilias(response.data);  // Preenche o estado 'filias' com os dados da API
            })
            .catch(error => {
                console.error('Erro ao carregar as filias:', error);
            });
    }, []);

    // Função para tratar a mudança de valor no formulário
  

    




    return (
        <Form onSubmit={handleSubmit}>
            <div className="col-md-12 mt-5">
        <h6>INFORMAÇÕES DA COMPRA</h6>
        <hr />
      </div>
      <Row className="mb-3">
        <Form.Group as={Col} md={6} controlId="dataCompra">
          <Form.Label>
            Data de Compra <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaCalendarAlt fontSize={22} color="#0070fa" /></span>
            <Form.Control
              type="date"
              name="dataCompra"
              value={dadosCompra.dataCompra}
              onChange={handleMudanca}
              required
            />
          </div>
        </Form.Group>

        <Form.Group as={Col} md={6} controlId="filial">
          <Form.Label>
            Filial <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaTree fontSize={22} color="#0070fa" />
            </span>
            <Form.Control
              as="select"
              name="filial"
              value={dadosCompraFilias.filial}
              onChange={handleMudancaFilias}
              required
            >
              <option value="">Selecione a Filial</option>
              {filias.map((filia) => (
                <option key={filia.id} value={filia.id}>
                  {filia.nome_filial}
                </option>
              ))}
            </Form.Control>
          </div>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={6} controlId="fornecedor">
          <Form.Label>
            Nome do Fornecedor <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaIndustry fontSize={22} color="#0070fa" />
            </span>
            <Form.Control
              as="select"
              name="fornecedor"
              value={dadosCompraFilias.fornecedor}
              onChange={handleMudancaFilias}
              required
            >
              <option value="">Selecione o Fornecedor</option>
              {distribuidores.map((distribuidor) => (
                <option key={distribuidor.id} value={distribuidor.id}>
                  {distribuidor.nome_empresa}
                </option>
              ))}
            </Form.Control>
          </div>
        </Form.Group>

        <Form.Group as={Col} md={6} controlId="celular">
          <Form.Label>
            Não Móvel <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaPhoneAlt fontSize={22} color="#0070fa" /></span>
            <Form.Control
              type="text"
              name="celular"
              value={dadosCompra.celular}
              onChange={handleMudanca}
              placeholder="Digite o número de celular"
              readOnly
            />
          </div>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={6} controlId="email">
          <Form.Label>
            E-mail <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaEnvelope fontSize={22} color="#0070fa" /></span>
            <Form.Control
              type="email"
              name="email"
              value={dadosCompra.email}
              onChange={handleMudanca}
              placeholder="Digite o e-mail"
              readOnly
            />
          </div>
        </Form.Group>

        <Form.Group as={Col} md={6} controlId="endereco">
          <Form.Label>
            Endereço de Cobrança <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaMapMarkedAlt fontSize={22} color="#0070fa" /></span>
            <Form.Control
              as="textarea"
              name="endereco"
              value={dadosCompra.endereco}
              onChange={handleMudanca}
              readOnly
              placeholder="Digite o Endereço de Cobrança"
            />
          </div>
        </Form.Group>
      </Row>


            <div className="mt-5">
                <h6><strong>DETALHES DA COMPRA</strong></h6>
            </div>
            <hr />

            {/* Tabela de Produtos */}
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Nome do Fabricante</th>
                        <th>Nome do Produto</th>
                        <th>Quantidade</th>
                        <th>Preço (Kz)</th>
                        <th>Montante (Kz)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control
                                as="select"
                                name="fabricanteId"
                                value=""
                                onChange="" // Corrigir para função que manipula esse campo
                            >
                                <option value="">Selecione o fabricante</option>
                                {/* Adicionar opções de fabricantes aqui */}
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control
                                as="select"
                                name="produtoId"
                                value=""
                                onChange=""// Corrigir para função que manipula esse campo
                            >
                                <option value="">Selecione o produto</option>
                                {/* Adicionar opções de produtos aqui */}
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control
                                type="number"
                                name="quantidade"
                                value=""
                                onChange=""// Corrigir para função que manipula esse campo
                                placeholder="Quantidade"

                            />
                        </td>
                        <td>
                            <Form.Control
                                type="number"
                                name="preco"
                                value=""
                                onChange="" // Corrigir para função que manipula esse campo
                                placeholder="Preço"
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                name="precoTotal"
                                value=""
                                onChange="" // Corrigir para função que manipula esse campo
                                readOnly
                                placeholder="Preço Total"
                            />
                        </td>

                    </tr>
                </tbody>
            </Table>

            <div className="mt-5 d-flex justify-content-between bordarDiv">
                <h6 className="baixarTexto pb-3 text-uppercase"><strong>Adicionar Notas</strong></h6>
            </div>


            <Row>
                <Col xs={12} md={6} lg={4}>
                    <Form.Group controlId="nota-texto">
                        <Form.Label className="fortificarLetter">Notas</Form.Label>
                        <div className="input-group">
                            <span className="input-group-text"><MdNote fontSize={22} color="#0070fa" /></span>
                            <Form.Control
                                as="textarea"
                                name="textoNota"
                                value={dadosCompra.textoNota || ""}
                                onChange={handleMudanca}
                                maxLength="100"
                            />
                        </div>
                    </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Form.Group controlId="nota-arquivos">
                        <Form.Label className="fortificarLetter">Arquivos</Form.Label>
                        <div className="input-group">
                            <span className="input-group-text"><MdOutlineFileCopy fontSize={22} color="#0070fa" /></span>
                            <Form.Control
                                type="file"
                                name="notaArquivos"
                                onChange="" // Adicionar função para lidar com o upload de arquivos
                                multiple
                            />
                        </div>
                    </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={4} className="pt-4">
                    <Form.Check
                        type="checkbox"
                        label="Nota Interna"
                        name="interna"
                        checked={dadosCompra.interna || false}
                        onChange={handleMudanca}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Compartilhado com fornecedor"
                        name="compartilhada"
                        checked={dadosCompra.compartilhada || false}
                        onChange={handleMudanca}
                    />
                </Col>
            </Row>

            <Button type="submit" className="links-acessos px-5 mt-5 w-25 mx-auto d-block">
                Enviar
            </Button>
        </Form>

    );
}
















export default function AddCompras() {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex">
                    <SideBar />
                    <div className="flexAuto w-100 ">
                        <TopoAdmin entrada="  Adicionar Compra" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR="/comprasPage" />
                        <div className="vh-100 alturaPereita">
                            <FormularioAddCompra/>
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
        </>
    );
};