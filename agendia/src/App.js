import { useState } from 'react';
import Topo from './componentes/Topo';
import Banner from './componentes/Banner';
import ExperienciaTrabalho from './componentes/ExperienciaTrabalho';
import Rodape from './componentes/Rodape';
import './App.css';

export default function App() {

	const [ehTemaEscuro, setTemaEscuro] = useState(false)

  const alterarTema = () => {
    setTemaEscuro(!ehTemaEscuro)
  }

  return (
    <main>
	    <Topo alterarTema={alterarTema} ehTemaEscuro={ehTemaEscuro}/>
      	<Banner ehTemaEscuro={ehTemaEscuro}/>
      	<ExperienciaTrabalho ehTemaEscuro={ehTemaEscuro}/>
      	<Rodape ehTemaEscuro={ehTemaEscuro}/>
		</main>
  );
}