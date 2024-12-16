import "../../css/StylesAdmin/homeAdministrador.css";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams,  } from "react-router-dom"; // Importando useNavigate para redirecionar
import "react-toastify/dist/ReactToastify.css";



 function EditarBlog() {
  const navigate = useNavigate();
  const { idBlog } = useParams(); // Pegando o id da URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados do blog pelo id
  const fetchBlogData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${idBlog}`);
      if (!response.ok) throw new Error("Blog não encontrado");
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao carregar os dados do blog.");
    } finally {
      setLoading(false);
    }
  };

  // Carregar os dados do blog assim que o componente for montado
  useEffect(() => {
    fetchBlogData();
  }, [idBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${idBlog}`, {
        method: "PUT", // Usando PUT para atualizar os dados do blog
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog), // Envia os dados modificados
      });

      if (!response.ok) throw new Error("Erro ao atualizar o blog.");

      toast.success("Blog atualizado com sucesso!", {
        duration: 2000, // Define o tempo de exibição da notificação (3000ms = 3 segundos)
      });

      // Redirecionar para a página de lista de blogs após sucesso
      //navigate("/blogList");
      setTimeout(() => {
        navigate("/blogList");//window.location.reload();
        }, 3000);


    } catch (error) {
      console.error("Erro ao atualizar blog:", error);
      toast.error("Erro ao atualizar o blog.", {
        duration: 3000, // Define o tempo de exibição da notificação (3000ms = 3 segundos)
      });
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  
  return (
    <div>
      <div className="divHeaderBloger">
          <h1 className="">Zona de Edição</h1>
      </div>
      {blog ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={blog.titulo}
              onChange={(e) => setBlog({ ...blog, titulo: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Conteúdo</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={blog.conteudo}
              onChange={(e) => setBlog({ ...blog, conteudo: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              value={blog.autor}
              onChange={(e) => setBlog({ ...blog, autor: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Form>
      ) : (
        <p>Carregando dados do blog...</p>
      )}

      {/* Aqui é onde o ToastContainer é adicionado */}
      <ToastContainer
        position="top-center" // Posição das notificações
        duration={3000} // Duração padrão das notificações
        newestOnTop
       
        
        pauseOnHover
      />
    </div>
  );
}

const AdiarAgendamentoPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin
              entrada="Editar o conteudo do Blog"
              leftSeta={<FaArrowLeftLong />}
              leftR='/blogList' // Redireciona de volta para a lista de agendamentos
            />

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

export default AdiarAgendamentoPage;
