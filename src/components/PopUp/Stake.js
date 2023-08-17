import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { PopUp } from './PopUp';
import WalletIcon from '../../assets/imgs/wallet.png';
import { useTranslation } from "react-i18next";

const StyledStakeAmount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    padding: 25px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    & input {
        background: transparent;
        border: 0;
        outline: 0;
        color: white;
        font-size: 20px;
        flex: 1;
    }
    & .currency {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        font-weight: 600;
        opacity: .7;
    }
`;

const StyledStakeButtonsRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    margin-top: 20px;
`;

const StyledStakeItemButton = styled.a`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 21px 25px;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.1) 50.1%,
        rgba(255, 255, 255, 0.2) 100%
    );
    background-size: 200%;
    border-radius: 12px;
    flex: 1;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #ffffff;
    transition-duration: 0.2s;
    ${(props) => props.activeButton && "background: #ff0035;"}
    ${(props) =>
        props.activeButton &&
        "&:hover { background-position: left center; background-size: 200%; box-shadow: 0 0 16px #ff0035; -moz-box-shadow: 0 0 16px #ff0035; -o-box-shadow: 0 0 16px #ff0035; -ms-box-shadow: 0 0 16px #ff0035; -webkit-box-shadow: 0 0 16px #ff0035;}"}
        
    img {
        margin-left: 12px;
    }
    &:hover {
        background-position: right center;
    }
`;


export const StakePopUp = ({version, visible, onClose, onConfirm, inStake }) => {
    console.log(inStake)
    let [ amount, setAmount ] = useState(0);
    const { t } = useTranslation();
    
    const handleClose = useCallback(() => {
        onClose(true);
    }, [ onClose ]);

    const handleConfirm = useCallback(() => {
        onConfirm(amount);
    }, [ onConfirm, amount ]);

    const handleInputChange = event => {
        setAmount(+event.target.value);
    }

    return version == '1' ? <PopUp label="Stake $KISS" visible={visible} onClose={ handleClose }>
        <StyledStakeAmount>
            <input type="text" value={ amount } onChange={ handleInputChange }/>
            <div className="currency">
                { inStake || '-' } $KISS
                <img src={WalletIcon} alt="Wallet" />
            </div>
        </StyledStakeAmount>
        <StyledStakeButtonsRow>
            <StyledStakeItemButton onClick={ handleClose }>
                <span>
                    Cancel
                </span>
            </StyledStakeItemButton>
            <StyledStakeItemButton onClick={ () => {handleConfirm() } } activeButton={ true }>
                <span>
                    Confirm
                </span>
            </StyledStakeItemButton>
        </StyledStakeButtonsRow>
    </PopUp> : version == '2' || version == '3' ? <PopUp label="Stake LP" visible={visible} onClose={ handleClose }>
     <StyledStakeAmount>
         <input type="text" value={ amount } onChange={ handleInputChange }/>
         <div className="currency">
             { inStake || '-' } LP
             <img src={WalletIcon} alt="Wallet"/>
         </div>
     </StyledStakeAmount>
     <StyledStakeButtonsRow>
         <StyledStakeItemButton onClick={ handleClose }>
             <span>
                Cancel
             </span>
         </StyledStakeItemButton>
         <StyledStakeItemButton onClick={ () => { handleConfirm()} } activeButton={ true }>
             <span>
                Confirm
             </span>
         </StyledStakeItemButton>
     </StyledStakeButtonsRow>
 </PopUp> : null
}