import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'; // Importando o Spinner
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import { IoImage } from 'react-icons/io5'; // Icone para upload de imagem
import { MdTextFields } from "react-icons/md";
import { BsChatRightTextFill } from "react-icons/bs";
import { format } from 'date-fns'; // Para formatar a data corretamente


export default function CadastroBlog() {
  const [formValues, setFormValues] = useState({
    titulo: '',
    conteudo: '',
    foto: null, // Foto será armazenada aqui
    data_publicacao: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), // Formato de data ajustado
    autor: 'Bitrubo Motors', // Autor fixo
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate(); // Navegação após sucesso

  // Função para lidar com as mudanças nos campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Função para lidar com a mudança da foto
  const handleFileChange = (e) => {
    setFormValues({ ...formValues, foto: e.target.files[0] });
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
    
    const formData = new FormData();
    formData.append("titulo", formValues.titulo);
    formData.append("conteudo", formValues.conteudo);
    formData.append("autor", formValues.autor); // Adiciona o autor fixo
    formData.append("data_publicacao", formValues.data_publicacao); // Adiciona a data de publicação

    // Verifica se há uma foto e adiciona ao FormData
    if (formValues.foto) {
      formData.append("foto", formValues.foto);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/blogs', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Sucesso
        toast.success("Blog publicado com sucesso!");
        setTimeout(() => {
          navigate('/blogList'); // Redireciona para a lista de blogs após 5 segundos
        }, 5000);
      } else {
        // Exibe a mensagem de erro
        toast.error(`Erro ao publicar: ${result.message || 'Erro desconhecido.'}`);
        setIsLoading(false);
      }

    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
      setIsLoading(false);
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
          <Form.Label className="fw-bold" >Carregar Foto (opcional)</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><IoImage fontSize={22} color="#0070fa" /></span>
            <Form.Control 
              type="file" 
              accept="image/*"
              name="foto"
              onChange={handleFileChange} 
              disabled
            />
          </div>
        </Form.Group>

        {/* Botão para cadastrar */}
        <div className="btnEv w-100">

        <div className="w-100">
          <Button variant="primary" type="submit" className="mt-4 d-block mx-auto links-acessos px-5" disabled={isLoading}>
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Publicar Blog"
            )}
          </Button>
        </div>

          
        </div>
      </Form>

      {/* Container para brindes de sucesso ou erro */}
      <ToastContainer position="top-center" />
    </>
  );
}
