import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TopPerfil from "../../components/compenentesAdmin/TopPerfil";
import { FaArrowLeftLong } from "react-icons/fa6";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import "react-toastify/dist/ReactToastify.css";

function VerPerfilFuncionario() {
  const { id } = useParams();  // Pega o id da URL
  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/usuarios/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do funcionário");
        const data = await response.json();
        setFuncionario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionario();
  }, [id]);

  if (loading) return <p>Carregando perfil...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <TopPerfil nome={funcionario.nome} email={funcionario.email}
        telefone={funcionario.telefone}
      />

      <Tabs
        defaultActiveKey="dados-Pessoais"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="dados-Pessoais" title="Dados Pessoais">
          {funcionario ? (
            <div className="row mt-4 pt-2 outrosD">
              {/* Seção de Informações Pessoais */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Informações Pessoais</h6>
                <p><strong>Nome:</strong> {funcionario.nome}</p>
                <p><strong>Gênero:</strong> {funcionario.genero}</p>
                <p><strong>Data de Nascimento:</strong> {new Date(funcionario.data_nascimento).toLocaleDateString()}</p>
              </section>

              {/* Seção de Contato */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Contato</h6>
                <p><strong>Email:</strong> {funcionario.email}</p>
                <p><strong>Telefone:</strong> {funcionario.telefone}</p>
                <p><strong>Endereço:</strong> {funcionario.endereco || 'Não disponível'}</p>
              </section>

              {/* Seção Profissional */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Informações Profissionais</h6>
                <p><strong>Nível de Acesso:</strong> {funcionario.nivel_acesso}</p>
                <p><strong>Bilhete de Identidade:</strong> {funcionario.bilhete_identidade || 'Não disponível'}</p>
                <p><strong>IBAN:</strong> {funcionario.iban || 'Não disponível'}</p>
                <p><strong>Data de Admissão:</strong> {funcionario.data_admissao ? new Date(funcionario.data_admissao).toLocaleDateString('pt-BR') : 'Não disponível'}</p>
              </section>


            </div>
          ) : (
            <p>Funcionário não encontrado.</p>
          )}
        </Tab>
        <Tab eventKey="editar" title="Editar Dados">
          <EditarFuncionario />
        </Tab>


      </Tabs>


    </div>
  );
}



function EditarFuncionario() {
  const navigate = useNavigate();
  const { id } = useParams(); // Para pegar o ID do funcionário que será editado
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
  const [isLoading, setIsLoading] = useState(false);



  // Busca os dados do funcionário e atualiza os campos do formulário
  useEffect(() => {
    const fetchFuncionario = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/usuarios/${id}`);
        if (!response.ok) {
          throw new Error("Funcionário não encontrado");
        }
        const data = await response.json();
        setFormValues({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          senha: data.senha, // Caso precise exibir a senha, caso contrário remova esse campo
          nivelAcesso: data.nivel_acesso,
          genero: data.genero,
          endereco: data.endereco,
          dataNascimento: data.data_nascimento,
          estado: data.estado,
          bilhete_identidade: data.bilhete_identidade,
          iban: data.iban,
          data_admissao: data.data_admissao,
        });
      } catch (error) {
        toast.error(`Erro ao carregar os dados: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFuncionario();
  }, [id]);

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

    // Validação para o campo "Bilhete de Identidade"
    if (formValues.bilhete_identidade && !/^(?=(.*[A-Za-z]){2})[A-Za-z0-9]{14}$/.test(formValues.bilhete_identidade)) {
      newErrors.bilhete_identidade = "Bilhete de identidade inválido. Deve ter 14 caracteres, pelo menos 2 letras (maiúsculas ou minúsculas), sem espaços ou caracteres especiais.";
    }

    // Validação para o campo "IBAN"
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

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: "PUT",  // Usando PUT para editar
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
          bilhete_identidade: formValues.bilhete_identidade,
          iban: formValues.iban,
          data_admissao: formValues.data_admissao,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Edição não realizada: ${errorData.message || "Verifique os dados. Email e telefone já existem."}`
        );
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      toast.success(`Edição realizada com sucesso!`);

      setTimeout(() => {
        navigate("/funcionariosList");
      }, 5000);
    } catch (error) {
      toast.error("Erro ao conectar ao servidor: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="form-cadastro dnd">
      <h6 className="mt-5">EDITAR FUNCIONÁRIO</h6>
      <hr />

      <Form onSubmit={handleCadastro} className="row">
        {/* Campos existentes */}
        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formNome">
          <Form.Label className="fw-bold">Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            name="nome"
            value={formValues.nome}
            onChange={handleInputChange}
            isInvalid={!!errors.nome}
          />
          <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formEmail">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formTelefone">
          <Form.Label className="fw-bold">Telefone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite seu telefone"
            name="telefone"
            value={formValues.telefone}
            onChange={handleInputChange}
            isInvalid={!!errors.telefone}
          />
          <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formDataNascimento">
          <Form.Label className="fw-bold">Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="dataNascimento"
            value={formValues.dataNascimento}
            onChange={handleInputChange}
            isInvalid={!!errors.dataNascimento}
          />
          <Form.Control.Feedback type="invalid">{errors.dataNascimento}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formNivelAcesso">
          <Form.Label className="fw-bold">Cargo</Form.Label>
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
          <Form.Control.Feedback type="invalid">{errors.nivelAcesso}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formGenero">
          <Form.Label className="fw-bold">Gênero</Form.Label>
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
          <Form.Control.Feedback type="invalid">{errors.genero}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formEndereco">
          <Form.Label className="fw-bold">Endereço</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o endereço"
            name="endereco"
            value={formValues.endereco}
            onChange={handleInputChange}
            isInvalid={!!errors.endereco}
          />
          <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
        </Form.Group>

        {/* Novos campos adicionados */}
        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formBilheteIdentidade">
          <Form.Label className="fw-bold">Bilhete de Identidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o número do bilhete"
            name="bilhete_identidade"
            value={formValues.bilhete_identidade}
            onChange={handleInputChange}
            isInvalid={!!errors.bilhete_identidade}
          />
          <Form.Control.Feedback type="invalid">{errors.bilhete_identidade}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formIban">
          <Form.Label className="fw-bold">IBAN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o IBAN"
            name="iban"
            value={formValues.iban}
            onChange={handleInputChange}
            isInvalid={!!errors.iban}
          />
          <Form.Control.Feedback type="invalid">{errors.iban}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12 col-md-6 col-lg-6 my-1" controlId="formDataAdmissao">
          <Form.Label className="fw-bold">Data de Admissão</Form.Label>
          <Form.Control
            type="date"
            name="data_admissao"
            value={formValues.data_admissao}
            onChange={handleInputChange}
            isInvalid={!!errors.data_admissao}
          />
          <Form.Control.Feedback type="invalid">{errors.data_admissao}</Form.Control.Feedback>
        </Form.Group>

        {/* Outros campos do formulário... */}

        <div className="w-100">
          <Button
            variant="primary"
            type="submit"
            className="my-4 links-acessos px-5 mx-auto d-block"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Atualizar"
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




const PerfilFuncionarios = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Configuração de Perfil" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR='/funcionariosList' />

            <div className="vh-100 alturaPereita">
              <VerPerfilFuncionario />
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

export default PerfilFuncionarios;
