import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaRegAddressCard, FaTransgenderAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import "react-toastify/dist/ReactToastify.css";
import { MdAlternateEmail, MdOutlineDriveFileRenameOutline, MdWork } from "react-icons/md";
import { IoCall, IoHome } from "react-icons/io5";
import { BsBank2, BsCalendar2DateFill, BsCalendarDate } from "react-icons/bs";

export default function CadastrarFuncionario() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    nivelAcesso: "",
    genero: "",
    endereco: "",
    dataNascimento: "",
    estado: 1,
    bilhete_identidade: "",  // Novo campo
    iban: "",  // Novo campo
    data_admissao: "",  // Novo campo
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Função para gerar senha aleatória com no mínimo 8 caracteres
  const generateRandomPassword = () => {
    let password = Math.random().toString(36).slice(-10);
    return password.length < 8
      ? password + Math.random().toString(36).slice(-2)
      : password;
  };

  // Gera uma senha ao carregar o componente
  useEffect(() => {
    const senhaGerada = generateRandomPassword();
    setFormValues((prevValues) => ({
      ...prevValues,
      senha: senhaGerada,
    }));
    console.log("Senha gerada:", senhaGerada); // Exibe a senha gerada no console
  }, []);

  // Quando o usuário digita no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const hoje = new Date().toISOString().split("T")[0]; // Dados atuais no formato aaaa-mm-dd

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!formValues.nome) {
      newErrors.nome = "Nome é obrigatório.";
    } else if (!nomeRegex.test(formValues.nome)) {
      newErrors.nome =
        "O nome não pode conter números ou caracteres especiais.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!formValues.telefone) {
      newErrors.telefone = "Telefone é obrigatório.";
    } else if (!/^\d{9,}$/.test(formValues.telefone)) {
      newErrors.telefone = "Telefone deve conter pelo menos 9 dígitos.";
    }

    if (!formValues.senha) {
      newErrors.senha = "Senha é obrigatória.";
    } else if (formValues.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres.";
    }

    if (formValues.dataNascimento && formValues.dataNascimento > hoje) {
      newErrors.dataNascimento =
        "A data de nascimento não pode ser maior que a data atual.";
    }

    if (!formValues.nivelAcesso) {
      newErrors.nivelAcesso = "Nível de acesso é obrigatório.";
    }

    if (!formValues.genero) {
      newErrors.genero = "Gênero é obrigatório.";
    }

    if (!formValues.endereco) {
      newErrors.endereco = "Endereço é obrigatório.";
    }

    // Validação para o campo "Bilhete de Identidade" (não obrigatório, mas podemos validar o formato)
    if (formValues.bilhete_identidade && !/^(?=(.*[A-Za-z]){2})[A-Za-z0-9]{14}$/.test(formValues.bilhete_identidade)) {
      newErrors.bilhete_identidade = "Bilhete de identidade inválido. Deve ter 14 caracteres, pelo menos 2 letras (maiúsculas ou minúsculas), sem espaços ou caracteres especiais.";
    }

    // Validação para o campo "IBAN" (não obrigatório, mas podemos validar o formato)
    if (formValues.iban && !/^AO\d{2}[0-9]{21}$/.test(formValues.iban)) {
      newErrors.iban = "IBAN inválido. O formato correto é AOXX seguido de 21 números.";
    }


    // Validação para o campo "Data de Admissão"
    if (formValues.data_admissao && formValues.data_admissao > hoje) {
      newErrors.data_admissao =
        "A data de admissão não pode ser maior que a data atual.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // Ativa o spinner ao iniciar o processo de cadastro

    try {
      const response = await fetch("http://localhost:5000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formValues.nome,
          email: formValues.email,
          telefone: formValues.telefone,
          senha: formValues.senha,
          nivel_acesso: formValues.nivelAcesso,
          genero: formValues.genero,
          endereco: formValues.endereco,
          data_nascimento: formValues.dataNascimento,
          estado: formValues.estado,
          bilhete_identidade: formValues.bilhete_identidade, // Incluindo bilhete_identidade
          iban: formValues.iban, // Incluindo iban
          data_admissao: formValues.data_admissao, // Incluindo data_admissao
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Cadastro não realizado: ${errorData.message ||
          "Verifique os dados. Email e telefone já existem."
          }`
        );
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }

      const data = await response.json();
      toast.success(`Cadastro realizado com sucesso!`);

      setTimeout(() => {
        navigate("/funcionariosList"); // Redireciona para a lista de funcionários
      }, 5000); // 5000 ms é o tempo de exibição do toast
    } catch (error) {
      toast.error("Erro ao conectar ao servidor: " + error.message);
      setIsLoading(false); // Desativa o spinner em caso de erro
    }
  };

  return (
    <div className="form-cadastro">
      <h6 className="mt-5">CADASTRAR FUNCIONÁRIO</h6>
      <hr />
      <Form onSubmit={handleCadastro} className="row">
        {/* Campos existentes */}

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formNome">

          <Form.Label className="fw-bold">Nome Completo</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><MdOutlineDriveFileRenameOutline fontSize={20} color="#0070fa" /></span>

            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              name="nome"
              value={formValues.nome}
              onChange={handleInputChange}
              isInvalid={!!errors.nome}
            />
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.nome}</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formEmail">
          <Form.Label className="fw-bold">Email</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><MdAlternateEmail fontSize={20} color="#0070fa" /></span>

            <Form.Control
              type="email"
              placeholder="Digite seu email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.email}</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formTelefone">
          <Form.Label className="fw-bold">Telefone</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><IoCall fontSize={20} color="#0070fa" /></span>

            <Form.Control
              type="number"
              placeholder="Digite seu telefone"
              name="telefone"
              value={formValues.telefone}
              onChange={handleInputChange}
              isInvalid={!!errors.telefone}
            />
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.telefone}</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formDataNascimento">
          <Form.Label className="fw-bold">Data de Nascimento</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><BsCalendar2DateFill fontSize={20} color="#0070fa" /></span>

            <Form.Control
              type="date"
              name="dataNascimento"
              value={formValues.dataNascimento}
              onChange={handleInputChange}
              isInvalid={!!errors.dataNascimento}
            />
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.dataNascimento}</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formNivelAcesso">
          <Form.Label className="fw-bold">Cargo</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><MdWork fontSize={20} color="#0070fa" /></span>

            <Form.Control
              as="select"
              name="nivelAcesso"
              value={formValues.nivelAcesso}
              onChange={handleInputChange}
              isInvalid={!!errors.nivelAcesso}
            >
              <option>Assistente Técnico</option>
              <option>Eletricista Automotivo</option>
              <option>Lavador de Veículos</option>
              <option>Gerente de Oficina</option>
              <option>Atendente/Recepcionista</option>
              <option>Estagiário</option>
              <option>Técnico em Diagnóstico</option>
              <option>Mecânico</option>
            </Form.Control>
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.nivelAcesso}</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formGenero">
          <Form.Label className="fw-bold">Gênero</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaTransgenderAlt fontSize={20} color="#0070fa" /></span>

            <Form.Control
              as="select"
              name="genero"
              value={formValues.genero}
              onChange={handleInputChange}
              isInvalid={!!errors.genero}
            >
              <option value="">Selecione um gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </Form.Control>
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.genero}</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formEndereco">
          <Form.Label className="fw-bold">Endereço</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><IoHome fontSize={20} color="#0070fa" /></span>

            <Form.Control
              type="text"
              placeholder="Digite o endereço"
              name="endereco"
              value={formValues.endereco}
              onChange={handleInputChange}
              isInvalid={!!errors.endereco}
            />
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.endereco}</Form.Control.Feedback>


          </div>
        </Form.Group>

        {/* Novos campos adicionados */}

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formBilheteIdentidade">
          <Form.Label className="fw-bold">Bilhete de Identidade</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaRegAddressCard fontSize={20} color="#0070fa" /></span>

            <Form.Control
              type="text"
              placeholder="Digite o número do bilhete"
              name="bilhete_identidade"
              value={formValues.bilhete_identidade}
              onChange={handleInputChange}
              isInvalid={!!errors.bilhete_identidade}
            />
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.bilhete_identidade}</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formIban">
          <Form.Label className="fw-bold">IBAN</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><BsBank2 fontSize={20} color="#0070fa" /></span>

            <Form.Control
              type="text"
              placeholder="Digite o IBAN"
              name="iban"
              value={formValues.iban}
              onChange={handleInputChange}
              isInvalid={!!errors.iban}
            />
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.iban}</Form.Control.Feedback>

          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formDataAdmissao">
          <Form.Label className="fw-bold">Data de Admissão</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><BsCalendarDate fontSize={20} color="#0070fa" /></span>

            <Form.Control
              type="date"
              name="data_admissao"
              value={formValues.data_admissao}
              onChange={handleInputChange}
              isInvalid={!!errors.data_admissao}
            />
            <Form.Control.Feedback className="ajusteError" type="invalid">{errors.data_admissao}</Form.Control.Feedback>

          </div>
        </Form.Group>

        {/* Botão de Cadastro */}
        <div className="w-100">
          <Button
            variant="primary"
            type="submit"
            className="mt-4 links-acessos px-5 mx-auto  d-block"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Cadastrar"
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
