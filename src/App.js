import React, { useState, useCallback, useEffect, Suspense } from "react";
import { Navigation } from "./components";
import { Finance } from "./pages/Finance/Finance";
import styled from "styled-components";
import BgLeft from "./assets/imgs/bg-left.png";
import BgRight from "./assets/imgs/bg-right.png";
import BgTop from "./assets/imgs/bg-top.png";
import { Footer } from "./components/Footer/Footer";
import { WalletConnectPopUp } from "./components/PopUp/WalletConnect";
import { useMetaMask } from './hooks/MetaMask';
import { useWalletConnect } from "./hooks/WalletConnect";
import { StakePopUp } from "./components/PopUp/Stake";
import { WindrawPopUp } from "./components/PopUp/Windraw";
import { SC } from './SmartContracts';
import { loadFull } from "tsparticles"

const StyledAppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient( 90deg, rgba(53,5,48,1) 0%, rgb(105 44 138) 100% );
    position: relative;
    z-index: 1;
    @media (max-width: 1110px) {
        height: 100%;
    }
`;
// background: rgb(16, 45, 97);
//     background: linear-gradient(
//         90deg,
//         rgba(16, 45, 97, 1) 0%,
//         rgba(25, 71, 151, 1) 100%
//     );


// #150633

const StyledAppContainer = styled.div`
    width: 100%;
    max-width: 1920px;
    padding: 10px 32px;
    margin: 0 auto;
    box-sizing: border-box;
    @media (max-width: 650px) {
        padding: 10px 5px 10px 5px;
    }
`;

const StyledFooterContainer = styled.div`
  max-width: 1920px;
  padding: 25px;
  margin: 0 auto;
