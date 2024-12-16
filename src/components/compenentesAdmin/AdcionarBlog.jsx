import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'; // Spinner importado
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import { IoImage } from 'react-icons/io5'; // Importing an icon for image upload
import { MdTextFields } from "react-icons/md";import { BsChatRightTextFill } from "react-icons/bs";


export default function CadastroBlog() {
  const [formValues, setFormValues] = useState({
    titulo: '',
    conteudo: '',
    data_publicacao: new Date().toISOString(),
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigation = useNavigate(); // Navegação após sucesso

  // Função para lidar com as mudanças nos campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};
    // Validação do título
    if (!formValues.titulo) {
      newErrors.titulo = 'Título é obrigatório.';
    }
    // Validação do conteúdo
    if (!formValues.conteudo) {
      newErrors.conteudo = 'Conteúdo é obrigatório.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função de envio do cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true); // Ativa o spinner ao iniciar o processo de envio
    
    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Publicação não realizado: ${errorData.message || 'Erro desconhecido.'}`);
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }

      // Caso o cadastro seja bem sucedido
      toast.success("Blog publicado com sucesso!");
      
      setTimeout(() => {
        navigation('/blogList');
      }, 5000);

    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
      setIsLoading(false); // Desativa o spinner em caso de erro
    }
  };

  return (
    <>
      <h6 className="mt-5 fw-bold">PUBLICAR BLOG</h6>
      <hr />
      <Form onSubmit={handleCadastro} className="row">
        {/* Título */}
        <Form.Group className="col-12 my-2" controlId="formTitulo">
          <Form.Label className="fw-bold">Título</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><MdTextFields fontSize={22} color="#0070fa" /></span>
            <Form.Control 
              type="text" 
              placeholder="Digite o título do blog" 
              name="titulo" 
              value={formValues.titulo} 
              onChange={handleInputChange} 
              isInvalid={!!errors.titulo} 
            />
          </div>
          <Form.Control.Feedback type="invalid">{errors.titulo}</Form.Control.Feedback>
        </Form.Group>

        {/* Conteúdo */}
        <Form.Group className="col-12 my-2" controlId="formConteudo">
          <Form.Label className="fw-bold">Conteúdo</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><BsChatRightTextFill fontSize={22} color="#0070fa" /></span>
            <Form.Control 
              as="textarea" 
              rows={5} 
              placeholder="Digite o conteúdo do blog" 
              name="conteudo" 
              value={formValues.conteudo} 
              onChange={handleInputChange} 
              isInvalid={!!errors.conteudo} 
            />
          </div>
          <Form.Control.Feedback type="invalid">{errors.conteudo}</Form.Control.Feedback>
        </Form.Group>

        {/* Foto Upload */}
        <Form.Group className="col-12 my-2" controlId="formFoto">
          <Form.Label className="fw-bold">Carregar Foto (opcional)</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><IoImage fontSize={22} color="#0070fa" /></span>
            <Form.Control 
              type="file" 
              accept="image/*"
              name="foto"
              
            />
          </div>
        </Form.Group>

        {/* Botão para cadastrar */}
        <div className="btnEv w-100">
          <Button 
            variant="primary" 
            type="submit" 
            className="mt-4 d-block mx-auto links-acessos px-5" 
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Publicar Blog"
            )}
          </Button>
        </div>
      </Form>

      {/* Container para brindes de sucesso ou erro */}
      <ToastContainer position="top-center" />
    </>
  );
}


