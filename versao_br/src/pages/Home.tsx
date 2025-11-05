import Header from '../Header';
import HeroSection from '../HeroSection';
import About from '../About';

const Home = () => {
    return (
        <div className="relative">
            <HeroSection />
            <Header />
            <About />
        </div>
    );
}

export default Home;