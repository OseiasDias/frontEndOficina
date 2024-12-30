import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom'; // Para pegar os parâmetros da URL
import { IoImage } from 'react-icons/io5'; // Icone para upload de imagem
import { MdTextFields } from "react-icons/md";
import { BsChatRightTextFill } from "react-icons/bs";
import { format } from 'date-fns'; // Para formatar a data corretamente

 function EditarBlog() {
  const { id } = useParams(); // Obtém o ID do blog a partir da URL
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState({
    titulo: '',
    conteudo: '',
    foto: null,
    data_publicacao: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), 
    autor: 'Bitrubo Motors', // Autor fixo
  });

  const [errors, setErrors] = useState({});
  //const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  // const [isSubmitting, setIsSubmitting] = useState(false); // Para verificar se estamos submetendo o formulário
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  // Carregar os dados do blog ao inicializar a página
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setFormValues({
            titulo: data.titulo,
            conteudo: data.conteudo,
            foto: data.foto || null, // Exibe a foto atual, se houver
            data_publicacao: format(new Date(data.data_publicacao), 'yyyy-MM-dd HH:mm:ss'),
            autor: data.autor || 'Bitrubo Motors', // Se o autor estiver disponível, usá-lo
          });
        } else {
          toast.error("Erro ao carregar os dados do blog.");
        }
      } catch (error) {
        toast.error('Erro ao conectar ao servidor: ' + error.message);
      }
    };

    fetchBlogData();
  }, [id]);

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
    if (!formValues.titulo) {
      newErrors.titulo = 'Título é obrigatório.';
    }
    if (!formValues.conteudo) {
      newErrors.conteudo = 'Conteúdo é obrigatório.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para editar o blog
 // Função para editar o blog
 const handleEditBlog = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    //setIsSubmitting(true); // Ativa o estado de carregamento
    setIsLoading(true);
  
    // Crie o corpo como um objeto JSON em vez de usar FormData
    const blogData = {
      titulo: formValues.titulo,
      conteudo: formValues.conteudo,
      autor: formValues.autor,
      data_publicacao: formValues.data_publicacao,
    };
  
    // Se uma foto for fornecida, pode ser necessário enviar apenas o URL ou uma string de caminho para a foto
    if (formValues.foto) {
      blogData.foto = formValues.foto;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
        method: 'PUT', // Usamos PUT para edição
        headers: {
          'Content-Type': 'application/json', // Certifique-se de enviar os dados como JSON
        },
        body: JSON.stringify(blogData),
      });
  
      const result = await response.json();
      console.log("Resposta da API:", result);
  
      if (response.ok) {
        toast.success("Blog editado com sucesso!");
        setTimeout(() => {
          navigate('/blogList');
        }, 5000);
      } else {
        toast.error(`Erro ao editar: ${result.error || 'Erro desconhecido.'}`);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
      setIsLoading(false);
    } finally {
      //setIsSubmitting(false); // Desativa o estado de carregamento
    }
  };
  
  
  
  return (
    <>
      <h6 className="mt-5 fw-bold">EDITAR BLOG</h6>
      <hr />
     
      <Form onSubmit={handleEditBlog} className="row">
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
              onChange={handleFileChange} 
              disabled
            />
          </div>
        </Form.Group>

        {/* Botão para editar */}

        
        <div className="w-100">
          <Button variant="primary" type="submit" className="mt-4 d-block mx-auto links-acessos px-5" disabled={isLoading}>
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </div>

       
      </Form>

      {/* Container para brindes de sucesso ou erro */}
      <ToastContainer position="top-center" />
    </>
  );
}




export default function EditarBlogger() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="  Editar Blog" 
            leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} 
            leftR="/blogList" />
            <div className="vh-100 alturaPereita">
                <EditarBlog />
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
