import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../css/conteudoBlog.css";
import { SiGooglenews } from "react-icons/si";
import capaBlog from "../assets/no_image.jpg";

const API_URL = import.meta.env.VITE_API_URL;

export default function ConteudoBlog() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then((response) => response.json())
      .then((data) => {
        const sortedBlogs = data.sort((a, b) =>
          new Date(b.data_publicacao) - new Date(a.data_publicacao)
        );
        setBlogs(sortedBlogs);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  const isNewBlog = (dataPublicacao) => {
    const agora = new Date();
    const dataPostagem = new Date(dataPublicacao);
    return (agora - dataPostagem) / (1000 * 60 * 60) <= 72;
  };

  const verMais = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage < Math.ceil(blogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="blog-seccao">
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4 col-md-12 col-lg-12 mx-auto">
            <h1 className="mb-4 h1Top">Bem-vindo ao Blog da Nossa Oficina!</h1>
            <p className="paragrafoBlog fs-5">
              Tudo sobre manutenção, inovação e cuidados automotivos. Fique por dentro das últimas novidades do setor!
            </p>
          </div>
        </div>

        <div className="row">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div key={blog.id_blog} className="col-12 my-2 col-md-12 col-lg-4 ">
                <div className="conteuBlog h-100 ">
                  <div className="img">
                    <img src={capaBlog} alt="..." className="w-100" />
                  </div>
                  <div className="info">
                    <h3 className="hDois">
                      {blog.titulo}
                      {isNewBlog(blog.data_publicacao) && (
                        <span className="novo-icon ms-2">
                          <SiGooglenews className="itemNew" /> Novo!
                        </span>
                      )}
                    </h3>
                    <small>{new Date(blog.data_publicacao).toLocaleDateString()}</small>
                    <p className="paragrafoConteudo">
                      {blog.conteudo.length > 150
                        ? `${blog.conteudo.substring(0, 150)}... `
                        : blog.conteudo}
                    </p>
                    {blog.conteudo.length > 150 && (
                      <button className="btn text-center btn-link p-0" onClick={() => verMais(blog)}>
                        Ver mais
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Não existe blog a ser exibido.</p>
          )}
        </div>

        <Modal show={showModal} size="xl" scrollable onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBlog?.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedBlog?.conteudo}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row mt-5">
          <div className="pagination-controls text-center mt-3">
            <button className="btn btn-primary me-2" onClick={prevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span className="fw-bold">
              Página {currentPage} de {Math.ceil(blogs.length / blogsPerPage)}
            </span>
            <button className="btn btn-primary ms-2" onClick={nextPage} disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}