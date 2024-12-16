import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Form, Spinner, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/pagarActive.css";
import { IoMagnet, IoMail } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { FaCreditCard, FaTags } from "react-icons/fa";

const PagarActive = () => {
  const { id } = useParams(); // Obtém o ID do veículo da URL
  const navigate = useNavigate();

  // Estados para os dados do veículo e cliente
  const [veiculo, setVeiculo] = useState({
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    id_cliente: null,
    status_reparacao: "",
  });

  const [cliente, setCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    genero: "",
  });

  // Estados para os dados da fatura
  const [formaPagamento, setFormaPagamento] = useState("");
  const [valorPagar, setValorPagar] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [valorTotal, setValorTotal] = useState(0); // Adiciona o valor total

  // Estado para controle de loading
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal de confirmação
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/veiculos/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do veículo");
        const data = await response.json();
        setVeiculo(data);

        if (data.id_cliente) {
          const clienteResponse = await fetch(`http://localhost:5000/api/clientes/${data.id_cliente}`);
          if (!clienteResponse.ok) throw new Error("Erro ao buscar dados do cliente");
          const clienteData = await clienteResponse.json();
          setCliente(clienteData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVeiculo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "formaPagamento") {
      setFormaPagamento(value);
    } else if (name === "valorPagar") {
      setValorPagar(value);
      updateValorTotal(value, desconto); // Atualiza o valor total ao alterar o valor a pagar
    } else if (name === "desconto") {
      setDesconto(value);
      updateValorTotal(valorPagar, value); // Atualiza o valor total ao alterar o desconto
    }
  };

  // Função para atualizar o valor total considerando o desconto
  const updateValorTotal = (valorPagar, desconto) => {
    let total = parseFloat(valorPagar) || 0; // Valor total do serviço
    let descontoValor = parseFloat(desconto) || 0; // Desconto fornecido

    if (descontoValor >= total) {
      toast.error("O valor do desconto não pode ser maior ou igual ao valor total.");
      setDesconto(0); // Reseta o desconto para 0 se for inválido
      descontoValor = 0; // Evita que o desconto maior seja aplicado
    }

    const valorComDesconto = total - descontoValor; // Subtrai o desconto do valor total
    setValorTotal(valorComDesconto); // Atualiza o estado do valor total
  };

  // Função para abrir o modal de confirmação
  const openConfirmationModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Abre o modal
  };

  // Função para confirmar e gerar a fatura
  const confirmAndSubmit = async () => {
    setIsLoading(true); // Ativa o loading

    // Verifica se a forma de pagamento e o valor a pagar foram preenchidos
    if (!formaPagamento || !valorPagar || valorTotal <= 0) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      setIsLoading(false); // Desativa o loading
      return;
    }

    const faturaData = {
      nome_cliente: cliente.nome,
      email_cliente: cliente.email,
      telefone_cliente: cliente.telefone,
      genero_cliente: cliente.genero,
      marca_veiculo: veiculo.marca,
      modelo_veiculo: veiculo.modelo,
      ano_veiculo: veiculo.ano,
      placa_veiculo: veiculo.placa,
      forma_pagamento: formaPagamento,
      valor_desconto: desconto,
      valor_total: valorTotal, // Usando o valor total com o desconto aplicado
      status_pagamento: "Pendente",
    };

    try {
      const response = await fetch(`http://localhost:5000/api/faturas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faturaData),
      });

      if (!response.ok) throw new Error("Erro ao criar fatura");

      // Exibe o toast de sucesso
      toast.success("Fatura criada com sucesso!");

      // Usando toast.promise para exibir uma notificação enquanto processa o pagamento
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 5000)), // Espera 5 segundos para redirecionar
        {
          pending: "Processando o pagamento...",
          success: "Fatura criada com sucesso! Redirecionando...",
          error: "Erro ao criar fatura.",
        }
      ).then(() => {
        navigate("/faturaList"); // Redireciona para a lista de faturas após o tempo do toast
      });
    } catch (err) {
      console.error("Erro ao criar fatura:", err);
      toast.error("Erro ao criar fatura.");
    } finally {
      //setIsLoading(false); // Desativa o loading
      setIsModalOpen(false); // Fecha o modal após o pagamento
    }
  };

  // Função para fechar o modal
  const closeConfirmationModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  // Verifica o estado de loading e erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar veículo ou cliente: {error}</p>;

  return (
    <div className="mt-4 meusInputs">
      {/* Formulário de Dados do Cliente */}
      <Form onSubmit={openConfirmationModal}>
        <div className="preciosos row">
          <h6>DADOS DO CLIENTE</h6>
          <hr />
          <div className="col-lg-6 col-12 col-md-6">
            <Form.Group controlId="formNome">
              <Form.Label>Nome do Cliente</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={cliente.nome}
                readOnly
              />
            </Form.Group>
          </div>

          <div className="col-lg-6 col-12 col-md-6">
            <Form.Group controlId="formEmail">
              <Form.Label>Email do Cliente</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={cliente.email}
                readOnly
              />
            </Form.Group>
          </div>

          <div className="col-lg-6 col-12 col-md-6">
            <Form.Group controlId="formTelefone">
              <Form.Label>Telefone do Cliente</Form.Label>
              <Form.Control
                type="text"
                name="telefone"
                value={cliente.telefone}
                readOnly
              />
            </Form.Group>
          </div>

          <div className="col-lg-6 col-12 col-md-6">
            <Form.Group controlId="formGenero">
              <Form.Label>Gênero do Cliente</Form.Label>
              <Form.Control
                type="text"
                name="genero"
                value={cliente.genero}
                readOnly
              />
            </Form.Group>
          </div>
          <div className="col-12 mt-5">
            <h6>DADOS DO VEÍCULO</h6>
            <hr />
          </div>

          <div className="col-lg-6 col-12 col-md-6">
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="marca"
                value={veiculo.marca}
                readOnly
              />
            </Form.Group>
          </div>

          <div className="col-lg-6 col-12 col-md-6">
            <Form.Group controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={veiculo.modelo}
                readOnly
              />
            </Form.Group>
          </div>

          <div className="col-lg-6 col-12 col-md-6">
            <Form.Group controlId="formAno">
              <Form.Label>Ano</Form.Label>
              <Form.Control
                type="number"
                name="ano"
                value={veiculo.ano}
                readOnly
              />
            </Form.Group>
          </div>

          <div className="col-lg-6 col-12 col-md-6">
            <Form.Group controlId="formPlaca">
              <Form.Label>Placa</Form.Label>
              <Form.Control
                type="text"
                name="placa"
                value={veiculo.placa}
                readOnly
              />
            </Form.Group>
          </div>
        </div>

        <div className="row pagando">
          <h6 className="mt-4">DETALHES DE PAGAMENTO</h6>
          <hr />
          <div className="col-lg-4 col-12 col-md-6">
            <Form.Group controlId="formFormaPagamento">
              <Form.Label>Forma de Pagamento</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><FaCreditCard fontSize={20} color="#0070fa"/></span>
            
              <Form.Control
                as="select"
                name="formaPagamento"
                value={formaPagamento}
                onChange={handleChange}
                required
              >
                <option value="">Selecione Forma de Pagamento</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartão</option>
                <option value="transferencia">Transferência</option>
              </Form.Control>
              </div>
            </Form.Group>
          </div>

         

          <div className="col-lg-4 col-12 col-md-6">
            <Form.Group controlId="formValorPagar">
              <Form.Label>Valor a Pagar (KZ)</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><GiMoneyStack fontSize={20} color="#0070fa"/></span>
            
              <Form.Control
                type="number"
                name="valorPagar"
                value={valorPagar}
                onChange={handleChange}
                required
                min={0}
                placeholder="Valor total do serviço(KZ)"
              />
              </div>
            </Form.Group>
          </div>

          <div className="col-lg-4 col-12 col-md-6">
            <Form.Group controlId="formDesconto">
              <Form.Label>Desconto (KZ)</Form.Label>
              <div className="input-group">
            <span className="input-group-text"><FaTags fontSize={20} color="#0070fa"/></span>
            
              <Form.Control
                type="number"
                name="desconto"
                value={desconto}
                onChange={handleChange}
                required
                min={0}
                placeholder="Digite o desconto"
              />
              </div>
            </Form.Group>
          </div>
        </div>

        <div className="col-lg-12 mt-3">
          <Button
            variant="primary"
            type="submit"
            className="my-3 px-5 links-sociais mx-auto d-block"
            disabled={isLoading} // Desabilita o botão enquanto estiver carregando
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Confirmar e Faturar"
            )}
          </Button>
        </div>
      </Form>

      {/* Modal de Confirmação */}
      <Modal show={isModalOpen} onHide={closeConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Fatura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Valor Total com Desconto:  {valorTotal.toFixed(2)} KZ</h5>
          <p>Deseja confirmar o pagamento e gerar a fatura?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmationModal}>Cancelar</Button>
          <Button variant="primary" onClick={confirmAndSubmit} disabled={isLoading}>
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Confirmar Pagamento"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ToastContainer - Necessário para exibir as notificações */}
      <ToastContainer />
    </div>
  );
};

export default PagarActive;



/**
 * 
 * 
 =======================================================
                       FATURA
=======================================================

Empresa: BI-TURBO MOTORES
NIF: 00000000000XXX
Endereço: Benfica Rua 7
Telefone: 9384875775
Email: biturbo@gmail.com
Site: www.biturbo.co.ao
Setor: Automação

-------------------------------------------------------
 */