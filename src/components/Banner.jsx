import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import TextoGrupoBanner from './TextoGrupoBanner';
import BarraTopInicial from './BarraTopInicial';
import "../css/iniciarHome.css";



export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section className='vh-100 text-white'>
      <BarraTopInicial />

      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className='seccao-inicio vh-100 seccao-inicioA'>
          <TextoGrupoBanner text="primeiro slide" />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item >
        <Carousel.Item className='seccao-inicioB vh-100 seccao-inicio'>
          <TextoGrupoBanner text="Segundo slide" />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='seccao-inicioC vh-100 seccao-inicio'>
          <TextoGrupoBanner text="Terceiro slide" />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}
