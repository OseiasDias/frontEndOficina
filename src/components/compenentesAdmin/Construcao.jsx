import imagemContrucao from "../../assets/pngwing.com.png";


export default function Construcao() {

    return (

        <>
            <div className="div-construtor">
                <h2 className="text-center fw-bold">Página em construção</h2>
                <h4 className="text-center fw-bold">Concluiremos as melhorias até o final da semana.</h4>

                <img src={imagemContrucao} alt="..." className="w-75 d-block mx-auto" />
            </div>
        </>
    )
}