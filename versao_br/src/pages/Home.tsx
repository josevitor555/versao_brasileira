import Header from '../Header';
import HeroSection from '../HeroSection';
import About from '../Sobre';
import Cardapio from '../MenuCardapio';
import EventsSection from '../ShowsEventos';

const Home = () => {
    return (
        <div className="relative">
            <HeroSection />
            <Header />
            <About />
            <Cardapio />
            <EventsSection />
        </div>
    );
}

export default Home;