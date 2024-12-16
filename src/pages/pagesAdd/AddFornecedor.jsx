import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { FaArrowLeftLong, FaFileArrowDown } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import {  FaBuilding, FaEnvelope, FaMobileAlt, FaPhone, FaImage, FaMars,  FaGlobe, FaMapMarkerAlt, FaMapPin, FaHome } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';


const AddFornecedor = () => {

  const [formData, setFormData] = useState({
    primeiroNome: '',
    ultimoNome: '',
    nomeEmpresa: '',
    email: '',
    celular: '',
    telefoneFixo: '',
    imagem: null,
    genero: '',
    pais: '',
    estado: '',
    cidade: '',
    endereco: '',
    notas: [{ texto: '', arquivo: null, interno: false, compartilhado: false }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para enviar o formulário
    console.log(formData);
  };


  // Função para adicionar uma nova nota
  const addNote = () => {
    setFormData((prevData) => ({
      ...prevData,
      notas: [
        ...prevData.notas,
        { noteText: '', noteFile: null, internal: false, shared: false },
      ],
    }));
  };

  // Função para remover uma nota
  const removeNote = (index) => {
    setFormData((prevData) => {
      const newNotes = prevData.notas.filter((_, i) => i !== index);
      return { ...prevData, notas: newNotes };
    });
  };

  // Função para atualizar os dados de uma nota específica
  const updateNote = (index, field, value) => {
    const newNotes = [...formData.notas];
    newNotes[index][field] = value;
    setFormData((prevData) => ({ ...prevData, notas: newNotes }));
  };



  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Fornecedores" leftSeta={<FaArrowLeftLong />} leftR="/fornecedorPage" />

            <div className="vh-100 alturaPereita">

              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="col-md-12 mt-5">
                  <h6>INFORMAÇÕES PESSOAIS</h6>
                  <hr />
                </div>

                {/* Nome e Sobrenome */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="primeiroNome">
                      <Form.Label className="fw-900">Primeiro nome <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><IoPerson fontSize={20} color="#0070fa" /></span>
                        <Form.Control
                          type="text"
                          name="primeiroNome"
                          value={formData.primeiroNome}
                          onChange={handleChange}
                          placeholder="Introduza o primeiro nome"
                          maxLength="50"
                        />
                      </div>
                    </Form.Group>

                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="ultimoNome">
                      <Form.Label className="fw-900">Último nome <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><IoPerson fontSize={20} color="#0070fa" /></span>

                        <Form.Control
                          type="text"
                          name="ultimoNome"
                          value={formData.ultimoNome}
                          onChange={handleChange}
                          placeholder="Insira o último nome"
                          maxLength="50"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Nome da empresa e e-mail */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="nomeEmpresa">
                      <Form.Label className="fw-900">Nome da empresa <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaBuilding fontSize={20} color="#0070fa" /></span>

                        <Form.Control
                          type="text"
                          name="nomeEmpresa"
                          value={formData.nomeEmpresa}
                          onChange={handleChange}
                          placeholder="Digite o nome da empresa"
                          maxLength="100"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label className="fw-900">E-mail <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaEnvelope fontSize={20} color="#0070fa" /></span>

                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Digite e-mail"
                          maxLength="50"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Celular e Telefone fixo */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="celular">
                      <Form.Label className="fw-900">Celular <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaMobileAlt fontSize={20} color="#0070fa" /></span>

                        <Form.Control
                          type="text"
                          name="celular"
                          value={formData.celular}
                          onChange={handleChange}
                          placeholder="Digite o número de celular"
                          maxLength="16"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="telefoneFixo">
                      <Form.Label className="fw-900">Telefone fixo</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaPhone fontSize={20} color="#0070fa" /></span>

                        <Form.Control
                          type="text"
                          name="telefoneFixo"
                          value={formData.telefoneFixo}
                          onChange={handleChange}
                          placeholder="Digite o número fixo"
                          maxLength="16"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Imagem e Gênero */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="imagem">
                      <Form.Label className="fw-900">Imagem</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaImage fontSize={20} color="#0070fa" /></span>

                        <Form.Control
                          type="file"
                          name="imagem"
                          onChange={handleFileChange}
                        />
                      </div>

                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-900">Gênero</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaMars fontSize={20} color="#0070fa" /></span>

                        <div className="mx-4">
                          <Form.Check
                            type="radio"
                            label="Masculino"
                            name="genero"
                            value="Masculino"
                            onChange={handleChange}
                            checked={formData.genero === 'Masculino'}

                          />
                          <Form.Check
                            type="radio"
                            label="Feminino"
                            name="genero"
                            value="Feminino"
                            onChange={handleChange}
                            checked={formData.genero === 'Feminino'}
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Endereço */}
                <div className="col-md-12 mt-3">
                  <h6>ENDEREÇO</h6>
                  <hr />
                </div>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="pais">
                      <Form.Label className="fw-900">País <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaGlobe fontSize={20} color="#0070fa" /></span>
                        
                      <Form.Control
                        as="select"
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                      >
                        
                        <option value="">Selecione o país</option>
                        <option value="5">Andorra</option>
                        <option value="8">Antártica</option>
                        <option value="9">Antígua e Barbuda</option>
                        <option value="10">Argentina</option>
                        <option value="11">Armênia</option>
                        <option value="12">Aruba</option>
                        <option value="13">Austrália</option>
                        <option value="14">Áustria</option>
                        <option value="15">Azerbaijão</option>
                        <option value="16">Bahamas</option>
                        <option value="17">Bahrein</option>
                        <option value="18">Bangladesh</option>
                        <option value="19">Barbados</option>
                        <option value="20">Bielorrússia</option>
                        <option value="21">Bélgica</option>
                        <option value="22">Belize</option>
                        <option value="23">Benin</option>
                        <option value="24">Bermudas</option>
                        <option value="25">Butão</option>
                        <option value="26">Bolívia</option>
                        <option value="27">Bósnia e Herzegovina</option>
                        <option value="28">Botsuana</option>
                        <option value="29">Ilha Bouvet</option>
                        <option value="30">Brasil</option>
                        <option value="31">Território Britânico do Oceano Índico</option>
                        <option value="32">Brunei</option>
                        <option value="33">Bulgária</option>
                        <option value="34">Burquina Faso</option>
                        <option value="35">Burundi</option>
                        <option value="36">Camboja</option>
                        <option value="37">Camarões</option>
                        <option value="38">Canadá</option>
                        <option value="39">Cabo Verde</option>
                        <option value="40">Ilhas Cayman</option>
                        <option value="41">República Centro-Africana</option>
                        <option value="42">Chade</option>
                        <option value="43">Chile</option>
                        <option value="44">China</option>
                        <option value="45">Ilha Christmas</option>
                        <option value="46">Ilhas Cocos (Keeling)</option>
                        <option value="47">Colômbia</option>
                        <option value="48">Comores</option>
                        <option value="49">Congo</option>
                        <option value="50">Congo (República Democrática)</option>
                        <option value="51">Ilhas Cook</option>
                        <option value="52">Costa Rica</option>
                        <option value="53">Costa do Marfim</option>
                        <option value="54">Croácia</option>
                        <option value="55">Cuba</option>
                        <option value="56">Chipre</option>
                        <option value="57">República Tcheca</option>
                        <option value="58">Dinamarca</option>
                        <option value="59">Djibuti</option>
                        <option value="60">Dominica</option>
                        <option value="61">República Dominicana</option>
                        <option value="62">Timor-Leste</option>
                        <option value="63">Equador</option>
                        <option value="64">Egito</option>
                        <option value="65">El Salvador</option>
                        <option value="66">Guiné Equatorial</option>
                        <option value="67">Eritreia</option>
                        <option value="68">Estônia</option>
                        <option value="69">Etiópia</option>
                        <option value="70">Territórios Externos da Austrália</option>
                        <option value="71">Ilhas Falkland</option>
                        <option value="72">Ilhas Faroé</option>
                        <option value="73">Ilhas Fiji</option>
                        <option value="74">Finlândia</option>
                        <option value="75">França</option>
                        <option value="76">Guiana Francesa</option>
                        <option value="77">Polinésia Francesa</option>
                        <option value="78">Territórios Franceses do Sul</option>
                        <option value="79">Gabão</option>
                        <option value="80">Gâmbia</option>
                        <option value="81">Geórgia</option>
                        <option value="82">Alemanha</option>
                        <option value="83">Gana</option>
                        <option value="84">Gibraltar</option>
                        <option value="85">Grécia</option>
                        <option value="86">Groenlândia</option>
                        <option value="87">Granada</option>
                        <option value="88">Guadalupe</option>
                        <option value="89">Guam</option>
                        <option value="90">Guatemala</option>
                        <option value="91">Guernsey e Alderney</option>
                        <option value="92">Guiné</option>
                        <option value="93">Guiné-Bissau</option>
                        <option value="94">Guiana</option>
                        <option value="95">Haiti</option>
                        <option value="96">Ilhas Heard e McDonald</option>
                        <option value="97">Honduras</option>
                        <option value="98">Hong Kong</option>
                        <option value="99">Hungria</option>
                        <option value="100">Islândia</option>
                        <option value="101">Índia</option>
                        <option value="102">Indonésia</option>
                        <option value="103">Irã</option>
                        <option value="104">Iraque</option>
                        <option value="105">Irlanda</option>
                        <option value="106">Israel</option>
                        <option value="107">Itália</option>
                        <option value="108">Jamaica</option>
                        <option value="109">Japão</option>
                        <option value="110">Jersey</option>
                        <option value="111">Jordânia</option>
                        <option value="112">Cazaquistão</option>
                        <option value="113">Quênia</option>
                        <option value="114">Kiribati</option>
                        <option value="115">Coreia do Norte</option>
                        <option value="116">Coreia do Sul</option>
                        <option value="117">Kuwait</option>
                        <option value="118">Quirguistão</option>
                        <option value="119">Laos</option>
                        <option value="120">Letônia</option>
                        <option value="121">Líbano</option>
                        <option value="122">Lesoto</option>
                        <option value="123">Libéria</option>
                        <option value="124">Líbia</option>
                        <option value="125">Liechtenstein</option>
                        <option value="126">Lituânia</option>
                        <option value="127">Luxemburgo</option>
                        <option value="128">Macau</option>
                        <option value="129">Macedônia</option>
                        <option value="130">Madagascar</option>
                        <option value="131">Malawi</option>
                        <option value="132">Malásia</option>
                        <option value="133">Maldivas</option>
                        <option value="134">Mali</option>
                        <option value="135">Malta</option>
                        <option value="136">Ilha de Man</option>
                        <option value="137">Ilhas Marshall</option>
                        <option value="138">Martinica</option>
                        <option value="139">Mauritânia</option>
                        <option value="140">Maurício</option>
                        <option value="141">Mayotte</option>
                        <option value="142">México</option>
                        <option value="143">Micronésia</option>
                        <option value="144">Moldávia</option>
                        <option value="145">Mônaco</option>
                        <option value="146">Mongólia</option>
                        <option value="147">Montserrat</option>
                        <option value="148">Marrocos</option>
                        <option value="149">Moçambique</option>
                        <option value="150">Myanmar</option>
                        <option value="151">Namíbia</option>
                        <option value="152">Nauru</option>
                        <option value="153">Nepal</option>
                        <option value="154">Antilhas Neerlandesas</option>
                        <option value="155">Países Baixos</option>
                        <option value="156">Nova Caledônia</option>
                        <option value="157">Nova Zelândia</option>
                        <option value="158">Nicarágua</option>
                        <option value="159">Níger</option>
                        <option value="160">Nigéria</option>
                        <option value="161">Niue</option>
                        <option value="162">Ilha Norfolk</option>
                        <option value="163">Ilhas Mariana do Norte</option>
                        <option value="164">Noruega</option>
                        <option value="165">Omã</option>
                        <option value="166">Paquistão</option>
                        <option value="167">Palau</option>
                        <option value="168">Território Palestino Ocupado</option>
                        <option value="169">Panamá</option>
                        <option value="170">Papua-Nova Guiné</option>
                        <option value="171">Paraguai</option>
                        <option value="172">Peru</option>
                        <option value="173">Filipinas</option>
                        <option value="174">Ilha Pitcairn</option>
                        <option value="175">Polônia</option>
                        <option value="176">Portugal</option>
                        <option value="177">Porto Rico</option>
                        <option value="178">Catar</option>
                        <option value="179">Reunião</option>
                        <option value="180">Romênia</option>
                        <option value="181">Rússia</option>
                        <option value="182">Ruanda</option>
                        <option value="183">Santa Helena</option>
                        <option value="184">São Cristóvão e Nevis</option>
                        <option value="185">Santa Lúcia</option>
                        <option value="186">São Pedro e Miquelon</option>
                        <option value="187">São Vicente e Granadinas</option>
                        <option value="188">Samoa</option>
                        <option value="189">San Marino</option>
                        <option value="190">São Tomé e Príncipe</option>
                        <option value="191">Arábia Saudita</option>
                        <option value="192">Senegal</option>
                        <option value="193">Sérvia</option>
                        <option value="194">Seychelles</option>
                        <option value="195">Serra Leoa</option>
                        <option value="196">Cingapura</option>
                        <option value="197">Eslováquia</option>
                        <option value="198">Eslovênia</option>
                        <option value="199">Territórios Menores do Reino Unido</option>
                        <option value="200">Ilhas Solomon</option>
                        <option value="201">Somália</option>
                        <option value="202">África do Sul</option>
                        <option value="203">Geórgia do Sul</option>
                        <option value="204">Sudão do Sul</option>
                        <option value="205">Espanha</option>
                        <option value="206">Sri Lanka</option>
                        <option value="207">Sudão</option>
                        <option value="208">Suriname</option>
                        <option value="209">Svalbard e Jan Mayen</option>
                        <option value="210">Eswatini</option>
                        <option value="211">Suécia</option>
                        <option value="212">Suíça</option>
                        <option value="213">Síria</option>
                        <option value="214">Taiwan</option>
                        <option value="215">Tajiquistão</option>
                        <option value="216">Tanzânia</option>
                        <option value="217">Tailândia</option>
                        <option value="218">Togo</option>
                        <option value="219">Tokelau</option>
                        <option value="220">Tonga</option>
                        <option value="221">Trinidad e Tobago</option>
                        <option value="222">Tunísia</option>
                        <option value="223">Turquia</option>
                        <option value="224">Turcomenistão</option>
                        <option value="225">Ilhas Turks e Caicos</option>
                        <option value="226">Tuvalu</option>
                        <option value="227">Uganda</option>
                        <option value="228">Ucrânia</option>
                        <option value="229">Emirados Árabes Unidos</option>
                        <option value="230">Reino Unido</option>
                        <option value="231">Estados Unidos</option>
                        <option value="232">Ilhas Menores dos EUA</option>
                        <option value="233">Uruguai</option>
                        <option value="234">Uzbequistão</option>
                        <option value="235">Vanuatu</option>
                        <option value="236">Cidade do Vaticano</option>
                        <option value="237">Venezuela</option>
                        <option value="238">Vietnã</option>
                        <option value="239">Ilhas Virgens (Britânicas)</option>
                        <option value="240">Ilhas Virgens (EUA)</option>
                        <option value="241">Wallis e Futuna</option>
                        <option value="242">Saara Ocidental</option>
                        <option value="243">Iémen</option>
                        <option value="244">Iugoslávia</option>
                        <option value="245">Zâmbia</option>
                        <option value="246">Zimbábue</option>
                        
                      </Form.Control>
                      </div>
                    </Form.Group>
                  </Col>


                  <Col md={6}>
                    <Form.Group controlId="estado">
                
                      <Form.Label className="fw-900">Província/Estado</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaMapMarkerAlt fontSize={20} color="#0070fa" /></span>
                        
                      <Form.Control
                        type="text"  // Alterado para tipo texto
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        placeholder="Digite o nome da província"  // Placeholder para orientação
                      />
                      </div>
                    </Form.Group>
                  </Col>

                </Row>

                <Row>
                  <Col md={6}>
                    {/* Campo Município */}
                    <Form.Group controlId="municipio">
                      <Form.Label className="fw-900">Município</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaMapPin fontSize={20} color="#0070fa" /></span>
                        
                      <Form.Control
                        type="text"  // Alterado para tipo texto
                        name="municipio"
                        value={formData.municipio}
                        onChange={handleChange}
                        placeholder="Digite o nome do município"
                      />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="endereco">
                      <Form.Label className="fw-900">Endereço <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><FaHome fontSize={20} color="#0070fa" /></span>
                        
                      <Form.Control
                        as="textarea"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        placeholder="Digite o endereço"
                        maxLength="100"
                      />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>



                {/* Notas */}
                <div className="col-md-12 mt-5">
                  <div className="d-flex justify-content-between">
                    <h6>ADICIONAR NOTAS</h6>

                    <IoMdAddCircle className="iconeApagarNota" fontSize={32} onClick={addNote} />

                  </div>
                  <hr />


                  {formData.notas.map((note, index) => (
                    <Row key={index} className="notes-row mt-3">
                      <Col md={3}>
                        <Form.Group controlId={`noteText${index}`}>
                          <Form.Label>Texto da Nota</Form.Label>
                          <div className="input-group">
                        <span className="input-group-text"><FaPen fontSize={20} color="#0070fa" /></span>
                        
                          <Form.Control
                            type="text"
                            value={note.noteText}
                            onChange={(e) => updateNote(index, 'noteText', e.target.value)}
                          />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId={`noteFile${index}`}>
                        
                          <Form.Label>Arquivo</Form.Label>
                          <div className="input-group">
                        <span className="input-group-text"><FaFileArrowDown fontSize={20} color="#0070fa" /></span>
                        
                          <Form.Control
                            type="file"
                            onChange={(e) => updateNote(index, 'noteFile', e.target.files[0])}
                          />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mt-4">

                          <Form.Check
                            type="checkbox"
                            label="Nota Interna"
                            checked={note.internal}
                            onChange={(e) => updateNote(index, 'internal', e.target.checked)}
                          />
                          <Form.Check
                            type="checkbox"
                            label="Compartilhado com fornecedor"
                            checked={note.shared}
                            onChange={(e) => updateNote(index, 'shared', e.target.checked)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3} className="text-center">
                        <Button style={{ background: "#00000000" }} className="btnIcone" onClick={() => removeNote(index)}>
                          <MdDeleteForever size={30} className="iconeEliminar" />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </div>

                {/* Botão de envio */}
                <Button type="submit" className="mt-3 w-25 mx-auto d-block links-acessos">
                  Enviar
                </Button>
              </Form>
            </div>
            <div className="div text-center np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">

                Copyright © 2024 Bi-tubo Moters, Ltd. Todos os direitos
                reservados.
                <br />
                Desenvolvido por: Oseias Dias
              </p>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default AddFornecedor;






