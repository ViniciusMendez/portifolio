import './style.css'

import { useState } from 'react';
export default function LandingPage() {
    const[ehTemaEscuro, setEhTemaEscuro]= useState(false);

    const mudarTema= () =>{
        setEhTemaEscuro(!ehTemaEscuro);
    }

    return(
        <div className={ehTemaEscuro ? 'modo-escuro': 'modo-claro'}>

            <header>
                <div className='limite-secao'>
                    <img className='logomarca' src ="assets/barbearia-logo.png" alt="logomarca"/>
                    <button onClick={mudarTema} className={ehTemaEscuro ? 'modo-escuro': 'modo-claro'}>
                        <img className='bt-icone' src = {ehTemaEscuro ? 'assets/sun.png': 'assets/moon.png'} alt='icone'/>
                        dark
                    </button>
                </div>
            </header>

            <section className='banner'></section>

            <section className='ntexto limite-secao'>
                <div className='limite-secao'>
                    <h1>Bem-Vindo ao Barber Shop</h1>
                    <p className='priparagrafo'>
                        Nossa barbearia sempre oferece profissionais de qualidade e
                        estamos prontos para lidar com suas maiores expectativas.
                    </p>
                    <p className='secparagrafo'>
                        Nossos serviços são dedicados ao seu sucesso pessoal. Aqui temos
                        uma equipe premiada que demonstrou o talento de mestres barbeiros
                        em vários concursos de estilo. Deixe nosso barbeiro ser seu
                        estilista pessoal e você nunca ficará desapontado.
                    </p>

                    <p className='assinatura'>V. Mendes</p>
                </div>
            </section>

        </div>
    );
}