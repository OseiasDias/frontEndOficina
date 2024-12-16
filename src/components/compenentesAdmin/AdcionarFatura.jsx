import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Importando o hook useNavigate
import Spinner from "react-bootstrap/Spinner"; // Importando o Spinner
import "react-toastify/dist/ReactToastify.css";

export default function AdicionarFatura() {
  const navigate = useNavigate(); // Instanciando o hook navigate para redirecionamento
  const [formValues, setFormValues] = useState({
    id_pagamento: "",
    id_agendamento: "",
    valor_total: 0,
    metodo_pagamento: "",
    status: "Pago",
    descricao_servico: "",
    quantidade_servico: 1,
    valor_unitario: 0,
    cliente_nome: "",
    cliente_email: "",
    cliente_telefone: "",
    empresa_nome: "Oficina XYZ",
    empresa_cnpj: "00.000.000/0001-00",
    empresa_endereco: "Rua Exemplo, 123",
    empresa_telefone: "(11) 1234-5678",
    data_emissao: new Date().toISOString(),
    data_vencimento: "", // A data de vencimento pode ser calculada ou informada
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento do botão

  // Função para calcular a data de vencimento (exemplo: 7 dias após a data de emissão)
  useEffect(() => {
    const dataVencimento = new Date();
    dataVencimento.setDate(dataVencimento.getDate() + 7); // Adiciona 7 dias à data de emissão
    setFormValues((prevValues) => ({
      ...prevValues,
      data_vencimento: dataVencimento.toISOString().split("T")[0], // Formato YYYY-MM-DD
    }));
  }, []);

  // Quando o usuário digita no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.id_pagamento) {
      newErrors.id_pagamento = "ID do pagamento é obrigatório.";
    }

    if (!formValues.id_agendamento) {
      newErrors.id_agendamento = "ID do agendamento é obrigatório.";
    }

    if (formValues.valor_total <= 0) {
      newErrors.valor_total = "O valor total deve ser maior que zero.";
    }

    if (!formValues.metodo_pagamento) {
      newErrors.metodo_pagamento = "Método de pagamento é obrigatório.";
    }

    if (!formValues.cliente_nome) {
      newErrors.cliente_nome = "Nome do cliente é obrigatório.";
    }

    if (!formValues.cliente_email) {
      newErrors.cliente_email = "Email do cliente é obrigatório.";
    }

    if (!formValues.cliente_telefone) {
      newErrors.cliente_telefone = "Telefone do cliente é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // Ativa o spinner ao iniciar o processo de cadastro

    try {
      const response = await fetch("http://localhost:5000/api/faturas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_pagamento: formValues.id_pagamento,
          id_agendamento: formValues.id_agendamento,
          data_emissao: formValues.data_emissao,
          data_vencimento: formValues.data_vencimento,
          valor_total: formValues.valor_total,
          metodo_pagamento: formValues.metodo_pagamento,
          status: formValues.status,
          itens: [
            {
              descricao: formValues.descricao_servico,
              quantidade: formValues.quantidade_servico,
              valor_unitario: formValues.valor_unitario,
              valor_total: formValues.valor_total,
            },
          ],
          cliente: {
            nome: formValues.cliente_nome,
            email: formValues.cliente_email,
            telefone: formValues.cliente_telefone,
          },
          empresa: {
            nome: formValues.empresa_nome,
            cnpj: formValues.empresa_cnpj,
            endereco: formValues.empresa_endereco,
            telefone: formValues.empresa_telefone,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Cadastro não realizado: ${errorData.message || "Erro desconhecido."}`
        );
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }

      // Sucesso no cadastro, notificação
      toast.success("Fatura cadastrada com sucesso!");

      // Resetando o formulário após o sucesso
      setFormValues({
        id_pagamento: "",
        id_agendamento: "",
        valor_total: 0,
        metodo_pagamento: "",
        status: "Pago",
        descricao_servico: "",
        quantidade_servico: 1,
        valor_unitario: 0,
        cliente_nome: "",
        cliente_email: "",
        cliente_telefone: "",
        empresa_nome: "BI-Turbo Motores",
        empresa_cnpj: "00.000.000/0001-00",
        empresa_endereco: "Benfica Rua-8",
        empresa_telefone: "+244 983383883",
        data_emissao: new Date().toISOString(),
        data_vencimento: "", // Resetando a data de vencimento
      });

      // Usando toast.promise para aguardar a notificação antes do redirecionamento
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 5000)), // Espera 5 segundos para redirecionar
        {
          pending: "Aguardando confirmação...",
          success: "Fatura cadastrada com sucesso! Redirecionando...",
          error: "Erro ao cadastrar a fatura.",
        }
      ).then(() => {
        navigate("/faturasList"); // Redireciona para a lista de faturas após o tempo do toast
      });

    } catch (error) {
      toast.error("Erro ao conectar ao servidor: " + error.message);
      setIsLoading(false); // Desativa o spinner em caso de erro
    }
  };

  return (
    <div className="form-cadastro">
      <h6 className="mt-5">CADASTRAR FATURA</h6>
      <hr />
      <Form onSubmit={handleCadastro} className="row">
        {/* Campos do formulário */}
        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formIdPagamento">
          <Form.Label>ID do Pagamento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o ID do pagamento"
            name="id_pagamento"
            value={formValues.id_pagamento}
            onChange={handleInputChange}
            isInvalid={!!errors.id_pagamento}
          />
          <Form.Control.Feedback type="invalid">{errors.id_pagamento}</Form.Control.Feedback>
        </Form.Group>

        {/* Outros campos omitidos por brevidade... */}

        <div className="w-100">
          <Button
            variant="primary"
            type="submit"
            className="mt-4 links-acessos px-5 mx-auto  d-block"
            disabled={isLoading} // Desabilita o botão quando está carregando
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Cadastrar Fatura"
            )}
          </Button>
        </div>
      </Form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
