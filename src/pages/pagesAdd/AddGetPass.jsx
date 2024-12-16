import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";



import { useState } from "react";
import { Form, Button, Row, Col, InputGroup, FormControl } from "react-bootstrap";

import { MdBuild, MdCalendarToday, MdCardTravel, MdDirectionsCar, MdEmail, MdGasMeter, MdPerson, MdPersonOutline, MdPhone, MdSpeed } from "react-icons/md";

function GatepassForm() {
  const [formData, setFormData] = useState({
    jobcard: "",
    gatepassNo: "G908456",
    customerName: "",
    email: "",
    mobile: "",
    vehicleName: "",
    vehType: "",
    chassis: "",
    kms: "",
    outDate: "2024-12-02 16:19:34"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    console.log(formData);
  };

  return (
    <Form id="demo-form2" onSubmit={handleSubmit} method="post" encType="multipart/form-data" className="form-horizontal form-label-left input_mask gatepassAddForm">
      <Form.Control type="hidden" name="_token" value="WLm7loaaKbBtM0OzBznCmAXeKGxOOP4R5EQkq0De" />

      <div className="col-md-12 col-xs-12 col-sm-12 space mt-5">
        <h6 className="mt-1">INFORMAÇÃO AO CLIENTE</h6>
        <hr />
      </div>

      <Row className="row-mb-0">
        <Col md={6} className="form-group my-form-group">
          <Form.Label htmlFor="jobcard">Número de JobCard <span className="color-danger">*</span></Form.Label>
          <InputGroup>
          <div className="input-group">
              <span className="input-group-text"><MdCardTravel fontSize={20} color="#0070fa" /></span>

            <FormControl
              as="select"
              name="jobcard"
              id="selectjobcard"
              value={formData.jobcard}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o cartão JobCard</option>
              <option value="J000001">J000001</option>
            </FormControl>
            </div>
          </InputGroup>
        </Col>

        <Col md={6} className="form-group">
          <Form.Label htmlFor="gatepass_no">Passe de porta No. <span className="color-danger">*</span></Form.Label>
          <div className="input-group">
              <span className="input-group-text"><MdGasMeter fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="text"
            id="gatepass_no"
            name="gatepass_no"
            value={formData.gatepassNo}
            placeholder="Número de passagem de porta gerado automaticamente"
            readOnly
          />
          </div>
        </Col>
      </Row>

      <Row className="row-mb-0">
        <Col md={6} className="form-group">
          <Form.Label htmlFor="customer">Primeiro nome <span className="color-danger">*</span></Form.Label>
          <div className="input-group">
              <span className="input-group-text"><MdPerson fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="text"
            id="customer"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Introduza o primeiro nome"
            readOnly
          />
          </div>
        </Col>

        <Col md={6} className="form-group">
          <Form.Label htmlFor="lastname">Último nome <span className="color-danger">*</span></Form.Label>
          
          <div className="input-group">
              <span className="input-group-text"><MdPersonOutline fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Insira o último nome"
            readOnly
          />
          </div>
        </Col>
      </Row>

      <Row className="row-mb-0">
        <Col md={6} className="form-group">
          <Form.Label htmlFor="email">E-mail <span className="color-danger">*</span></Form.Label>
          <div className="input-group">
              <span className="input-group-text"><MdEmail fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite e-mail"
            readOnly
          />
          </div>
        </Col>

        <Col md={6} className="form-group">
          <Form.Label htmlFor="mobile">Número de celular <span className="color-danger">*</span></Form.Label>
          <div className="input-group">
              <span className="input-group-text"><MdPhone fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Digite o número de celular"
            readOnly
          />
          </div>
        </Col>
      </Row>

      <div className="col-md-12 col-xs-12 col-sm-12 space">
        <h6 className="mt-5">INFORMAÇÕES DO VEÍCULO</h6>
        <hr />
      </div>

      <Row className="row-mb-0">
        <Col md={6} className="form-group">
          <Form.Label htmlFor="vehicle">Nome do veículo <span className="color-danger">*</span></Form.Label>
          <div className="input-group">
              <span className="input-group-text"><MdDirectionsCar fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="text"
            id="vehicle"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            placeholder="Digite o nome do veículo"
            readOnly
          />
          </div>
        </Col>

        <Col md={6} className="form-group">
          <Form.Label htmlFor="veh_type">Tipo de veículo <span className="color-danger">*</span></Form.Label>
          <div className="input-group">
              <span className="input-group-text"><MdDirectionsCar fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="text"
            id="veh_type"
            name="vehType"
            value={formData.vehType}
            onChange={handleChange}
            placeholder="Digite o tipo de veículo"
            readOnly
          />
          </div>
        </Col>
      </Row>

      <Row className="row-mb-0">
        <Col md={6} className="form-group">
          <Form.Label htmlFor="chassis">Chassis</Form.Label>
          <div className="input-group">
              <span className="input-group-text"><MdBuild  fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="text"
            id="chassis"
            name="chassis"
            value={formData.chassis}
            onChange={handleChange}
            placeholder="Digite o número do chassi"
            readOnly
          /></div>
        </Col>

        <Col md={6} className="form-group">
          <Form.Label htmlFor="kms">KMs. Run <span className="color-danger">*</span></Form.Label>
          <div className="input-group">
              <span className="input-group-text"><MdSpeed fontSize={20} color="#0070fa" /></span>

          <FormControl
            type="text"
            id="kms"
            name="kms"
            value={formData.kms}
            onChange={handleChange}
            placeholder="Digite os Kms. Corridos"
            maxLength="10"
            readOnly
          />
          </div>
        </Col>
      </Row>

      <div className="col-md-12 col-xs-12 col-sm-12 space">
        <h6 className="mt-5">OUTRA INFORMAÇÃO</h6>
        <hr />
      </div>

      <Row>
        <Col md={6} className="form-group">
          <Form.Label htmlFor="outdate_gatepass">Data de saída do veículo <span className="color-danger">*</span></Form.Label>
          <InputGroup>
          <div className="input-group">
              <span className="input-group-text"><MdCalendarToday fontSize={20} color="#0070fa" /></span>

            <FormControl
              type="text"
              id="outdate_gatepass"
              name="outDate"
              value={formData.outDate}
              onChange={handleChange}
              className="form-control gatepassOutdate datepicker"
              required
            />
            </div>
          </InputGroup>
        </Col>
      </Row>
      <Button  type="submit" className="mt-5 addGatepassSubmitButton mx-auto w-25 d-block links-acessos">
            ENVIAR
          </Button>
     
    </Form>
  );
}







export default function AddCompras() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Gate Pass" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR="/ingressoPage" />
            <div className="vh-100 alturaPereita">
              <GatepassForm />
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
