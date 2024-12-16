import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineToastId, setOfflineToastId] = useState(null); // Para armazenar o ID do toast

  // Função para tratar a perda de conexão com a internet
  const handleOffline = () => {
    setIsOnline(false);

    // Só exibe o toast de offline se não houver um ativo
    if (!offlineToastId) {
      const toastId = toast.error("Você está offline. Verifique sua conexão com a internet.", {
        autoClose: false, // Não vai fechar automaticamente
      });

      setOfflineToastId(toastId); // Salva o ID do toast
    }
  };

  // Função para tratar o retorno da conexão com a internet
  const handleOnline = () => {
    setIsOnline(true);

    // Se houver um toast de erro ativo (offline), removê-lo
    if (offlineToastId) {
      toast.dismiss(offlineToastId); // Remove o toast de erro
      setOfflineToastId(null); // Limpa o ID do toast
    }

    // Exibe um toast de sucesso e configura para fechar após 30 segundos
    toast.success("Conexão restaurada!", {
      autoClose: 10000, // O toast de sucesso ficará visível por 30 segundos
    });
  };

  // Efeito para adicionar e remover os event listeners
  useEffect(() => {
    // Adicionando os event listeners para detectar a mudança de conexão
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Verificando a conexão inicial com o navegador
    if (!navigator.onLine) {
      handleOffline();
    }

    // Limpeza dos event listeners ao desmontar o componente
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [offlineToastId]); // Dependência do offlineToastId para garantir que o toast será removido corretamente

  return (
    <div>
      {/* Container para os Toasts */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default ConnectionStatus;
