import { FaRegClock, FaToolbox, FaHammer, FaCogs, FaUtensils, FaBook, FaUserAlt } from 'react-icons/fa';  // Ícones de Font Awesome
import LogoTIpo from "../../assets/logo- turbo fundo branco.png";
import "../../css/StylesFuncionario/cartaz.css";
import { PiSignOutBold } from 'react-icons/pi';

const Sidebar = () => {
    return (
        <div className="menu-barra ">
            <nav className='menuLateral vh-100'>
            <img src={LogoTIpo} alt="logotipo small" className='mb-2 d-block mx-auto' width="280px" height="100px"  />

                <ul className="menu-lateral ">
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaRegClock className='icone-menu'  /> Começar o serviço
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaHammer  className='icone-menu' /> Terminar o serviço
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaCogs className='icone-menu' /> Manutenção e limpeza
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaToolbox  className='icone-menu' /> Aguardar Trabalho
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaRegClock className='icone-menu'  /> Aguardar Peças
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaUtensils className='icone-menu' /> Almoço
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaBook className='icone-menu' /> Formação
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaUserAlt className='icone-menu' /> Perfil
                        </a>
                    </li>


                    <li className='linhasMenu'>
                        <a href="#">
                            <PiSignOutBold className='icone-menu' /> sair
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};



export default Sidebar;
