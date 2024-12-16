import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VerPerfilFuncionario() {
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
      <h3>Perfil do Funcionário</h3>
      {funcionario ? (
        <div>
          <p><strong>Nome:</strong> {funcionario.nome}</p>
          <p><strong>Email:</strong> {funcionario.email}</p>
          <p><strong>Telefone:</strong> {funcionario.telefone}</p>
          <p><strong>Endereço:</strong> {funcionario.endereco}</p>
          {/* Adicione outros campos conforme necessário */}
        </div>
      ) : (
        <p>Funcionário não encontrado.</p>
      )}
    </div>
  );
}
