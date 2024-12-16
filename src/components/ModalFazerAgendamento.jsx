import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalFazerAgendamento(props) {
    const [formData, setFormData] = useState({
        descricao: '',
        data: '',
        id_veiculo: '',
        id_servico: 1,
        id_cliente: '',
        status: 'Confirmado'
    });
    const [errors, setErrors] = useState({});
    const [buttonVisible, setButtonVisible] = useState(true); // Controle de visibilidade do botão

    // Carrega o userId do localStorage ao montar o componente
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setFormData(prevData => ({ ...prevData, id_cliente: userId }));
        }
    }, []);

    const validate = () => {
        const formErrors = {};
        const today = new Date();
        const selectedDate = new Date(formData.data);

        if (!formData.data) {
            formErrors.data = "A data é obrigatória";
        } else if (selectedDate < today) {
            formErrors.data = "A data não pode ser no passado";
        } else if (selectedDate.getDay() === 0) {
            formErrors.data = "Agendamentos não podem ser feitos aos domingos";
        }

        if (!formData.descricao) {
            formErrors.descricao = "A descrição é obrigatória";
        }

        if (!formData.id_veiculo) {
            formErrors.id_veiculo = "O ID do veículo é obrigatório";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('http://localhost:5000/api/agendamentos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error('Erro ao criar agendamento');
                const result = await response.json();
                console.log("Agendamento de Manutenção:", result);
                
                setButtonVisible(false);
                toast.success("Manutenção agendada com sucesso!", {
                    onClose: () => {
                        setButtonVisible(true); // Mostra o botão após Toastify
                        props.onHide(); // Fecha modal após o toast
                    }
                });

                setFormData({ descricao: '', data: '', id_veiculo: '' });
                setErrors({});
            } catch (error) {
                console.error(error);
                toast.error("Ocorreu um erro ao agendar a manutenção.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
           {buttonVisible && ( 
            <div className="bordarModal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5> Agendar Manutenção </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row justify-content-center difinirFundo">
                            <div className="col-12">
                              <Form onSubmit={handleSubmit} className='descricao'>
                                    <Form.Group controlId="descricao">
                                        <Form.Label>Descrição do Objetivo de Manutenção</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="descricao"
                                            placeholder="Descreva o objetivo da manutenção"
                                            value={formData.descricao}
                                            onChange={handleChange}
                                            isInvalid={!!errors.descricao}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.descricao}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <Form.Group controlId="data" className="mt-3">
                                                <Form.Label>Data</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="data"
                                                    value={formData.data}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.data}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.data}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <Form.Group controlId="id_veiculo" className="mt-3">
                                                <Form.Label>Matricula do Veículo</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="id_veiculo"
                                                    value={formData.id_veiculo}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.id_veiculo}
                                                >
                                                    <option value="">Selecione a placa do veículo</option>
                                                    <option value="1">1234ABC - Carro 1</option>
                                                    <option value="2">5678DEF - Carro 2</option>
                                                    <option value="3">91011GHI - Carro 3</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.id_veiculo}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Button variant="primary" type="submit" className="mt-3 py-2 px-5 d-block mx-auto links-acessos">
                                        Agendar
                                    </Button>
                                </Form> 
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer />
            </div>
           )}
           <ToastContainer />
        </Modal>
    );
}
