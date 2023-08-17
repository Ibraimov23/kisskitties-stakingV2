import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                PRODUCT: "Our products",
                FINANCE: "Finance",
                MARKETPLACE: "Marketplace",
                COMICS: "Comics",
                MEMES: "Memes",
                WHITEPAPER: "Whitepaper",
                CONTACTS: "Contacts",

                ENG: "ENG",
                RUS: "RUS",

                BUTTON_TITLE: "Buy $KISS",

                BACK: "Back",
                STAKE: {
                    STAKE_TITLE1: "KISS staking $KISS",
                    STAKE_TITLE2: "Stake LP $KISS/BNB",
                    STAKE_TITLE3: "Stake LP $KISS/BNB",
                    STAKE_TITLE25: "EARN $KISS",
                    STAKE_TITLE35: "EARN $USDT",
                    APR: "APR",
                    EARNED: "Earned",
                    REWARD: "Reward",
                    UNLOCKED: "Unlocked Reward",
                    EARN: "Earn",
                    FEES: "Fees",
                    HARVEST: "Harvest",
                    WITHDRAW1: "WITHDRAW DEPOSIT",
                    WITHDRAW2: "WITHDRAW LP",
                    STAKE: "Stake",
                    INSTAKE: "in Stake",
                    CONNECT: "Connect Wallet",
                    HELPSTAKE1:
                        "Your deposit will be locked for 15 days. However, the rewards will always be available for withdrawal. When withdrawing tokens, a commission may be charged, up to ten percent",
                    HELPSTAKE2:
                        "Add Liquidity to $KISS/BNB pair, get LP tokens, stake LP tokens, and earn $KISS! You can always withdraw the reward, but the LP will be locked for 15 days.",
                    HELPSTAKE3:
                        "Add Liquidity to $KISS/BNB pair, get LP tokens, stake LP tokens, and earn $USDT! You can always withdraw the reward, but the LP will be locked for 15 days.",
                    HELPAPR: "APR is not fixed and can change constantly",
                    SOON: "Soon",
                    HELPSOON:
                        "You can swap your NFT to OSHI at the current rate. You will immediately receive 10% OSHI.. Unlock will start after OSHI listing, 15% per month.",
                    HELPSOON2: "Rate displays how much OSHI costs 1 NFT",
                    BUY: "BUY $KISS",
                },
            },
        },
        ru: {
            translation: {
                PRODUCT: "Наши продукты",
                FINANCE: "Финансы",
                MARKETPLACE: "Маркетплейс",
                COMICS: "Комиксы",
                MEMES: "Мемы",
                WHITEPAPER: "Whitepaper",
                CONTACTS: "Контакты",

                ENG: "АНГ",
                RUS: "РУС",

                BUTTON_TITLE: "Купить $KISS",

                BACK: "Назад",
                STAKE: {
                    STAKE_TITLE: "Внес $KISS - Получил ",
                    APR: "Ставка",
                    REWARD: "Награда",
                    EARNED: "заработано",
                    UNLOCKED: "Разблокированная награда",
                    EARN: "Earn",
                    FEES: "сборы",
                    HARVEST: "Забрать награду",
                    WITHDRAW1: "Вывести",
                    WITHDRAW2: "Вывести",
                    STAKE: "Внести",
                    INSTAKE: "хранится",
                    CONNECT: "Подключить Кошелек",
                    HELPSTAKE1:
                        "Ваш депозит будет заблокирован на 45 дней. Однако вознаграждения всегда будут доступны для вывода. При выводе токенов может взиматься комиссия, до десяти процентов",
                    HELPSTAKE2:
                        "Добавляйте ликвидность к паре $KISS/BNB, получайте токены LP, размещайте токены LP и зарабатывайте $KISS! Вы всегда можете снять награду, но LP будет заблокирован на 45 дней.",
                    HELPSTAKE3:
                        "Добавьте ликвидность к паре $KISS/BNB, получите токены LP, сделайте ставку на токены LP и заработайте USDT! Вы всегда можете снять награду, но LP будет заблокирован на 45 дней.",
                    HELPAPR:
                        "Ставка не является фиксированным и может постоянно меняться",
                    SOON: "Cкоро",
                    HELPSOON:
                        "Вы можете обменять NFT на OSHI по текущему курсу. Вы сразу получите 10% OSHI. Разблокировка начнется после листинга OSHI, 15% в месяц.",
                    HELPSOON2: "Rate отображает сколько OSHI стоит 1 NFT",
                    BUY: "КУПИТЬ $KISS",
                },
            },
        },
    },
    lng: "en",
    fallbackLng: "en",
    debug: true,

    interpolation: {
        escapeValue: false,
    },
    react: {
        wait: true,
        bindI18n: "languageChanged",
    },
});

export default i18n;
