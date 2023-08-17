import React, { useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { StakeItem} from "../../components/StakeItem/Stake-item";


const StyledHeader = styled.h1`
    font-style: normal;
    font-weight: 800;
    font-size: 80px;
    font-family: "montserrat-bold";
    line-height: 117px;
    letter-spacing: -0.03em;
    color: #fff;
    text-align: center;
    letter-spacing: 0.02em;
    -webkit-filter: drop-shadow(9px 11px 0 #98B5CC);
    @media (max-width: 640px) {
        font-size: 70px;
        line-height: 80px;
    }
    @media (max-width: 450px) {
        font-size: 50px;
        line-height: 56px;
        -webkit-filter: unset;
    }
`;

const StyledVelocityx = styled.span`
    -webkit-text-stroke: 7px #ff0035;
    @media (max-width: 450px) {-webkit-text-stroke: unset;}
`;

const StyledArrowBack = styled.p`
  color: #fff;
  display: flex;
  align-items: center;
`;


const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 87.5px;
`;
/*delete margin top*/

const StyledStakeItemContainer = styled.div`
  margin-top: 62px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 32px;
  align-items: flex-start;
`;

export const Finance = ({
    onUseConnection,
    account,
    onStake,
    onWindraw,
    onStakeV2,
    onStakeV3,
    needToApprove,
    update,
    provider
}) => {
    const { t } = useTranslation();
    
    const handleUseConnection = useCallback(() => {
        onUseConnection();
    }, [ onUseConnection ])

    const handleWindraw = useCallback(() => {
      onWindraw();
 }, [ onWindraw ])

     const handleStake = useCallback(() => {
        onStake();
    }, [ onStake ])

    const handleStake2 = useCallback(() => {
        onStakeV2();
    }, [ onStakeV2 ])
    const handleStake3 = useCallback(() => {
        onStakeV3();
    }, [ onStakeV3 ])

    return (
        <div>
            <StyledHeaderContainer>
                <StyledHeader>
                    <StyledVelocityx>KISS&KITTIES</StyledVelocityx> Staking{" "}
                </StyledHeader>
                {/* <StyledHeaderDevider /> */}
            </StyledHeaderContainer>
            <StyledStakeItemContainer>
                <StakeItem
                    key="1"
                    version="1"
                    earnedText="$KISS"
                    activeButton={false}
                    onUseConnection={handleUseConnection}
                    account={account}
                    onStake={handleStake}
                    onWindraw={handleWindraw}
                    needToApprove={needToApprove}
                    update={update}
                    provider={provider}
                />
                <StakeItem
                    key="2"
                    version="2"
                    earnedText="$KISS"
                    activeButton={false}
                    onUseConnection={handleUseConnection}
                    account={account}
                    onStake={handleStake2}
                    needToApprove={needToApprove}
                    update={update}
                    provider={provider}
                />
                <StakeItem
                    key="3"
                    version="3"
                    earnedText="USDT"
                    activeButton={false}
                    onUseConnection={handleUseConnection}
                    account={account}
                    onStake={handleStake3}
                    needToApprove={needToApprove}
                    update={update}
                    provider={provider}
                />
            </StyledStakeItemContainer>
        </div>
    );
};
