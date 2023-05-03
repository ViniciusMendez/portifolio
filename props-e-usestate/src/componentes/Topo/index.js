import "./style.css"

export default function Topo(props){
    const alterarState = () =>{
        props.tipoAnimal === "cachoro" ? props.setState("gato") : props.setState("cachorro");
    };

    return (
        <header>
            <h1>Projeto Props + useState</h1>
            <p>Clique no botão para mudar os componentes abaixo</p>
            <button onClick={alterarState}>Mudar Animal</button>
        </header>
    )
}