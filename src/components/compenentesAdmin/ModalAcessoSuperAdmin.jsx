import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/StylesAdmin/modalAcessoSuperAdmin.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


export default function ModalAcessoSuperAdmin(props) {
    const [senha, setSenha] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validação simples da senha
        if (!senha) {
            setSenhaError('A senha é obrigatória.');
            return;
        }
        setSenhaError('');
        // Aqui você pode adicionar a lógica para processar a senha
        console.log('Senha enviada:', senha);
        // Fechar a modal após o envio
        // eslint-disable-next-line react/prop-types
        props.handleClose();
    };

    return (

        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="containerAcesso">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5>Acesso Super ao Administrador</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Por favor, insira sua senha</h6>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type={showPassword ? "text" : "password"} // Alterna entre text e password
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    isInvalid={!!senhaError}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)} // Alterna o estado de mostrar/ocultar
                                >

                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </Button>
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {senhaError}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" className='my-3 d-block mx-auto px-5 links-acessos'>
                            Entrar
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p className='mx-auto'>Zona reservada para super Administrador</p>
                </Modal.Footer>
            </div>
        </Modal >

    );
}