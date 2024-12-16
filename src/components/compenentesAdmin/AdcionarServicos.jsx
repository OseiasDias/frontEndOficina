import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'; // Importando o Spinner
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import { MdTextFields } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";


export default function CadastroServico() {

  const navigate = useNavigate(); // Instanciando o hook navigate para redirecionamento


  const [formValues, setFormValues] = useState({
    nome_servico: '',
    descricao: '',
    preco: ''
    // A data de publicação será gerada automaticamente no back-end
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Adicionando estado de carregamento

  // Função para lidar com as mudanças nos campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};

    // Validação do nome do serviço
    if (!formValues.nome_servico) {
      newErrors.nome_servico = 'Nome do serviço é obrigatório.';
    }

    // Validação da descrição
    if (!formValues.descricao) {
      newErrors.descricao = 'Descrição do serviço é obrigatória.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função de envio do cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // Ativa o spinner enquanto a requisição é feita

    try {
      const response = await fetch('http://localhost:5000/api/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Cadastro não realizado: ${errorData.message || 'Erro desconhecido.'}`);
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }



      // Resetando os valores após cadastro bem-sucedido
      const data = await response.json();
      // Caso o cadastro seja bem-sucedido
      toast.success("Serviço cadastrado com sucesso!");

      // Aguarda o tempo da notificação ser fechada (5 segundos) antes de redirecionar
      setTimeout(() => {
        navigate('/servicosList');
      }, 5000); // 5000 ms é o tempo de exibição do toast

    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
      setIsLoading(false); // Desativa o spinner em caso de erro
    }
  };

  return (
    <>
      <h6 className="mt-5 fw-bold">CADASTRAR SERVIÇO</h6>
      <hr />
      <Form onSubmit={handleCadastro} className="row">
        {/* Nome do Serviço */}
        <Form.Group className="col-12 my-2" controlId="formNomeServico">
          <Form.Label className="fw-bold">Nome do Serviço</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><MdTextFields fontSize={22} color="#0070fa" /></span>
       
          <Form.Control
            type="text"
            placeholder="Digite o nome do serviço"
            name="nome_servico"
            value={formValues.nome_servico}
            onChange={handleInputChange}
            isInvalid={!!errors.nome_servico}
          />
          <Form.Control.Feedback type="invalid">{errors.nome_servico}</Form.Control.Feedback>
        </div>
        </Form.Group>

        {/* Descrição */}
        <Form.Group className="col-12 my-2" controlId="formDescricao">
          <Form.Label className="fw-bold">Descrição</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><BsFillChatLeftTextFill fontSize={22} color="#0070fa" /></span>
       
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Digite a descrição do serviço"
            name="descricao"
            value={formValues.descricao}
            onChange={handleInputChange}
            isInvalid={!!errors.descricao}
          />
          <Form.Control.Feedback type="invalid">{errors.descricao}</Form.Control.Feedback>
        </div>
        </Form.Group>

        {/* Botão para cadastrar */}
        <div className="btnEv w-100">
          <Button
            variant="primary"
            type="submit"
            className="mt-4 d-block mx-auto links-acessos px-5"
            disabled={isLoading} // Desabilita o botão enquanto o processo de envio está em andamento
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Cadastrar Serviço"
            )}
          </Button>
        </div>
      </Form>

      {/* Container para Toasts de sucesso ou erro */}
      <ToastContainer position="top-center" />
    </>
  );
}
