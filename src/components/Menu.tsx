import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const Menu = () => {
    const [address, setAddress] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);

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
    }, []);

    const handleAccountsChanged = (accounts: string[]) => {
        console.log('handle account changed');
        if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            toast.success('Connected');
        } else {
            setAddress('');
            setIsConnected(false);
        }
    };

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
                    <Link to="/new">
                        <button
                            type="button"
                            className="btn btn-outline-primary me-2"
                        >
                            New candidate
                        </button>
                    </Link>
                </div>
                <div>
                    <button
                        disabled={isConnected}
                        onClick={connectMetamask}
                        type="button"
                        className="btn btn-outline-success me-2"
                    >
                        {isConnected ? (
                            <span> {address} </span>
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
