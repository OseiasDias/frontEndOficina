import Accordion from "react-bootstrap/Accordion";
import "../css/faq.css";
import { FiHelpCircle } from 'react-icons/fi'
import { FaArrowDown } from "react-icons/fa";

function Faq() {
  return (
    <div className="faq-seccao  py-5 ">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6">
          <h3 className="perguntasFaq">Nossos Horarios <FaArrowDown fontSize={17} /></h3>
              <div className="horasTrabalho">
                <p className="d-flex justify-content-between pHorarios"><strong>SEGUNDA-FEIRA</strong> 08H00-16H00</p>
                <p className="d-flex justify-content-between pHorarios"><strong>TERÇA-FEIRA</strong> 08H00-16H00</p>
                <p className="d-flex justify-content-between pHorarios"><strong>QUARTA-FEIRA</strong> 08H00-16H00</p>
                <p className="d-flex justify-content-between pHorarios"><strong>QUINTA-FEIRA</strong> 08H00-16H00</p>
                <p className="d-flex justify-content-between pHorarios"><strong>SEXTA-FEIRA</strong> 08H00-16H00</p>
                <p className="d-flex justify-content-between pHorarios"><strong>SABÁDO</strong> 08H00-12H00</p>
                <p className="d-flex justify-content-between pHorarios"><strong>DOMINGO</strong> <span style={{color:'red'}}>fechado</span></p>

              </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6">
            <h3 className="perguntasFaq">Peguntas Frequentes <FaArrowDown fontSize={17} /></h3>
            <Accordion defaultActiveKey="0" className="bordaritem">
              <Accordion.Item eventKey="0"> 
                <Accordion.Header><FiHelpCircle className="iconeFaq" /> <strong >Com que frequência devo fazer a troca de óleo do meu veículo?</strong></Accordion.Header>
                <Accordion.Body className="textAliado" >
                <strong>Resposta:</strong> A troca de óleo deve ser feita a cada 5.000 a 10.000 km, dependendo do tipo de óleo utilizado e das recomendações do fabricante do veículo. Consulte o manual do proprietário para orientações específicas.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header><FiHelpCircle className="iconeFaq" /><strong>O que devo fazer se meu carro apresentar um barulho estranho?</strong></Accordion.Header>
                <Accordion.Body className="textAliado" >
                <strong>Resposta:</strong> Se você ouvir um barulho incomum, é importante trazer seu veículo à nossa oficina o mais rápido possível. Barulhos estranhos podem indicar problemas mecânicos que, se não tratados, podem levar a danos maiores.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header><FiHelpCircle className="iconeFaq" /><strong>Vocês oferecem garantia nos serviços realizados?</strong></Accordion.Header>
                <Accordion.Body className="textAliado">
                <strong>Resposta:</strong> <em>Sim</em>! Oferecemos garantia em todos os serviços realizados na nossa oficina. A duração da garantia pode variar conforme o tipo de serviço, então consulte-nos para mais detalhes.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header><FiHelpCircle className="iconeFaq" /><strong>Como posso saber se preciso alinhar ou balancear meus pneus?</strong></Accordion.Header>
                <Accordion.Body className="textAliado">
                <strong>Resposta:</strong> Se você notar que o volante está desalinhado, seu carro puxa para um lado ou se os pneus estão desgastando irregularmente, é hora de alinhar ou balancear. Recomendamos fazer isso a cada 10.000 km ou sempre que trocar os pneus.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header><FiHelpCircle className="iconeFaq" /><strong>Vocês fazem manutenção preventiva?</strong></Accordion.Header>
                <Accordion.Body className="textAliado">
                <strong>Resposta:</strong> <em>Sim</em>! Oferecemos pacotes de manutenção preventiva que incluem verificações regulares e serviços essenciais para garantir que seu veículo funcione corretamente e evitar problemas futuros.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
