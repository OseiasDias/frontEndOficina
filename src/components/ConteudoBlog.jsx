import { useEffect, useState } from "react";
import "../css/conteudoBlog.css";
import { SiGooglenews } from "react-icons/si";

export default function ConteudoBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((response) => response.json())
      .then((data) => {
        // Ordena os blogs por data de publicação (decrescente)
        const sortedBlogs = data.sort((a, b) => {
          const dateA = new Date(a.data_publicacao);
          const dateB = new Date(b.data_publicacao);
          return dateB - dateA;
        });
        setBlogs(sortedBlogs);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Função para verificar se um blog foi publicado nas últimas 72 horas
  const isNewBlog = (dataPublicacao) => {
    const agora = new Date();
    const dataPostagem = new Date(dataPublicacao);
    const diffEmHoras = (agora - dataPostagem) / (1000 * 60 * 60); // Diferença em horas
    return diffEmHoras <= 72; // Verifica se a diferença é menor ou igual a 72 horas
  };

  // Função para controlar a visibilidade do conteúdo completo
  const [expandedBlog, setExpandedBlog] = useState(null);

  const toggleExpand = (blogId) => {
    setExpandedBlog(expandedBlog === blogId ? null : blogId); // Alterna o estado de expandir
  };

  // Função para limitar o número de caracteres visíveis (4 linhas)
  const getShortContent = (content, limit = 300) => {
    if (content.length > limit) {
      return content.substring(0, limit) + "...";  // Limita o conteúdo a 'limit' caracteres
    }
    return content;
  };

  return (
    <>
      <section className="blog-seccao">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12 mx-auto">
              <h1 className="mb-4 h1Top">
                Bem-vindo ao Blog da Nossa Oficina!
              </h1>
              <p className="paragrafoBlog">
                Estamos empolgados em apresentar o blog da nossa oficina, um
                espaço dedicado a compartilhar conhecimento, dicas e
                atualizações sobre tudo que envolve o nosso trabalho. Aqui, você
                encontrará uma variedade de posts que abrangem as novidades do
                setor, sempre com o objetivo de enriquecer sua experiência e
                compreensão.
              </p>
            </div>
          </div>

          <div className="row">
            {blogs.length > 0 ? (
              <>
                {blogs.map((blog) => (
                  <div key={blog.id_blog} className="col-12 col-md-12 col-lg-12 mx-auto">
                    <div className="conteuBlog">
                      <h3 className="hDois">
                        {blog.titulo}
                        {isNewBlog(blog.data_publicacao) && (
                          <span className="novo-icon ms-2">
                            <SiGooglenews className="itemNew" /> Novo!
                          </span>
                        )}
                      </h3>
                      <small>
                        {new Date(blog.data_publicacao).toLocaleDateString()}
                      </small>

                      {/* Conteúdo com limite de caracteres */}
                      <p className="paragrafoConteudo">
                        {expandedBlog === blog.id_blog
                          ? blog.conteudo  // Exibe o conteúdo completo se expandido
                          : getShortContent(blog.conteudo)} {/* Conteúdo limitado a um número de caracteres */}
                      </p>

                      {/* Exibe o botão "ver tudo" se o conteúdo foi cortado */}
                      {blog.conteudo.length > 300 && (
                        <button
                          className="ver-tudo-btn"
                          onClick={() => toggleExpand(blog.id_blog)}
                        >
                          {expandedBlog === blog.id_blog ? "Ver menos" : "Ver tudo"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>No blog posts available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
