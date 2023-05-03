import "./style.css"
import ImagemCashorro from "../../assets/cachorro.jpg"
import ImagemGato from "../../assets/gato.jpg"

export default function CardAnimal(props){
    return(
        <div className='= CardAnimal'>
            <img src={props.tipoAnimal ==="cachorro" ? ImagemCashorro : ImagemGato } alt="animal" />
        </div>
    )
}