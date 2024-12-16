import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/modalCadVeiculo.css';

export default function ModalCadastrarVeiculo(props) {
    const [formData, setFormData] = useState({
        marca: "",
        modelo: "",
        ano: "",
        placa: "",
        fotos: null,
    });

    const [errors, setErrors] = useState({});

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

        // Removido a validação das Fotos
        // if (!formData.fotos) {
        //     formErrors.fotos = "Envie pelo menos uma foto";
        // }

        return formErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            // Prepara os dados para envio
            const formDataToSend = new FormData();
            formDataToSend.append('marca', formData.marca);
            formDataToSend.append('modelo', formData.modelo);
            formDataToSend.append('ano', formData.ano);
            formDataToSend.append('placa', formData.placa);
            formDataToSend.append('fotos', formData.fotos);

            try {
                const response = await fetch('http://localhost:5000/api/veiculos', {
                    method: 'POST',
                    body: formDataToSend,
                });

                if (!response.ok) {
                    throw new Error('Erro ao cadastrar veículo');
                }

                const data = await response.json();
                toast.success('Veículo cadastrado com sucesso!');
                console.log("Veículo cadastrado:", data); // Log para verificar a resposta

                // Limpa o formulário após o sucesso
                setFormData({
                    marca: "",
                    modelo: "",
                    ano: "",
                    placa: "",
                    fotos: null,
                });

                props.onHide(); // Fecha o modal
            } catch (error) {
                toast.error(error.message || 'Erro ao cadastrar veículo. Tente novamente.');
            }
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
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className='bordarModal'>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h5>Cadastre o seu veículo</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-6">
                                    <Form.Group>
                                        <Form.Label>Marca</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="marca"
                                            value={formData.marca}
                                            onChange={handleChange}
                                            isInvalid={!!errors.marca}
                                            placeholder="Digite a marca do veículo"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.marca}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-12 col-md-12 col-lg-6">
                                    <Form.Group>
                                        <Form.Label>Modelo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="modelo"
                                            value={formData.modelo}
                                            onChange={handleChange}
                                            isInvalid={!!errors.modelo}
                                            placeholder="Digite o modelo do veículo"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.modelo}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-12 col-md-12 col-lg-6">
                                    <Form.Group>
                                        <Form.Label>Ano</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ano"
                                            value={formData.ano}
                                            onChange={handleChange}
                                            isInvalid={!!errors.ano}
                                            placeholder="Digite o ano do veículo"
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
                                            value={formData.placa}
                                            onChange={handleChange}
                                            isInvalid={!!errors.placa}
                                            placeholder="Digite a placa do veículo"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.placa}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-12 col-md-12 col-lg-6">
                                    <Form.Group>
                                        <Form.Label>Fotos</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="fotos"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            isInvalid={!!errors.fotos} // Essa linha pode ser removida, já que não temos mais a validação
                                            multiple
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fotos}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>
                            <Button variant="primary" type="submit" className="mt-3 d-block mx-auto links-acessos">
                                Cadastrar Veículo
                            </Button>
                        </Form>
                    </Modal.Body>
                </div>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}
