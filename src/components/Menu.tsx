import { useState, useEffect, useCallback } from 'react';

import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
interface Props {
    loadBlockchainData: () => void;
}

const Menu = ({ loadBlockchainData }: Props) => {
    const dispatch = useDispatch();
    const { account } = useSelector((state: RootState) => state.user);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const handleAccountsChanged = useCallback(
        (accounts: string[]) => {
            if (accounts.length > 0) {
                dispatch(setUser({ account: accounts[0] }));
                setIsConnected(true);
                loadBlockchainData();
                toast.success('Connected');
            } else {
                dispatch(setUser({ account: null }));
                setIsConnected(false);
            }
        },
        [loadBlockchainData, dispatch]
    );

    useEffect(() => {
        const init = async () => {
            if ((window as any).ethereum) {
                const { ethereum } = window as any;
                if (ethereum.isConnected()) {
                    try {
                        const accounts = await ethereum.request({
                            method: 'eth_accounts',
                        });
                        handleAccountsChanged(accounts);
                    } catch {
                        toast.error('Failed to retrieve account');
                    }
                }
            }
        };
        init();
        return () => {
            if ((window as any).ethereum) {
                const { ethereum } = window as any;
                ethereum.removeListener('accountsChanged', () => {
                    toast.success('Disconnected');
                });
            }
        };
    }, [handleAccountsChanged]);

    const connectMetamask = async () => {
        const { ethereum } = window as any;
        if (ethereum && ethereum.isMetaMask) {
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                });
                handleAccountsChanged(accounts);
                ethereum.on('accountsChanged', handleAccountsChanged);
            } catch {
                toast.error('Failed to connect');
            }
        } else {
            toast.error('Please install MetaMask Wallet');
        }
    };

    return (
        <Container>
            <header className="d-flex m-3">
                <Link to="/">
                    <button
                        type="button"
                        className="btn btn-outline-danger me-2"
                    >
                        Election
                    </button>
                </Link>
                <div style={{ marginLeft: 'auto' }}>
                    {isConnected && (
                        <Link to="/new">
                            <button
                                type="button"
                                className="btn btn-outline-primary me-2"
                            >
                                New candidate
                            </button>
                        </Link>
                    )}
                </div>
                <div>
                    <button
                        disabled={isConnected}
                        onClick={connectMetamask}
                        type="button"
                        className="btn btn-outline-success me-2"
                    >
                        {isConnected ? (
                            <span> {account} </span>
                        ) : (
                            <span>Connect to MetaMask </span>
                        )}
                    </button>
                </div>
            </header>
        </Container>
    );
};

export default Menu;
