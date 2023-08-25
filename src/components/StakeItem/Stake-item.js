import React, { useCallback, useState, useImperativeHandle, useEffect } from "react";
import styled from "styled-components";
import HelpIcon from "../../assets/imgs/help-icon.png";
import HarvestIcon from "../../assets/imgs/harvest.png";
import WithdrawIcon from "../../assets/imgs/withdraw.png";
import SleepIcon from "../../assets/imgs/zzz.svg";
import { useTranslation } from "react-i18next";
import { SC } from '../../SmartContracts';
import '../../index.css';

const StyledStakeItemContainer = styled.div`
  z-index: 10;
  background: rgba(100, 100, 100, 0.5);
  border-radius: 32px;
  color: #fff;
  box-sizing: border-box;
  padding: 32px;
  filter: brightness(80%) contrast(200%);
  @media (max-width: 600px) {
    min-width: auto !important;
    border-radius: 15px;
    padding-right: 8px;
    padding-left: 8px;
    padding-top: 22px;
    padding-bottom: 22px;
    margin-bottom: 10px;
  }
`;

const StyledStakeItemHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.02em;
  -webkit-justify-content: space-between;
  color: #ffffff;
  p {
    margin: auto;
  }
`;

const StyledStakeItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  p {
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
  span {
    color: #c2abcb;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.02em;
  }
`;

const StyledStakeItemRowWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  gap: 20px;
`;

export const StyledStakeItemBuy = styled.a`
    margin-top: 4px;
    cursor: pointer;
    display: -webkit-box;
    border-radius: 12px;
    letter-spacing: 0.02em;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    padding: 1vh 1vh 1vh 1vh;
    filter: brightness(80%) contrast(300%);
    ${(props) => props.activeButton && "background: linear-gradient(83.53deg, #fd7aa3, #111129 200%);"}
    ${(props) =>
        props.activeButton &&
        "&:hover { background-position: left center; background-size: 200%; box-shadow: 0 0 16px #ff0035; -moz-box-shadow: 0 0 16px #ff0035; -o-box-shadow: 0 0 16px #ff0035; -ms-box-shadow: 0 0 16px #ff0035; -webkit-box-shadow: 0 0 16px #ff0035;}"}
    img {
        margin-left: 12px;
    }
    &:hover {
        background-position: right center;
    }
    p {
        display: flex;
        justify-content: center;
        max-width: 20vh;
        min-width: 12vh;
        font-size: 2.55vh;
        color: #fff;
        font-weight: 500;
        margin: auto;
    }
`;

export const StyledStakeItemButton = styled.a`
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 21px 25px;
    background: linear-gradient( 90deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.1) 50.1%,rgba(255,255,255,0.2) 100% );
    background-size: 200%;
    border-radius: 12px;
    min-width: 24vh;
    /text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    -webkit-letter-spacing: 0.02em;
    -moz-letter-spacing: 0.02em;
    -ms-letter-spacing: 0.02em;
    letter-spacing: 0.02em;
    color: rgb(255,255,255);
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
}
  ${(props) => props.activeButton && "background: linear-gradient(83.53deg, #fd7aa3, #111129 200%);"}
  ${(props) =>
      props.activeButton &&
      "&:hover { background-position: left center; background-size: 200%;box-shadow: 0 0 16px #ff0035; -moz-box-shadow: 0 0 16px #ff0035; -o-box-shadow: 0 0 16px #ff0035; -ms-box-shadow: 0 0 16px #ff0035; -webkit-box-shadow: 0 0 16px #ff0035;}"}
    
  img {
    margin-left: 12px;
  }
  &:hover {
    background-position: right center;
  }
`;

const StyledStakeItemTextWithButton = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: #c2abcb;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.02em;
    font-family: 'Segoe UI', sans-serif;
  }
  p {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
  @media (max-width: 600px) {
    p {
    font-size: 18px;
    }
  }
`;

const StyledAPR = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 6px;
  }
