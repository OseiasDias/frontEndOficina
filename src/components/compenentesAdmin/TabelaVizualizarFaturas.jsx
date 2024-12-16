import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { jsPDF } from "jspdf"; // Importando a biblioteca jsPDF
import logoFatura from "../../assets/lgo.png";

// Estilos personalizados para a tabela
const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#044697",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bolder",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
  cells: {
    style: {},
  },
};

export default function TabelaVizualizarFaturas() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModalVisualizar, setShowModalVisualizar] = useState(false);  // Modal de visualização
  const [showModalExcluir, setShowModalExcluir] = useState(false);  // Modal de exclusão
  const [faturaSelecionada, setFaturaSelecionada] = useState(null);  // Estado para armazenar a fatura selecionada
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  // Função para ordenar as faturas pela data de emissão
  const sortByDate = (data) => {
    return data.sort((a, b) => new Date(b.data_emissao) - new Date(a.data_emissao));
  };

  const columns = [
    { name: "Nº da Fatura", selector:(row) => "BT0"+row.id_fatura },
    { name: "Nome do Cliente", selector: (row) => row.nome_cliente },
    {
      name: "Marca e Modelo do Veículo",
      selector: (row) => `${row.marca_veiculo} ${row.modelo_veiculo}`,
      sortable: true
    },
    {
      name: "Valor Total",
      selector: (row) => ` ${parseFloat(row.valor_total).toFixed(2)} KZ`,
      sortable: true
    },
   
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleView(row)}>
              <FaRegEye />
              &nbsp;&nbsp;Visualizar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleEdit(row.id_fatura)}>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => openDeleteModal(row.id_fatura)} className="text-danger">
              <MdDeleteOutline />
              &nbsp;&nbsp;Excluir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log("Editar fatura com ID:", id);
  };

  // Função para abrir a modal de visualização com os dados da fatura
  const handleView = (fatura) => {
    setFaturaSelecionada(fatura);  // Armazenar os dados da fatura
    setShowModalVisualizar(true);  // Exibir a modal de visualização
  };

  // Função para abrir a modal de exclusão
  const openDeleteModal = (id) => {
    setItemIdToDelete(id);  // Armazenar o ID da fatura a ser excluída
    setShowModalExcluir(true);  // Exibir a modal de confirmação de exclusão
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/faturas/${itemIdToDelete}`, {
        method: "DELETE",
      });

      const updatedRecords = records.filter((record) => record.id_fatura !== itemIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_fatura !== itemIdToDelete));

      if (updatedRecords.length === 0) {
        fetchData();
      }

      setShowModalExcluir(false);  // Fechar a modal de exclusão
      toast.success("Fatura excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir fatura:", error);
      toast.error("Erro ao excluir fatura.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/faturas"); // Endpoint da API de faturas
      if (!response.ok) throw new Error("Erro ao buscar dados das faturas");
      const data = await response.json();

      // Ordena os dados pela data de emissão, garantindo que a última fatura gerada seja a primeira
      const sortedData = sortByDate(data);

      setRecords(sortedData);
      setOriginalRecords(sortedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  // Função para gerar o PDF com logo, negrito e linhas
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4"); // Definindo o formato A4

    // Adicionando a logo (garantir que a logo esteja disponível na URL ou caminho correto)
    doc.addImage(logoFatura, "PNG", 10, 10, 30, 30); // Logo em 10mm x 10mm, com tamanho 30x30

    // Adicionando título
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Detalhes da Fatura", 50, 20);

    // Definindo o estilo para o texto
    doc.setFont("helvetica", "normal");
    const yOffset = 30;

    if (faturaSelecionada) {
      doc.text(`Nº da Fatura:`, 20, yOffset);
      doc.setFont("helvetica", "bold");
      doc.text(`${faturaSelecionada.id_fatura}`, 60, yOffset);

      doc.setFont("helvetica", "normal");
      doc.text(`Nome do Cliente:`, 20, yOffset + 10);
      doc.setFont("helvetica", "bold");
      doc.text(`${faturaSelecionada.nome_cliente}`, 60, yOffset + 10);

      doc.setFont("helvetica", "normal");
      doc.text(`Marca e Modelo do Veículo:`, 20, yOffset + 20);
      doc.setFont("helvetica", "bold");
      doc.text(`${faturaSelecionada.marca_veiculo} ${faturaSelecionada.modelo_veiculo}`, 60, yOffset + 20);

      doc.setFont("helvetica", "normal");
      doc.text(`Valor Total:`, 20, yOffset + 30);
      doc.setFont("helvetica", "bold");
      doc.text(`${parseFloat(faturaSelecionada.valor_total).toFixed(2)} KZ`, 60, yOffset + 30);

      doc.setFont("helvetica", "normal");
      doc.text(`Data de Emissão:`, 20, yOffset + 40);
      doc.setFont("helvetica", "bold");
      doc.text(new Date(faturaSelecionada.data_emissao).toLocaleDateString(), 60, yOffset + 40);

      // Adicionando uma linha
      doc.setLineWidth(0.5);
      doc.line(20, yOffset + 50, 190, yOffset + 50);
    }

    // Salvando o PDF
    doc.save('fatura.pdf');

    // Exibindo mensagem de sucesso com Toast
    toast.success("Fatura PDF gerada com sucesso!");
  };

  // Função para imprimir a fatura
  const printInvoice = () => {
    const content = document.getElementById("faturaContent");
    const printWindow = window.open('', '', 'height=800,width=800');

    // Adicionando o estilo para garantir que a impressão siga o formato A4
    const printStyle = `
      @media print {
        body {
          font-family: Arial, sans-serif;
          font-size: 12pt;
        }
        .bold-text {
          font-weight: bold;
        }
        .line {
          border-top: 1px solid #000;
          margin: 10px 0;
        }
      }
    `;

    printWindow.document.write(`<style>${printStyle}</style>`);
    printWindow.document.write(content.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="my-4 homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Faturas</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome do cliente"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.nome_cliente.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      <div className="table-responsive mt-5">
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10]}
          noDataComponent={<p>Nenhuma fatura encontrada.</p>}
          footer={<div>Exibindo {records.length} faturas no total</div>}
        />
      </div>

      {/* Modal de Visualização */}
      <Modal show={showModalVisualizar} onHide={() => setShowModalVisualizar(false)} scrollable centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Visualizar Fatura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="faturaContent">
            {faturaSelecionada && (
              <>
                <div className="headerFatura d-flex mb-5 justify-content-between">
                  <img src={logoFatura} width={200} height={70} alt="logo" style={{ marginTop: "-20px" }} />
                  <p><strong className="bold-text">Nº da Fatura: </strong>BT00{faturaSelecionada.id_fatura}</p>
                </div>
                <hr />
                <h6 className="fw-bold">Dados do Cliente</h6>
                <hr />
                <div className="dadosCliente row">
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Nome:</strong> {faturaSelecionada.nome_cliente}</p>

                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Email:</strong> {faturaSelecionada.email_cliente}</p>

                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Telefone:</strong> {faturaSelecionada.telefone_cliente}</p>

                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Gênero:</strong> {faturaSelecionada.genero_cliente}</p>

                  </div>
                </div>
                <hr />
                <h6 className="fw-bold">Dados do Veículo</h6>
                <hr />

                <div className="dadosVeiculos row">
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Marca:</strong> {faturaSelecionada.marca_veiculo}</p>

                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Modelo:</strong> {faturaSelecionada.modelo_veiculo}</p>

                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Ano:</strong> {faturaSelecionada.ano_veiculo}</p>

                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Placa:</strong> {faturaSelecionada.placa_veiculo}</p>

                  </div>
                </div>

                <hr />
                <h6 className="fw-bold">Detalhes do Pagamento</h6>
                <hr />
                <div className="dadosPagamento row">
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Forma de Pagamento:</strong> {faturaSelecionada.forma_pagamento}</p>

                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Valor do Desconto:</strong> {parseFloat(faturaSelecionada.valor_desconto).toFixed(2)} KZ</p>

                  </div>
                  <div className="col-12 col-md-6 col-lg-6">


                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <p><strong className="bold-text">Valor Total:</strong> {parseFloat(faturaSelecionada.valor_total).toFixed(2)} KZ</p>

                  </div>


                </div>

                <hr />
                <div className="displayF d-flex justify-content-between">
                  <p><strong className="bold-text">Status de Pagamento:</strong> {faturaSelecionada.status_pagamento}</p>

                  <p><strong className="bold-text">Data de Emissão:</strong> {new Date(faturaSelecionada.data_emissao).toLocaleDateString()}</p>

                </div>
                <hr />

                <span className="text-center OutroText">Este documento foi gerado electronicamente, dispensa a assinatura e carimbo</span>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={generatePDF}>
            Salvar como PDF
          </Button>
          <Button variant="success" onClick={printInvoice}>
            Imprimir
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal show={showModalExcluir} onHide={() => setShowModalExcluir(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir esta fatura?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalExcluir(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
