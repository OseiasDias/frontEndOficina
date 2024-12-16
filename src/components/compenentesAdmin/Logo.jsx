import logoBiTurbo  from '../../assets/img/logo- turbo fundo branco.png';

export default function Logo(){

    return(

        <div className="logo">
            <div className="logo-icon">
                <img src={logoBiTurbo} width={175}  className=' d-block mt-2'  alt="Logotipo da Bi-Turbo" />
            </div>
        </div>
    )
}