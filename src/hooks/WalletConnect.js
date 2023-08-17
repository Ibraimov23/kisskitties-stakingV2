import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import { injectedWalletConnect } from '../components/Connections/WalletConnectConnector'; 

const WalletConnectContext = React.createContext(null);


export const WalletConnect = ({ children }) => {
    const web3 = useWeb3React();
    const [ Wclient, setSignClient ] = useState();
    const [ sessions, setSessions ] = useState([]);
    const [ Waccount, setAccount ] = useState();
    const Wdeactivate = web3.deactivate;

    const [ WisActive, WsetIsActive ] = useState(false);
    
  
    useEffect(() => {
        if(!Wclient)
            createClient();
        else {
            Wclient.on('disconnect', async() => {
                await Wclient.disconnect();
                window.location.reload();
            })}
    }, [Wclient])

    const createClient = async() => {
        try {
            const provider = await EthereumProvider.init(
                injectedWalletConnect
            );
        setSignClient(provider);
        }catch(e) {
            console.log(e)
        }
    }
    const Wconnect = async() => {
        if(!Wclient) console.log('Cannot connecting...')
        try {
           const tabletaccountId = await Wclient.enable()
           setAccount(tabletaccountId[0])
           WsetIsActive(true);
        }catch(e) {
            console.log(e)
        }
    }
    const onSesionConnect = async(session) => {
        if(!session) console.log('Cannot connecting')
        try{
            setSessions(session);
            setAccount(session.namespaces.eip155.accounts[0].slice(9))
            WsetIsActive(true);
        }catch(e) {
            console.log(e)
        }
    }
    const Mdisconnect = async () => {
        console.log('Disconnecting wallet from App...');
        try {
            await Wdeactivate();
        } catch (error) {
            console.log('Error on disconnnect: ', error);
        }
    }

    const Wvalues = useMemo(
        () => ({
            Waccount,
            Wconnect,
            Mdisconnect,
            Wclient,
            sessions,
            WisActive
        }),
        [ WisActive, Wclient, sessions, Waccount]
    )

    return <WalletConnectContext.Provider value={Wvalues}>{children}</WalletConnectContext.Provider>
}

export const useWalletConnect = () => {
    const context = React.useContext(WalletConnectContext);
    if (!context) {
        throw new Error('This hook must be used with WalletConnect provider.');
    }

    return context;
}