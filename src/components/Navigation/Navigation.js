import React, { useState } from "react";
import Logo from "./logo.png";
import { NavigationItem } from "../Navigation-item/Navigation-item";
import styled from "styled-components";
import Whitelisted from "../../assets/imgs/get-whitelisted.png";
import { ReactComponent as NavDevider } from "../../assets/svg/nav-devider.svg";
import { ReactComponent as Burger } from "../../assets/svg/burger.svg";
import { LangSelector } from "../Lang-selector/Lang-selector";
import { useTranslation } from "react-i18next";
import {StyledStakeItemBuy } from "../../components/StakeItem/Stake-item";
import WithdrawIcon from "../../assets/imgs/withdraw.png";

const StyledNavContainer = styled.div`
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledNavMenuContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1240px) {
    display: none;
  }
`;

const StyledGetWhitelistedButton = styled.a`
  display: flex;
  align-items: center;
  padding: 15px 24px;
  color: #fff;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-left: 24px;
`;

const StyledGetWhitelistedIcon = styled.div`
  a{
    img {
      @media (max-width: 600px) {
        height: 55px;
        width: 60px;
      }
    }
  }
`;
/*delete margin-top: -25px;  margin-left: -20px;*/
const StyledNavDevider = styled(NavDevider)`
  margin: 0 16px;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-align: center;
  width: 100%;
`;
const StyledBurger = styled.div`
  z-index: 1900;
  display: none;
  span {
  }
`;
const StyledLine = styled.div`
  position: absolute;
  width: 100%;
  height: 80px;
  top: 6em;
  right: 0px;
  left: 0px;
`;

export const Navigation = ({ handleBurgerClick }) => {
  const { t } = useTranslation();

  return (
      <header style={{ display: "flex", alignItems: 'center' }}>
          <StyledNavContainer>
              <StyledBurger>
                  <Burger />
              </StyledBurger>
              <StyledGetWhitelistedIcon>
                  <a style={{ textDecoration: "none" }} href="https://Kisskitties.com/">
                      <img src={Logo} width="75" height="65" alt="" style={{filter: 'brightness(80%) contrast(300%);'}}></img>
                      {/* 1974  x  1378 */}
                  </a>
              </StyledGetWhitelistedIcon>
              <StyledButtonGroup></StyledButtonGroup>
          </StyledNavContainer>
          <div style={{ "margin-left": "auto" }}>
              <StyledStakeItemBuy
                  activeButton={true}
                  target="_blank"
                  href="https://pancakeswap.finance/swap?outputCurrency=0xe89868153f7748f3dB226E4f60a810a1127BF740"
                  style={{ textDecoration: "none" }}
              >
                  <p className="text">{t("STAKE.BUY")}</p>
                  {/* <img src={WithdrawIcon} alt="" /> */}
              </StyledStakeItemBuy>
          </div>
          <StyledLine />
      </header>
  );
};
