import '../css/veiculosCliente.css';
import carroFoto from '../assets/img/carroParticular.jpg';
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function VeiculosCliente() {
  const [showModal, setShowModal] = useState(false); // Controla a visibilidade da modal
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    fotos: null,
  });
  
  const [errors, setErrors] = useState({});
  
  const handleShow = () => setShowModal(true); // Função para mostrar a modal
  const handleClose = () => setShowModal(false); // Função para fechar a modal

  const validate = () => {
    let formErrors = {};

    // Validação da Marca
    if (!formData.marca) {
      formErrors.marca = "Marca é obrigatória";
    } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.marca)) {
      formErrors.marca = "A marca deve conter apenas letras, números e os caracteres / . -";
    }

    // Validação do Modelo
    if (!formData.modelo) {
      formErrors.modelo = "Modelo é obrigatório";
    } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.modelo)) {
      formErrors.modelo = "O modelo deve conter apenas letras, números e os caracteres / . -";
    }

    // Validação do Ano
    if (!formData.ano) {
      formErrors.ano = "Ano é obrigatório";
    } else if (!/^\d{4}$/.test(formData.ano) || formData.ano < 1900 || formData.ano > new Date().getFullYear()) {
      formErrors.ano = `Ano inválido. O ano deve estar entre 1900 e ${new Date().getFullYear()}`;
    }

    // Validação da Placa
    if (!formData.placa) {
      formErrors.placa = "Placa é obrigatória";
    } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.placa)) {
      formErrors.placa = "A Placa deve conter apenas letras, números e os caracteres / . -";
    }

    // Validação das Fotos
    if (!formData.fotos) {
      formErrors.fotos = "Envie pelo menos uma foto";
    }

    return formErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validate();
    
    if (Object.keys(formErrors).length === 0) {
      console.log("Veículo atualizado:", formData);
      alert("Dados do veículo atualizados com sucesso!");
      handleClose(); // Fechar a modal após o envio
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      fotos: e.target.files[0],
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-10 seccao-meuVeiculos mx-auto">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <img src={carroFoto} alt="Foto do Carro" className="w-100 imagemCarro" />
              </div>
              <div className="col-12 col-md-8 col-lg-9">
                <p className='d-flex justify-content-between'>
                  <span><strong>Nome</strong></span>
                  <span>Hunday</span>
                </p>
                <p className='d-flex justify-content-between'>
                  <span><strong>Modelo</strong></span>
                  <span>i-30</span>
                </p>
                <p className='d-flex justify-content-between'>
                  <span><strong>Ano</strong></span>
                  <span>2014</span>
                </p>
                <p className='d-flex justify-content-between'>
                  <span><strong>Placa</strong></span>
                  <span>LD-34-12-IH</span>
                </p>
                <p className='d-flex justify-content-between'>
                  <span><strong>Estado de Reparação</strong></span>
                  <span className='text-primary font-bold'>Em Andamento</span>
                </p>
                <button className='links-acessos btnEdit py-2 px-3 d-block ms-auto' onClick={handleShow}>Editar dados</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar os dados do veículo */}
      <Modal show={showModal} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Editar Dados do Veículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-6 ">
                <Form.Group className="w-100">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="marca"
                    placeholder="Digite a marca do veículo"
                    value={formData.marca}
                    onChange={handleChange}
                    isInvalid={!!errors.marca}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.marca}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-12 col-md-12 col-lg-6">
                <Form.Group className="w-100">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    name="modelo"
                    placeholder="Digite o modelo do veículo"
                    value={formData.modelo}
                    onChange={handleChange}
                    isInvalid={!!errors.modelo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.modelo}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-12 col-lg-6">
                <Form.Group>
                  <Form.Label>Ano</Form.Label>
                  <Form.Control
                    type="text"
                    name="ano"
                    placeholder="Digite o ano do veículo"
                    value={formData.ano}
                    onChange={handleChange}
                    isInvalid={!!errors.ano}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ano}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-12 col-lg-6">
                <Form.Group>
                  <Form.Label>Placa</Form.Label>
                  <Form.Control
                    type="text"
                    name="placa"
                    placeholder="Digite a placa (ex: LD-34-12-IH)"
                    value={formData.placa}
                    onChange={handleChange}
                    isInvalid={!!errors.placa}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.placa}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <Form.Group>
              <Form.Label>Fotos</Form.Label>
              <Form.Control
                type="file"
                name="fotos"
                accept="image/*"
                onChange={handleFileChange}
                isInvalid={!!errors.fotos}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fotos}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 d-block mx-auto links-acessos">
              Atualizar Veículo
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
