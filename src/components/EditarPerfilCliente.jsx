import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import '../css/editarPerfilCliente.css';
import fotoPerfil from '../assets/img/minha.jpg';


function MudarSenha() {
  const [showPasswordAtual, setShowPasswordAtual] = useState(false);
  const [showPasswordNova, setShowPasswordNova] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações de senha
    if (novaSenha.length < 8) {
      toast.error("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      toast.error("A nova senha e a confirmação devem ser iguais.");
      return;
    }

    try {
      // Verifica a senha atual
      const response = await fetch(`http://localhost:5000/api/clientes/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senhaAtual }),
      });

      if (!response.ok) {
        throw new Error("Erro ao verificar a senha atual.");
      }

      const { senhaCorreta } = await response.json();
      if (!senhaCorreta) {
        toast.error("A senha atual está incorreta.");
        return;
      }
      
      // Atualiza a senha
      const updateResponse = await fetch(`http://localhost:5000/api/clientes/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senha: novaSenha }),
      });

      if (!updateResponse.ok) {
        throw new Error("Erro ao atualizar a senha.");
      }

      toast.success("Senha atualizada com sucesso!");
      setTimeout(() => navigate("/perfilCliente"), 1000); // Redireciona após 1 segundo
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error(error.message || "Erro ao atualizar senha.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Campo para a senha atual */}
      <Form.Group className="mb-3" controlId="formSenhaAtual">
        <Form.Label>Senha Atual</Form.Label>
        <div className="d-flex">
          <Form.Control
            type={showPasswordAtual ? "text" : "password"}
            placeholder="Digite sua senha atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPasswordAtual(!showPasswordAtual)}
            className="ms-2 transitionNone"
          >
            {showPasswordAtual ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        </div>
      </Form.Group>

      {/* Campo para a nova senha */}
      <Form.Group className="mb-3" controlId="formNovaSenha">
        <Form.Label>Nova Senha</Form.Label>
        <div className="d-flex">
          <Form.Control
            type={showPasswordNova ? "text" : "password"}
            placeholder="Digite sua nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPasswordNova(!showPasswordNova)}
            className="ms-2 transitionNone"
          >
            {showPasswordNova ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        </div>
      </Form.Group>

      {/* Campo para confirmar a nova senha */}
      <Form.Group className="mb-3" controlId="formConfirmarSenha">
        <Form.Label>Confirmar Nova Senha</Form.Label>
        <div className="d-flex">
          <Form.Control
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="Confirme sua nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="ms-2 transitionNone"
          >
            {showPasswordConfirm ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        </div>
      </Form.Group>

      {/* Botão de salvar alterações */}
      <Button variant="primary" type="submit" className="d-block mx-auto links-acessos">
        Salvar Alterações
      </Button>
    </Form>
  );
}



function EditarDados() {
  const [loading, setLoading] = useState(true);
  const [cliente, setCliente] = useState(null);
  const userId = localStorage.getItem('userId');
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clientes/${userId}`);
        if (!response.ok) throw new Error("Erro ao buscar os dados do cliente");
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClienteData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({ ...prevCliente, [name]: value }));
  };

  const handleSubmit = async (e) => {


    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/clientes/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
      });
      if (response.ok) {
        toast.success("Dados atualizados com sucesso!");
        setTimeout(() => {window.location.reload()}, 800); // Redireciona após 1 segundo
      } else {
        toast.error("Erro ao atualizar dados. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao atualizar dados.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!cliente) return <p>Não foi possível obter os dados do cliente.</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formNome">
        <Form.Label>Nome Completo</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={cliente.nome || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={cliente.email || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDataNascimento">
        <Form.Label>Data de Nascimento
        </Form.Label>
        <Form.Control
          type="date"
          name="data_nascimento"
          value={cliente.data_nascimento ? new Date(cliente.data_nascimento).toISOString().split('T')[0] : ''}

          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGenero">
        <Form.Label>Gênero</Form.Label>
        <Form.Select
          name="genero"
          value={cliente.genero || ""}
          onChange={handleChange}
        >
         
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTelefone">
        <Form.Label>Telefone</Form.Label>
        <Form.Control
          type="tel"
          name="telefone"
          value={cliente.telefone || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEndereco">
        <Form.Label>Endereço</Form.Label>
        <Form.Control
          type="text"
          name="endereco"
          value={cliente.endereco || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mx-auto d-block links-acessos">
        Salvar Alterações
      </Button>
    </Form>
  );
}

function MostrarDados() {
  const [loading, setLoading] = useState(true);
  const [cliente, setCliente] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clientes/${userId}`);
        if (!response.ok) throw new Error("Erro ao buscar os dados do cliente");
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClienteData();
  }, [userId]);

  if (loading) return <p>Carregando...</p>;
  if (!cliente) return <p>Não foi possível obter os dados do cliente.</p>;

  return (
    <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
      <Tab eventKey="home" title="Visão Geral">
        <p className="d-flex justify-content-between belezaParagrafo">
          <span><strong>Nome</strong></span>
          <span>{cliente.nome}</span>
        </p>
        <p className="d-flex justify-content-between belezaParagrafo">
          <span><strong>Email</strong></span>
          <span>{cliente.email}</span>
        </p>
        <p className="d-flex justify-content-between belezaParagrafo">
          <span><strong>Telefone</strong></span>
          <span>{cliente.telefone}</span>
        </p>
        <p className="d-flex justify-content-between belezaParagrafo">
          <span><strong>Data Nascimento</strong></span>
          <span>{new Date(cliente.data_nascimento).toLocaleDateString()}</span>
        </p>
        <p className="d-flex justify-content-between belezaParagrafo">
          <span><strong>Endereço</strong></span>
          <span>{cliente.endereco}</span>
        </p>
        <p className="d-flex justify-content-between belezaParagrafo">
          <span><strong>Gênero</strong></span>
          <span>{cliente.genero}</span>
        </p>
      </Tab>

      <Tab eventKey="profile" title="Editar Perfil">
        <EditarDados />
      </Tab>

      <Tab eventKey="longer-tab" title="Mudar Senha">

        <MudarSenha />
      </Tab>
    </Tabs>

  );
}


function EditarPerfilCliente() {
  return (
    <>
      <h1 className="opacity-0">Oseias dias</h1>

      <div className="container">
        <div className="row my-5 corpoTab">
          <div className="col-12 col-lg-4 col-md-10  mx-auto">
            <div className="espacamento">
              <img src={fotoPerfil} alt="foto Perfil" className="w-100 fotoPerfil imgPerfil" />
              <h3 className="text-center my-2">Oseias Dias</h3>
              <h6 className="text-center">Cliente</h6>
              <h6 className="text-center text-primary">Alterar foto</h6>
            </div>
          </div>

          <div className="col-12 col-lg-8 col-md-10 mx-auto">
            <div className="espacamento mb-5 pb-5">


              <MostrarDados />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default EditarPerfilCliente;