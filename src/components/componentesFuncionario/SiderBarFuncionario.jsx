import { FaRegClock, FaToolbox, FaHammer, FaCogs, FaUtensils, FaBook, FaUserAlt } from 'react-icons/fa';  // Ícones de Font Awesome
import LogoTIpo from "../../assets/logo- turbo fundo branco.png";
import "../../css/StylesFuncionario/cartaz.css";
import { PiSignOutBold } from 'react-icons/pi';
import LogoSmall from "../../assets/cropped-logo-turbo-fundo-branco-BB.png";
import { MdContentPasteSearch } from 'react-icons/md';

const Sidebar = () => {
    return (
        <div className="menu-barra">
            <nav className='menuLateral vh-100'>
            <img src={LogoTIpo} alt="logotipo small" className='mb-2 d-block mx-auto logoBig' width="280px" height="100px"  />
            <img src={LogoSmall} alt="logotipo small" className='my-3 ms-4  logoSmall' width="45px" height="37px"  />


                <ul className="menu-lateral ">
                    <li className='linhasMenu'>
                        <a href="#" title='Iniciar'>
                            <MdContentPasteSearch  className='icone-menu'  /> <span className='spanTitle'>Procurar OR</span>
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaHammer  className='icone-menu' /> <span className='spanTitle'>Terminar o serviço</span> 
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaCogs className='icone-menu' />  <span className='spanTitle'>Manutenção e limpeza</span>  
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaToolbox  className='icone-menu' /> <span className='spanTitle'>Aguardar Trabalho</span>  
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaRegClock className='icone-menu'  /> <span className='spanTitle'>Aguardar Peças</span>   
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaUtensils className='icone-menu' /><span className='spanTitle'>Almoço</span>   
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaBook className='icone-menu' /> <span className='spanTitle'>Formação</span>
                        </a>
                    </li>
                    <li className='linhasMenu'>
                        <a href="#">
                            <FaUserAlt className='icone-menu' /> <span className='spanTitle'>Perfil</span>
                        </a>
                    </li>


                    <li className='linhasMenu'>
                        <a href="#">
                            <PiSignOutBold className='icone-menu' /><span className='spanTitle'> sair </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};



export default Sidebar;
