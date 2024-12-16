import "../../css/StylesAdmin/homeAdministrador.css";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import 'react-toastify/dist/ReactToastify.css'; // Importante para os estilos do Toast
import { BiCog } from "react-icons/bi";
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import "react-toastify/dist/ReactToastify.css";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IoCall } from 'react-icons/io5';
import { MdEmail, MdError, MdOutlineAlternateEmail } from 'react-icons/md';
import { FaWhatsapp, FaFacebook, FaYoutube, FaInstagram, FaRegMap, FaRegCalendarCheck } from 'react-icons/fa';
import { GiRoad } from 'react-icons/gi';
import { RiMapPin2Line, RiMapPinLine } from 'react-icons/ri';
import { TbMap2 } from 'react-icons/tb';
import { useEffect } from "react";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TbNumber } from "react-icons/tb";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";



const FormularioEmpresa = () => {
  const [contactos, setContactos] = useState({
    telefone: '',
    email: '',
    whatsapp: '',
  });

  const [localizacao, setLocalizacao] = useState({
    rua: '',
    bairro: '',
    municipio: '',
  });

  const [redes, setRedes] = useState({
    facebook: '',
    youtube: '',
    instagram: '',
  });

  const handleChangeContactos = (e) => {
    const { name, value } = e.target;
    setContactos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeLocalizacao = (e) => {
    const { name, value } = e.target;
    setLocalizacao((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeRedes = (e) => {
    const { name, value } = e.target;
    setRedes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode processar os dados, como enviá-los para a API
    console.log('Dados Enviados:', { contactos, localizacao, redes });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mt-5">
        {/* Seção Contactos */}
        <div className="col-12 col-md-6 col-lg-6 alinharDiv">
          <h4 className="mb-4">Contactos</h4>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <div className="input-group">
              <span className="input-group-text">
                <IoCall fontSize={22} color="#0070fa" />
              </span>
              <input
                type="text"
                className="form-control"
                id="telefone"
                name="telefone"
                value={contactos.telefone}
                onChange={handleChangeContactos}
                placeholder="Digite o telefone"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <MdEmail fontSize={22} color="#0070fa" />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={contactos.email}
                onChange={handleChangeContactos}
                placeholder="Digite o email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaWhatsapp fontSize={22} color="#0070fa" />
              </span>
              <input
                type="text"
                className="form-control"
                id="whatsapp"
                name="whatsapp"
                value={contactos.whatsapp}
                onChange={handleChangeContactos}
                placeholder="Digite o número do WhatsApp"
              />
            </div>
          </div>
        </div>

        {/* Seção Localização */}
        <div className="col-12 col-md-6 col-lg-6 alinharDiv">
          <h4 className="mb-4">Localização</h4>
          <div className="form-group">
            <label htmlFor="rua">Rua</label>
            <div className="input-group">
              <span className="input-group-text">
                <GiRoad fontSize={22} color="#0070fa" />
              </span>
              <input
                type="text"
                className="form-control"
                id="rua"
                name="rua"
                value={localizacao.rua}
                onChange={handleChangeLocalizacao}
                placeholder="Digite o rua"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bairro">Bairro</label>
            <div className="input-group">
              <span className="input-group-text">
                <RiMapPinLine fontSize={22} color="#0070fa" />
              </span>
              <input
                type="text"
                className="form-control"
                id="bairro"
                name="bairro"
                value={localizacao.bairro}
                onChange={handleChangeLocalizacao}
                placeholder="Digite o bairro"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="municipio">Município</label>
            <div className="input-group">
              <span className="input-group-text">
                <TbMap2 fontSize={22} color="#0070fa" />
              </span>
              <input
                type="text"
                className="form-control"
                id="municipio"
                name="municipio"
                value={localizacao.municipio}
                onChange={handleChangeLocalizacao}
                placeholder="Digite a Município"
              />
            </div>
          </div>
        </div>

        {/* Seção Redes */}
        <div className="col-12 col-md-6 col-lg-6 alinharDiv">
          <h4 className="mb-4">Redes</h4>

          <div className="form-group">
            <label htmlFor="facebook">Facebook</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaFacebook fontSize={22} color="#0070fa" />
              </span>
              <input
                type="url"
                className="form-control"
                id="facebook"
                name="facebook"
                value={redes.facebook}
                onChange={handleChangeRedes}
                placeholder="Link para o Facebook"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="youtube">YouTube</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaYoutube fontSize={22} color="#0070fa" />
              </span>
              <input
                type="url"
                className="form-control"
                id="youtube"
                name="youtube"
                value={redes.youtube}
                onChange={handleChangeRedes}
                placeholder="Link para o YouTube"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Instagram</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaInstagram fontSize={22} color="#0070fa" />
              </span>
              <input
                type="url"
                className="form-control"
                id="instagram"
                name="instagram"
                value={redes.instagram}
                onChange={handleChangeRedes}
                placeholder="Link para o Instagram"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-group text-center mt-4">
        <button type="submit" className="btn btn-primary">
          Enviar Dados
        </button>
      </div>
    </form>
  ); 
};





const EmpresaForm = () => {
  // Estado para os horários da empresa
  const [horarios, setHorarios] = useState({
    segunda: { abertura: '', fechamento: '' },
    terca: { abertura: '', fechamento: '' },
    quarta: { abertura: '', fechamento: '' },
    quinta: { abertura: '', fechamento: '' },
    sexta: { abertura: '', fechamento: '' },
    sabado: { abertura: '', fechamento: '' },
    domingo: { abertura: '', fechamento: '' },
  });

  // Estado para erros de validação
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Função para lidar com mudanças nos campos de horário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [dia, tipo] = name.split('_'); // "segunda_abertura" -> ['segunda', 'abertura']
    setHorarios((prevHorarios) => ({
      ...prevHorarios,
      [dia]: {
        ...prevHorarios[dia],
        [tipo]: value,
      },
    }));
  };

  // Função para validar os horários de funcionamento
  const validateHorarios = () => {
    const newErrors = {};
    Object.keys(horarios).forEach((dia) => {
      if (horarios[dia].abertura && horarios[dia].fechamento) {
        if (horarios[dia].abertura >= horarios[dia].fechamento) {
          newErrors[`${dia}_fechamento`] = 'A hora de fechamento deve ser maior que a de abertura.';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para enviar os dados (simulando o envio)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateHorarios()) {
      setIsLoading(true);
      // Simulação de envio dos dados
      setTimeout(() => {
        toast.success('Horários de funcionamento salvos com sucesso!');
        setIsLoading(false);
      }, 2000);
    }
  };

  // Função para renderizar os tooltips de erro
  const renderTooltip = (message) => <Tooltip id="tooltip">{message}</Tooltip>;

  return (
    <div className="form-cadastro">
      <h6 className="mt-5">Horários de Funcionamento</h6>
      <hr />
      <Form onSubmit={handleSubmit} className="row">
       

        {['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'].map((dia) => (
          <Form.Group
            className="col-12 col-md-6 col-lg-6 my-1"
            key={dia}
            controlId={`formHorario${dia.charAt(0).toUpperCase() + dia.slice(1)}`}
          >
            <Form.Label className="fw-Linha">
              {dia.charAt(0).toUpperCase() + dia.slice(1)}-feira
            </Form.Label>
            <div className="d-flex align-items-center">
              {/* Ícone ao lado do campo de horário */}
              <span className="input-group-text">
                <MdAccessTimeFilled fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
                type="time"
                name={`${dia}_abertura`}
                value={horarios[dia].abertura}
                onChange={handleInputChange}
                isInvalid={!!errors[`${dia}_abertura`]}
                className="me-2"
              />
              <span className="mx-2">até</span>
              <Form.Control
                type="time"
                name={`${dia}_fechamento`}
                value={horarios[dia].fechamento}
                onChange={handleInputChange}
                isInvalid={!!errors[`${dia}_fechamento`]}
                className="me-2"
              />
            </div>

            {/* Exibição de erro de horário */}
            <Form.Control.Feedback type="invalid">
              {errors[`${dia}_fechamento`]}
            </Form.Control.Feedback>

            {/* Feedback visual para erro de horário de funcionamento */}
            {!horarios[dia].abertura || !horarios[dia].fechamento || horarios[dia].abertura >= horarios[dia].fechamento ? (
              <OverlayTrigger
                placement="right"
                overlay={renderTooltip('A hora de fechamento não pode ser anterior à de abertura')}
              >
                <span className="text-danger alinharAviso"><MdError/> Horário inválido</span>
              </OverlayTrigger>
            ) : null}
          </Form.Group>
        ))}

        <div className="w-100">
          <Button
            variant="primary"
            type="submit"
            className="mt-4 px-5 mx-auto d-block"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Salvar Horários'
            )}
          </Button>
        </div>
      </Form>

      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};




function EditarDadosDaEmpresa() {
  const navigate = useNavigate();
  const id_empresa = 71; // ID da empresa (alterado conforme o exemplo fornecido)
  const [formValues, setFormValues] = useState({
    nome_empresa: "",
    nif_empresa: "",
    rua: "",
    bairro: "",
    municipio: "",
    telefone: "",
    email: "",
    data_criacao: "",
    tipo_empresa: "",
    ativo: 1,
    site_empresa: "",
    setor_empresa: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Carregar os dados da empresa ao montar o componente
  useEffect(() => {
    const fetchEmpresaData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/empresas/${id_empresa}`);
        const data = await response.json();
        if (response.ok) {
          // Preencher o formulário com os dados da empresa
          setFormValues({
            nome_empresa: data.nome_empresa,
            nif_empresa: data.nif_empresa,
            telefone: data.telefone,
            email: data.email,
            data_criacao: data.data_criacao.split('T')[0], // Para mostrar a data no formato correto
            tipo_empresa: data.tipo_empresa,
            ativo: data.ativo,
            site_empresa: data.site_empresa || "", // Valor vazio se não houver site
            setor_empresa: data.setor_empresa,
            rua: data.rua || "",
            bairro: data.bairro || "",
            municipio: data.municipio || "",
          });
        } else {
          toast.error("Erro ao carregar os dados da empresa");
        }
      } catch (error) {
        toast.error("Erro ao conectar ao servidor: " + error.message);
      }
    };

    fetchEmpresaData();
  }, [id_empresa]);

  // Função para validar o formulário
  const validateForm = () => {
    const newErrors = {};

    const telefoneRegex = /^[0-9]{9,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/; // Para validar URL

    // Validações
    if (!formValues.nome_empresa) {
      newErrors.nome_empresa = "Nome da empresa é obrigatório.";
    }

    if (!formValues.nif_empresa) {
      newErrors.nif_empresa = "NIF da empresa é obrigatório.";
    } else if (!/^\d{9}$/.test(formValues.nif_empresa)) {
      newErrors.nif_empresa = "O NIF deve ter 9 dígitos.";
    }

    if (!formValues.telefone) {
      newErrors.telefone = "Telefone é obrigatório.";
    } else if (!telefoneRegex.test(formValues.telefone)) {
      newErrors.telefone = "Telefone inválido. Deve ter pelo menos 9 dígitos.";
    }

    if (!formValues.email) {
      newErrors.email = "Email é obrigatório.";
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = "Email inválido.";
    }

    if (!formValues.rua) {
      newErrors.rua = "Endereço é obrigatório.";
    }

    if (!formValues.data_criacao) {
      newErrors.data_criacao = "Data de criação é obrigatória.";
    }

    if (!formValues.tipo_empresa) {
      newErrors.tipo_empresa = "Tipo de empresa é obrigatório.";
    }

    if (formValues.site_empresa && !urlRegex.test(formValues.site_empresa)) {
      newErrors.site_empresa = "URL do site inválida.";
    }

    if (!formValues.setor_empresa) {
      newErrors.setor_empresa = "Setor da empresa é obrigatório.";
    }

    if (!formValues.bairro) {
      newErrors.bairro = "Bairro é obrigatório.";
    }

    if (!formValues.municipio) {
      newErrors.municipio = "Município é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/empresas/${id_empresa}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Erro ao atualizar empresa: ${errorData.message || "Verifique os dados."}`);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      toast.success("Empresa atualizada com sucesso!");

      setTimeout(() => {
        navigate("/pageDefinicoes");
        //window.location.reload();  // Recarrega a página
      }, 5000);

    } catch (error) {
      toast.error("Erro ao conectar ao servidor: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="form-cadastro">

      <h6 className="mt-5">INFORMAÇÕES DA EMPRESA</h6>
      <hr />

      <Form onSubmit={handleCadastro} className="row">
        {/* Seção 1: Informações Gerais da Empresa */}
        <div className="col-12">
          <h6 className="section-title fw-bold">Informações Gerais da Empresa</h6>
          <hr />
        </div>
        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formNomeEmpresa">
            <Form.Label className="fw-Linha">Nome da Empresa</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <MdOutlineDriveFileRenameOutline fontSize={22} color="#0070fa"/>
              </span>
              <Form.Control
                type="text"
                placeholder="Digite o nome da empresa"
                name="nome_empresa"
                value={formValues.nome_empresa}
                onChange={handleInputChange}
                isInvalid={!!errors.nome_empresa}

              />
            </div>
            <Form.Control.Feedback type="invalid">{errors.nome_empresa}</Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formNifEmpresa">
            <Form.Label className="fw-Linha">NIF da Empresa</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <TbNumber  fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
                type="text"
                placeholder="Digite o NIF da empresa"
                name="nif_empresa"
                value={formValues.nif_empresa}
                onChange={handleInputChange}
                isInvalid={!!errors.nif_empresa}
              />
            </div>
            <Form.Control.Feedback type="invalid">{errors.nif_empresa}</Form.Control.Feedback>
          </Form.Group>
        </div>


        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formTipoEmpresa">
            <Form.Label className="fw-Linha">Tipo de Empresa</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaBuildingCircleArrowRight fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
                as="select"
                name="tipo_empresa"
                value={formValues.tipo_empresa}
                onChange={handleInputChange}
                isInvalid={!!errors.tipo_empresa}
              >
                <option value="">Selecione o tipo</option>
                <option value="Microempresa">Microempresa</option>
                <option value="Pequena Empresa">Pequena Empresa</option>
                <option value="Média Empresa">Média Empresa</option>
                <option value="Grande Empresa">Grande Empresa</option>
              </Form.Control>
            </div>
            <Form.Control.Feedback type="invalid">{errors.tipo_empresa}</Form.Control.Feedback>
          </Form.Group>
        </div>


        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formSetorEmpresa">
            <Form.Label className="fw-Linha">Sector da Empresa</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaBuildingCircleCheck  fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
                as="select"
                name="setor_empresa"
                value={formValues.setor_empresa}
                onChange={handleInputChange}
                isInvalid={!!errors.setor_empresa}
              >
                <option value="Automação">Automação</option>
                {/* Adicione mais setores conforme necessário */}
              </Form.Control>

            </div>
            <Form.Control.Feedback type="invalid">{errors.setor_empresa}</Form.Control.Feedback>
            </Form.Group>
        </div>

        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formSiteEmpresa">
            <Form.Label className="fw-Linha">Site da Empresa</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLink fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
            type="text"
            placeholder="Digite o site da empresa"
            name="site_empresa"
            value={formValues.site_empresa}
            onChange={handleInputChange}
            isInvalid={!!errors.site_empresa}
          />

            </div>
            <Form.Control.Feedback type="invalid">{errors.site_empresa}</Form.Control.Feedback>
            </Form.Group>
        </div>


       

        {/* Seção 2: Informações de Contato */}
        <div className="col-12 mt-4">
          <hr />
          <h6 className="section-title fw-bold ">Informações de Contato</h6>
          <hr />
        </div>

        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formTelefone">
            <Form.Label className="fw-Linha">Telefone</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <IoCall fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
            type="text"
            placeholder="Digite o telefone"
            name="telefone"
            value={formValues.telefone}
            onChange={handleInputChange}
            isInvalid={!!errors.telefone}
          />

            </div>
            <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
            </Form.Group>
        </div>

      

        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formEmail">
            <Form.Label className="fw-Linha">Email</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
              <MdOutlineAlternateEmail fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
            type="email"
            placeholder="Digite o email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />

            </div>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
        </div>


        

        {/* Seção 3: Endereço e Data de Criação */}
        <div className="col-12 mt-4">
          <hr />
          <h6 className="section-title fw-bold">Endereço e Data de Criação</h6>
          <hr />
        </div>


        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formRua">
            <Form.Label className="fw-Linha">Rua</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
              <GiRoad fontSize={22} color="#0070fa"/>
               
              </span>
              <Form.Control
            type="text"
            placeholder="Digite o endereço"
            name="rua"
            value={formValues.rua}
            onChange={handleInputChange}
            isInvalid={!!errors.rua}
          />

            </div>
            <Form.Control.Feedback type="invalid">{errors.rua}</Form.Control.Feedback>
            </Form.Group>
        </div>

        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formBairro">
            <Form.Label className="fw-Linha">Bairro</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <RiMapPin2Line fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
            type="text"
            placeholder="Digite o bairro"
            name="bairro"
            value={formValues.bairro}
            onChange={handleInputChange}
            isInvalid={!!errors.bairro}
          />

            </div>
            <Form.Control.Feedback type="invalid">{errors.bairro}</Form.Control.Feedback>
            </Form.Group>
        </div>


        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formMunicipio">
            <Form.Label className="fw-Linha">Município</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaRegMap fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
            type="text"
            placeholder="Digite o município"
            name="municipio"
            value={formValues.municipio}
            onChange={handleInputChange}
            isInvalid={!!errors.municipio}
          />

            </div>
            <Form.Control.Feedback type="invalid">{errors.municipio}</Form.Control.Feedback>
            </Form.Group>
        </div>


        <div className="col-12  col-md-6 col-lg-6 my-1">
          <Form.Group controlId="formDataCriacao">
            <Form.Label className="fw-Linha">Data de Criação</Form.Label>
            <div className="input-group">
              <span className="input-group-text">
                <FaRegCalendarCheck fontSize={22} color="#0070fa" />
              </span>
              <Form.Control
            type="date"
            name="data_criacao"
            value={formValues.data_criacao}
            onChange={handleInputChange}
            isInvalid={!!errors.data_criacao}
          />

            </div>
            <Form.Control.Feedback type="invalid">{errors.data_criacao}</Form.Control.Feedback>
            </Form.Group>
        </div>
     

        {/* Botão de Cadastro */}
        <div className="w-100">
          <Button
            variant="primary"
            type="submit"
            className="mt-4 links-acessos px-5 mx-auto d-block"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Editar Empresa"
            )}
          </Button>
        </div>
      </Form>


      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={4000}  />

    </div>
  );
}





function TabsDefinicoes() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title={<strong>Configurações Gerais</strong>}>
        <EditarDadosDaEmpresa />
      </Tab>
      <Tab eventKey="profile" title={<strong>Horários</strong>}>
        <EmpresaForm />
      </Tab>
      <Tab eventKey="links" title={<strong>Rodapé</strong>}>
        <FormularioEmpresa />
      </Tab>

    </Tabs>
  );
}




const DeficnicoesPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin
              entrada="Definições"
              leftSeta={<BiCog />}



            />

            <div className="vh-100 alturaPereita pt-3">
              <TabsDefinicoes />
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

export default DeficnicoesPage;


/**
 * 
 * 
 * CREATE TABLE empresa_contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,               -- ID único para cada entrada
    telefone VARCHAR(20) NOT NULL,                    -- Campo para telefone
    email VARCHAR(255) NOT NULL,                      -- Campo para email
    whatsapp VARCHAR(20),                             -- Campo para WhatsApp
    rua VARCHAR(255) NOT NULL,                        -- Campo para o nome da rua
    bairro VARCHAR(255),                              -- Campo para o bairro
    municipio VARCHAR(255),                           -- Campo para o município
    facebook VARCHAR(255),                            -- Campo para o link do Facebook
    youtube VARCHAR(255),                             -- Campo para o link do YouTube
    instagram VARCHAR(255),                           -- Campo para o link do Instagram
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora de criação do registro
    empresa_id INT NOT NULL,                          -- ID da empresa (referência a uma tabela de empresas)
    FOREIGN KEY (empresa_id) REFERENCES empresa(id_empresa) -- Chave estrangeira, se houver uma tabela de empresas
);

 */