`;

const StyledBgDecL = styled.div`
  background: url(${BgLeft});
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  top: -60px;
  width: 779px;
  height: 1020px;
  z-index: -1;
  @media (max-width: 875px) {
    width: 610px;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const StyledBgDecR = styled.div`
  background: url(${BgRight});
  position: absolute;
  content: "";
  right: 0;
  top: 90px;
  width: 570px;
  height: 869px;
  z-index: -1;
  @media (max-width: 875px) {
    width: 300px;
  }
`;
const StyledBgDecT = styled.div`
  background: url(${BgTop});
  background-repeat: no-repeat;
  position: absolute;
  right: 100px;
  width: 982px;
  height: 388px;
  z-index: -1;
`;

// const StyledBgDecL = styled.div`
  
//   background-repeat: no-repeat;
//   position: absolute;
//   left: 0;
//   top: -60px;
//   width: 779px;
//   height: 1020px;
//   z-index: -1;
//   @media (max-width: 875px) {
//     width: 610px;
//   }
//   @media (max-width: 650px) {
//     width: 100%;
//   }
// `;
//// background: url(${BgLeft});

/* filter: contrast(120%) saturate(1); opacity: 0.8;*/

//  background: url(${BgRight});

// const StyledBgDecT = styled.div`
//     position: absolute;
//     background: url(${BgTop});
//     background-repeat: no-repeat;
//     width: 100%;
//     height: 100vh;
//     background-size: contain;
//     z-index: -2;
// `;

const changeNetwork = async ({ networkName, setError }) => {
    try {
         if (window.ethereum) {
             await window.ethereum.request({
                 method: "wallet_switchEthereumChain",
                 params: [
                    {
                        chainId: `0x${Number(56).toString(16)}`
                    }
                 ]

             });
         }
        // if (walletConnectProvider) {
        //     await walletConnectProvider.request({
        //         method: "wallet_addEthereumChain",
        //         params: [
        //             {
        //                 ...networks[networkName]
        //             }
        //         ]
        //     })
        // }
    } catch (err) {
        setError(err.message);
    }
}
 changeNetwork({ networkName: 'bsc', setError: console.log });
 //changeNetwork({ networkName: 'bsc tesnet', setError: console.log });



function App() {
    let [ needToApprove, setNeedToApprove ] = useState(false);

    let [ popUpVisible, setPopUpVisibility ] = useState(false);
    let [ stakePopUpVisible, setStakePopUpVisibility ] = useState(false);
    let [ windrawPopUpVisible, setWindrawPopUpVisibility ] = useState(false);

    let { Mconnect, MisActive, Maccount } = useMetaMask();
    let { Wconnect, WisActive, Waccount, Wclient} = useWalletConnect();
    let [ account, setAccount ] = useState(false);
    let [ active, setActive ] = useState(false);
    let [ stakingVersion, setStakingVersion ] = useState("1");
    let [ windrawVersion, setWindrawVersion ] = useState("1");
    let [ walletType, setWalletType ] = useState(null);

    let [ update, setUpdate ] = useState(false);
    let [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = require('./assets/imgs/bg3_auto_x3.png'); 
        image.onload = () => {
          setImageLoaded(true);
        };
    }, []);

    const particlesInit = (engine) => {
        loadFull(engine);
      };

    if (walletType && (Maccount || Waccount) && !account) {
        if (walletType === 'MetaMask') {
            setAccount(Maccount);
            setNeedToApprove(true);
        } else if (walletType === 'WalletConnect') {
            setAccount(Waccount);
            setNeedToApprove(true);
        }
    }

    if ((MisActive || WisActive) && !active) {
        setActive(true);
    }

    let stake = useCallback(async amount => {
        if (stakingVersion === "1") {
            await SC.stake(account, amount);
        } else if (stakingVersion === "2") {
            await SC.stakeV2(account, amount);
        } else if (stakingVersion === "3") {
            await SC.stakeV3(account, amount);
        }
    });
   let windraw = useCallback(async amount => {
       if (windrawVersion === "1") {
           await SC.withdraw(account, amount);
       }
       else if(windrawVersion === "2") {
           await SC.withdrawV2(account, amount);
       } else if(windrawVersion === "3") {
           await SC.withdrawV3(account, amount);
       }
   });
    return (
        <StyledAppWrapper>
            <StakePopUp version={ stakingVersion } visible={stakePopUpVisible} inStake={ stakingVersion === "1" ? SC.inStake : stakingVersion == "2" ? SC.inStakeV2 : stakingVersion == "3" ? SC.inStakeV3 : null} onClose={v => setStakePopUpVisibility(false)} onConfirm={
                async amount => {
                    await stake(amount);
                    setStakePopUpVisibility(false);
                    setUpdate(true);
                }}>
            </StakePopUp>
            <WindrawPopUp version={ windrawVersion } visible={windrawPopUpVisible} inStake={ windrawVersion === "1" ? SC.inStake : windrawVersion === "2" ? SC.inStakeV2 : windrawVersion === "3" ? SC.inStakeV3 :  null} onClose={v => setWindrawPopUpVisibility(false)} onConfirm={
                async amount => {
                    await windraw(amount);
                    setWindrawPopUpVisibility(false);
                    setUpdate(true);
                }
            }>
            </WindrawPopUp>
            <WalletConnectPopUp visible={ active ? !active : popUpVisible } onClose={v => setPopUpVisibility(false)} onConnect={
                async wallet => {
                    if (wallet === 'MetaMask') {
                        window.ethereum === undefined ? window.open('https://metamask.app.link/dapp/kisskitties-staking.vercel.app/','_blank') :          
                        await Mconnect();
                        await SC.init(window.ethereum);
                    } else if (wallet === 'WalletConnect') {
                        await Wconnect()
                        await SC.init(Wclient);
                    }
                     setWalletType(wallet)
                }
            }></WalletConnectPopUp>
            <StyledBgDecR></StyledBgDecR>
            <StyledBgDecL></StyledBgDecL>
            <StyledBgDecT></StyledBgDecT>
            <StyledAppContainer>
                { <Navigation />}
                <Finance
                    update={ update }
                    account={ account }
                    onUseConnection={ () => setPopUpVisibility(true) }
                     onStake={ () => {setStakePopUpVisibility(true); setStakingVersion("1") } }
                     onStakeV2={ () => {setStakePopUpVisibility(true);  setStakingVersion("2")} }
                     onStakeV3={ () => {setStakePopUpVisibility(true);  setStakingVersion("3")} }
                     onWindraw={ () => {setWindrawPopUpVisibility(true);  setWindrawVersion("1")} }
                    needToApprove={ needToApprove }
                />
            </StyledAppContainer>
            <div>
                <hr style={{ opacity: "0.1", marginTop: "100px" }} />
                <StyledFooterContainer>
                    <Footer />
                </StyledFooterContainer>
            </div>
        </StyledAppWrapper>
    );
}

export default App;
