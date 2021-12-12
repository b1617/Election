import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Web3 from 'web3';

import Election from './abis/Election.json';
import Footer from './components/Footer';
import Menu from './components/Menu';
import { ICandidate } from './interfaces/Candidate';
import { IContract } from './interfaces/Contract';
import { INetwork } from './interfaces/Network';
import About from './pages/About';
import Candidate from './pages/Candidate';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { setCandidates } from './redux/slices/candidateSlice';
import { setMethods } from './redux/slices/contractSlice';

const App = () => {
    const dispatch = useDispatch();
    const [_, setContract] = useState<IContract>();

    const loadBlockchainData = useCallback(async () => {
        if ((window as any).ethereum) {
            const { ethereum } = window as any;
            (window as any).web3 = new Web3(ethereum);
            const { web3 } = window as any;
            const networkId = await web3.eth.net.getId();
            const network: INetwork = Election.networks[networkId];
            if (network) {
                const electionContract = new web3.eth.Contract(
                    Election.abi,
                    network && network.address
                );

                if (electionContract) {
                    console.log(electionContract.methods);
                    dispatch(setMethods({ ...electionContract.methods }));
                    setContract(electionContract);
                    const candidates: ICandidate[] =
                        await electionContract.methods
                            .getAllCandidates()
                            .call();

                    dispatch(setCandidates(candidates));
                }
            }
        }
    }, []);

    return (
        <BrowserRouter>
            <Menu loadBlockchainData={loadBlockchainData} />
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
                pauseOnFocusLoss={false}
                draggable={false}
                theme="colored"
                pauseOnHover
            />
        </BrowserRouter>
    );
};

export default App;
