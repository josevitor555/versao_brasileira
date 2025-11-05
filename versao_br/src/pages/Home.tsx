import Header from '../Header';
import HeroSection from '../HeroSection';
import About from '../Sobre';
import Cardapio from '../MenuCardapio';

const Home = () => {
    return (
        <div className="relative">
            <HeroSection />
            <Header />
            <About />
            <Cardapio />
        </div>
    );
}

export default Home;