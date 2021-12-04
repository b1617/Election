import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Candidate from './pages/Candidate';
import Menu from './components/Menu';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <BrowserRouter>
            <Menu />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/new" element={<Candidate />} />
                    <Route element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                theme="colored"
                pauseOnHover
            />
        </BrowserRouter>
    );
};

export default App;
