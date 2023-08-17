
export const injectedWalletConnect = {
    projectId: process.env.REACT_APP_PRODUCTID,
    chains: [56],
    optionalMethods: ['eth_signTypedData', 'eth_signTypedData_v4', 'eth_sign'],
    showQrModal: true,
    methods:  ["eth_sendTransaction"],
    metadata: {
        name: 'KISSKITTIES Staking',
        description: 'welcome',
        url: 'kisskitties-staking.com',
        icons: ['https://imageup.ru/img167/4477726/1682330039912.jpg']
    },
    events: ['connect','disconnect']
}
