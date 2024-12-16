import CountUp from "react-countup";
import "../css/contUp.css";

const ContUp = () => {
  return (
    <div className="bgCount">
      <div className="container">
        <div className="status row   text-white">
          <div className="colStar col-4 col-md-4 col-lg-4">
            <span className="spanPrimeiro">
              <strong><CountUp start={1} end={530} duration={50} /></strong>
              <span>+</span>
            </span>
            <br />
            <span className="spanPacote">Veículos Atendidos</span>
          </div>

          <div className="colStar col-4 col-md-4 col-lg-4">
            <span className="spanPrimeiro">
              
              <strong><CountUp start={1} end={214} duration={50} /></strong>
              <span>+</span>
            </span>
            <br />
            <span className="spanPacote">Revisões Completas</span>
          </div>

          <div className="colStar col-4 col-md-4 col-lg-4">
            <span className="spanPrimeiro">
              <strong><CountUp start={1} end={337} duration={50} /></strong>
              <span>+</span>
            </span>
            <br />
            <span className="spanPacote">Manutenções Rápidas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContUp;
