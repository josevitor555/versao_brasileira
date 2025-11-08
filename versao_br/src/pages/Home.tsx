import Header from '../Header';
import HeroSection from '../HeroSection';
import About from '../Sobre';
import Cardapio from '../MenuCardapio';
import EventsSection from '../ShowsEventos';
import GallerySection from '../Geleria';
import TestimonialsSection from '../Depoimentos';
import Contato from '../Contato';

const Home = () => {
    return (
        <div className="relative">

            {/* Banner do site */}
            <HeroSection />

            {/* Cabeçalho */}
            <Header />

            {/* Seção de Sobre */}
            <About />

            {/* Seção de Cardápio */}
            <Cardapio />

            {/* Seção de Eventos e Shows */}
            <EventsSection />

            {/* Seção de Galeria */}
            <GallerySection />

            {/* Seção de Depoimentos */}
            <TestimonialsSection />

            {/* Seção de Contato */}
            <Contato />
        </div>
    );
}

export default Home;
