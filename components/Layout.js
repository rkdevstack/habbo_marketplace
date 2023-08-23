import { useState } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export default function Layout({ children }) {
    const [address, setAddress] = useState(null);

    async function connectWallet() {
        const provider = await detectEthereumProvider();
        if (provider) {
            await provider.request({ method: 'eth_requestAccounts' });
            const signer = new ethers.providers.Web3Provider(provider).getSigner();
            const address = await signer.getAddress();
            setAddress(address);
        } else {
            console.log('Please install MetaMask!');
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Habbo Marketplace</h1>
                    <button className={`px-4 py-2 rounded ${address ? 'bg-blue-300 text-blue-800' : 'bg-white text-blue-600'}`} onClick={connectWallet}>
                        {address ? `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connect to MetaMask'}
                    </button>
                    
                </div>
            </header>

            <main className="container mx-auto px-4 mt-12 flex-grow">
                {children}
            </main>

            <footer className="bg-blue-600 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>© 2023 Habbo Marketplace. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