`;

const StyledStakeItemAccountId = styled.div`
    margin-top: 25px;
    opacity: 0.5;
    padding: 5px;
    padding-left: 10px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.2);

    border-radius: 7px;
`;
const StyledStakeItemHelp = styled.span`
.i {
  position: relative;
  top: 2px;
}
.i .tooltip {
  display: none;
  background: #000;
  border-radius: 4px;
  color: #fff;
  padding: 4px 4px 6px;
  font-size: 12px;
  line-height: 130%;
  position: absolute;
  left: calc(50% - 234px/2);
  bottom: 38px;
  width: 234px;
  box-sizing: border-box;
  text-align: center;
  @media (max-width: 600px){left: calc(50% - 420px/2);}
  }
  .i .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(22.svg);
    vertical-align: top;
    margin-top: 3px;
}
.i:hover   .tooltip {display: block;}
.i .tooltip:before{position:absolute;content:'';left:calc(50% - 4px);bottom:-4px;width:8px;height:4px;background-image: url("data:image/svg+xml,%3Csvg width='8' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.01107 4L8 0H0L4.01107 4Z' fill='black'/%3E%3C/svg%3E%0A");}
.apr .tooltip{@media (max-width: 600px){left: calc(50% - 180px/2);}}
`;

export const StakeItem = ({
    version,
    earnedText,
    activeButton,
    onUseConnection,
    account,
    onStake,
    onWindraw,
    needToApprove,
    provider
}, ref) => {
    let [ APR, setAPR ] = useState(0);
    let [ initialized, setInitialized ] = useState(false);
    let [ approved, setApproved ] = useState(false);
    let [ earned, setEarned ] = useState('-');
    let [ inStake, setInStake ]  = useState('-');
    let [ canHarvest, setCanHarvest ] = useState(false);
    let [ canWithdraw, setCanWithdraw ] = useState(false);

    const { t } = useTranslation();

    const handleUseConnection = useCallback(() => {
        onUseConnection();
    }, [ onUseConnection ]);

    const handleStake = useCallback(() => {
        onStake();
    }, [ onStake ])

    const handleWindraw = useCallback(() => {
      onWindraw();
  }, [ onWindraw ])
  
    const harvest = useCallback(async () => {
        if (version === "1") {
          await SC.harvest(account);
        } else if (version === "2") {
          await SC.harvestV2(account);
        }
        else if (version === "3") {
          await SC.harvestV3(account);
        }
    }, [ version, account ]);

    const withdraw = useCallback(async () => {
        if (version === "1") {
          handleWindraw();
        } else if (version === "2") {
          await SC.withdrawV2(account, SC.inStakeV2);
        } else if (version === "3") {
          await SC.withdrawV3(account, SC.inStakeV3);
        }
    }, [ version, account ]);

    const updateData = useCallback(async () => {
      let inStakeRaw, earnedRaw, holdingTimeRaw, stackedTimeRaw,inStakeRawV2,inStakeRawV3;
      if (version === "1") {
          inStakeRaw = await SC.getInStake(account);
          earnedRaw = await SC.getEarned(account);
          holdingTimeRaw =  await SC.getInHoldTime();
          stackedTimeRaw = await SC.getInStackTime(account);
          setInStake(inStakeRaw);
          setEarned(earnedRaw);
      } else if (version === "2") {
          inStakeRawV2 = await SC.getInStakeV2(account);
          earnedRaw = await SC.getEarnedV2(account);
          holdingTimeRaw =  await SC.getInHoldTimeV2();
          stackedTimeRaw = await SC.getInStackTimeV2(account);
          setInStake(inStakeRawV2);
          setEarned(earnedRaw);
      } else if (version === "3") {
          inStakeRawV3 = await SC.getInStakeV3(account);
          earnedRaw = await SC.getEarnedV3(account);
          holdingTimeRaw =  await SC.getInHoldTimeV3();
          stackedTimeRaw = await SC.getInStackTimeV3(account);
          setInStake(inStakeRawV3);
          setEarned(earnedRaw);
      } 
        if(version === "1" || version === "2" || version === "3") {
          setCanHarvest(true);
          setCanWithdraw(!(parseInt(inStakeRaw) <= 0) && !(holdingTimeRaw >= (Math.floor(Date.now() / 1000) - stackedTimeRaw)));
        }

    }, [ account, version, inStake ]);

    const approve = useCallback(async () => {
        let approval;
        if (version === "1") {
            approval = await SC.approve();
        } else if (version === "2") {
            approval = await SC.approveV2();
        } else if (version === "3") {
            approval = await SC.approveV3();
        }
        setApproved(approval);

        updateData();
    }, [ version, updateData ]);

    useEffect(() => {  
        (async () => {
            if (account  && !approved) {
                if (version === "1") {
                    if (await SC.allowance(account)) return setApproved(true);
                } else if (version === "2") {
                    if (await SC.allowanceV2(account)) return setApproved(true);
                } else if(version === "3") {
                    if (await SC.allowanceV3(account)) return setApproved(true);
                } 
              }
        
              if (!initialized && approved) {
                if (version === "1") {
                    setAPR(await SC.APR());
                } else if (version === "2") {
                    setAPR(await SC.APRV2());
                } else if(version == "3") {
                    setAPR(await SC.APRV3());
                }
                setInitialized(true);
                 setInterval(() => {
                   updateData();
               }, 1000);
               
               }
        })();
    }, [
        initialized,
        setInitialized,
        updateData,
        account, earned, version,
        approved,
        setAPR
    ]);
    return (
      <div>
        {version == "1" || version == "2" ?
        <StyledStakeItemContainer>
            { version === "1" ? <StyledStakeItemHeader>
                <p>
                    {t("STAKE.STAKE_TITLE1")}<br /><span>&nbsp;</span>
                </p>
                <StyledStakeItemHelp>
                <span class="i">
                      <img src={HelpIcon} alt="" />
			                <span class="tooltip">			
                      {t("STAKE.HELPSTAKE1")}
		          	</span>
              	</span>
                </StyledStakeItemHelp>
            </StyledStakeItemHeader> : version == "2" ? <StyledStakeItemHeader>
                <p>
                    {t("STAKE.STAKE_TITLE2")}<br /><span>{t("STAKE.STAKE_TITLE25")}</span>
                </p>
                <StyledStakeItemHelp>
                <span class="i apr">
                      <img src={HelpIcon} alt="" />
			                <span class="tooltip">			
                      {t("STAKE.HELPSTAKE2")}
		          	</span>
              	</span>
                </StyledStakeItemHelp>
            </StyledStakeItemHeader> : null}
      <StyledStakeItemRow>
          <StyledAPR>
              <span> {t("STAKE.APR")}</span>
              <StyledStakeItemHelp>
               <span class="i apr">
                <img src={HelpIcon} alt="" />
                <span class="tooltip">			
                {t("STAKE.HELPAPR")}
          </span>
          </span>
          </StyledStakeItemHelp>
          </StyledAPR>
          <p> { APR ? `${APR}%` : '-' }</p>
      </StyledStakeItemRow>
      <StyledStakeItemRowWithButton>
          <StyledStakeItemTextWithButton>
              <span>
                  {earnedText} {t("STAKE.EARNED")}
              </span>
              <p>{ earned }</p>
          </StyledStakeItemTextWithButton>

          {version === "1" ? <StyledStakeItemButton activeButton={ approved && canHarvest } onClick={ approved && canHarvest ? harvest : () => {} }>
              {t("GET REWARD")} 
          </StyledStakeItemButton> : <StyledStakeItemButton activeButton={ false } onClick={ () => {} }>
              {t("GET REWARD")} 
          </StyledStakeItemButton>} {/*Отключено (Убрать проверку на версию и оставить кнопку для version === 1)*/}
      </StyledStakeItemRowWithButton>
      <StyledStakeItemRowWithButton>
          <StyledStakeItemTextWithButton>
              <span>{version == "1" ? '$KISS' : version == "2" ? 'LP' : '???'}&nbsp;{t("STAKE.INSTAKE")}</span>
              <p>{ inStake }</p>
          </StyledStakeItemTextWithButton>

          {version == "1" ? <StyledStakeItemButton activeButton={ approved && canWithdraw} onClick={canWithdraw ? withdraw : () => {}}>
              {(activeButton && `${t("STAKE.STAKE")} $KISS`) ||
                  version == "1" ? `${t("STAKE.WITHDRAW1")}` : `${t("STAKE.WITHDRAW2")}`}{" "}
          </StyledStakeItemButton> : <StyledStakeItemButton activeButton={ false } onClick={() => {}}>
              {(activeButton && `${t("STAKE.STAKE")} $KISS`) ||
                  version == "1" ? `${t("STAKE.WITHDRAW1")}` : `${t("STAKE.WITHDRAW2")}`}{" "}
          </StyledStakeItemButton> } {/*Отключено (Убрать проверку на версию и оставить кнопку для version === 1)*/}
      </StyledStakeItemRowWithButton>
      {version == "1" ? <StyledStakeItemRowWithButton>
          <StyledStakeItemButton onClick={ approved ? handleStake : () => {} } activeButton={approved} style={{ width: '100%' }}>
          {t("STAKE.STAKE")}
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton> : version == "2" ?
      <StyledStakeItemRowWithButton>
           <StyledStakeItemButton onClick={ approved ? handleStake : () => {} } activeButton={approved} style={{ width: '100%' }}>{/*approved ? handleStake : () => {}*/}{/*activeButton={approved}*/}
           {t("STAKE.STAKE")}{/*t(STAKE.STAKE)*/}
          </StyledStakeItemButton>{/*Отключено (вернуть activeButton и handleStake)*/}
</StyledStakeItemRowWithButton>
      :null}
      {version == "2" ? 
      <StyledStakeItemRowWithButton>
          <StyledStakeItemButton onClick={() => window.open('https://pancakeswap.finance/add/BNB/0xe89868153f7748f3dB226E4f60a810a1127BF740', '_blank')} activeButton={ true } style={{ width: '100%' }}>
              {t("Add Liquidity $KISS/BNB")}
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton>
      : null}
      {version == "1" ? <StyledStakeItemRowWithButton>
          <StyledStakeItemButton onClick={ needToApprove ? (!approved ? approve : () => {}) : handleUseConnection } activeButton={ !approved } style={{ width: '100%' }}>
              { needToApprove ? (approved ? 'Approved' : 'Approve') : t("STAKE.CONNECT") }
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton> :
      <StyledStakeItemRowWithButton>
          <StyledStakeItemButton onClick={ needToApprove ? (!approved ? () => {} : () => {}) : handleUseConnection } activeButton={ needToApprove ? false : true } style={{ width: '100%' }}>
              { needToApprove ? (approved ? 'Approved' : 'SOON') : t("STAKE.CONNECT") }
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton> } {/*Отключено (Убрать проверку на версию и оставить кнопку для version === 1)*/}
      { account ? 
          <StyledStakeItemAccountId>Connected as { `${account.slice(0, 6)}...${account.slice(38, 42)}` }</StyledStakeItemAccountId>
          : null
      }
      </StyledStakeItemContainer>

: version == "3" ?
<StyledStakeItemContainer>
{ version === "3" ? <StyledStakeItemHeader>
    <p>
       {t("STAKE.STAKE_TITLE3")}<br /><span>{t("STAKE.STAKE_TITLE35")}</span>
    </p>
    <StyledStakeItemHelp>
    <span class="i">
          <img src={HelpIcon} alt="" />
          <span class="tooltip">			
          {t("STAKE.HELPSTAKE3")}
    </span>
    </span>
    </StyledStakeItemHelp>
</StyledStakeItemHeader> : null}

{ version === "3" ? <StyledStakeItemRow>
<StyledAPR>
  <span>{t("STAKE.APR")}</span>
  <StyledStakeItemHelp>
   <span class="i apr">
    <img src={HelpIcon} alt="" />
    <span class="tooltip">	
        {t("STAKE.HELPAPR")}
    </span>
   </span>
  </StyledStakeItemHelp>
</StyledAPR>
<p> {APR ? `${APR}%` : '-' }</p>
</StyledStakeItemRow> : null}
  {version == "3" ? <StyledStakeItemRowWithButton>
     <div>
        <StyledStakeItemTextWithButton style={{'margin-top': '25px'}}>
            <span> {earnedText} {t("STAKE.EARNED")} </span> <p>{ earned }</p>
        </StyledStakeItemTextWithButton>
         <StyledStakeItemTextWithButton style={{'margin-top': '30px'}}>
            <span>LP {t("STAKE.INSTAKE")}</span>
            <p>{ inStake }</p>
        </StyledStakeItemTextWithButton>
     </div>
     <div>
     {/* <StyledStakeItemButton activeButton={ approved && canHarvest } onClick={ approved && canHarvest ? harvest : () => {} }  style={{'margin-bottom': '4vh', 'textDecoration': 'none'}}>
        {t("WITHDRAW $USDT")}
      </StyledStakeItemButton>
     <StyledStakeItemButton activeButton={ approved && canWithdraw} onClick={canWithdraw ? withdraw : () => {}}>
        {t("STAKE.WITHDRAW2")}
      </StyledStakeItemButton> */}
      <StyledStakeItemButton activeButton={ false } onClick={ () => {} }  style={{'margin-bottom': '4vh', 'textDecoration': 'none'}}>
        {t("WITHDRAW $USDT")}
      </StyledStakeItemButton>
     <StyledStakeItemButton activeButton={ false } onClick={ () => {} }>
        {t("STAKE.WITHDRAW2")}{/*Отключено (Убрать эти две и вернуть закоменченные)*/}
      </StyledStakeItemButton>
    </div>
  </StyledStakeItemRowWithButton>
   : null}

   {version == "3" ? <div>
    <StyledStakeItemRowWithButton>
          <StyledStakeItemButton onClick={ approved ? handleStake : () => {} } activeButton={approved} style={{ width: '100%' }}>{/*approved ? handleStake : () => {}*/}
          {t("STAKE.STAKE")}{/*t(STAKE.STAKE)*/}
          </StyledStakeItemButton>{/*Отключено (вернуть handleStake, activeButton={approved}, надпись)*/}
   </StyledStakeItemRowWithButton>
   <StyledStakeItemRowWithButton>
        <StyledStakeItemButton onClick={() => window.open('https://pancakeswap.finance/add/BNB/0xe89868153f7748f3dB226E4f60a810a1127BF740', '_blank')} activeButton={ true } style={{ width: '100%' }}>
              {t("Add Liquidity $KISS/BNB")}
        </StyledStakeItemButton>
        </StyledStakeItemRowWithButton>
      <StyledStakeItemRowWithButton>
      {/* <StyledStakeItemButton onClick={ needToApprove ? (!approved ? approve : () => {}) : handleUseConnection } activeButton={ !approved } style={{ width: '100%' }}>
        { needToApprove ? (approved ? 'Approved' : 'Approve' ) : t("STAKE.CONNECT") }
       </StyledStakeItemButton> */} 
       <StyledStakeItemButton onClick={ needToApprove ? (!approved ? () => {}: () => {}) : handleUseConnection } activeButton={ needToApprove ? false : true} style={{ width: '100%' }}>
        { needToApprove ? (approved ? 'Approved' : 'SOON' ) : t("STAKE.CONNECT") }
       </StyledStakeItemButton>{/*Отключено (Убрать эту вернуть закоменченную)*/}
</StyledStakeItemRowWithButton>
{ account ? 
<StyledStakeItemAccountId>Connected as { `${account.slice(0, 6)}...${account.slice(38, 42)}` }</StyledStakeItemAccountId>
: null
}
</div> : null}
</StyledStakeItemContainer> : null}
</div>
);
};
