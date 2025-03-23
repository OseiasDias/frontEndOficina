//import { useState } from "react";
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import AccordionItem from "../../components/compenentesAdmin/AccordionItens";
import Entidades from "../../components/compenentesAdmin/Entidades";
import { MdDashboard } from "react-icons/md";

 


const HomeAdministrador = () => {
  /*const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };*/



  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 vh-100 alturaPereita">

            <TopoAdmin entrada="Painel" icone={<MdDashboard />} direccao="/homeAdministrador" />
            <AccordionItem />
            <Entidades />
       
          

          


          </div>
        </div>
      </div>

    </>
  );
};

export default HomeAdministrador;
