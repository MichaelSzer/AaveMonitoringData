import * as AToken from '../contracts/AToken';

export const reserves = {
    'AMPL': {
        symbol: 'AMPL',
        name: 'Ampleforth',
        address: '0xd2eC3a70EF3275459f5c7a1d5930E9024bA3c4f3'
    },

    'BAT': {
        symbol: 'BAT',
        name: 'Basic Attention Token',
        address: '0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738'
    },

    'DAI': {
        symbol: 'DAI',
        name: 'DAI',
        address: '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD'
    },

    'ETH': {
        symbol: 'ETH',
        name: 'Ethereum',
        address: '0x804C0B38593796bD44126102C8b5e827Cf389D80'
    },

    'KNC': {
        symbol: 'KNC',
        name: 'Kyber Network',
        address: '0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8'
    },

    'LEND': {
        symbol: 'LEND',
        name: 'LEND',
        address: '0x1BCe8A0757B7315b74bA1C7A731197295ca4747a'
    },

    'LINK': {
        symbol: 'LINK',
        name: 'Chain Link',
        address: '0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789'
    },

    'MANA': {
        symbol: 'MANA',
        name: 'Decentraland',
        address: '0x738Dc6380157429e957d223e6333Dc385c85Fec7'
    },

    'MKR': {
        symbol: 'MKR',
        name: 'Maker',
        address: '0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA'
    },

    'REP': {
        symbol: 'REP',
        name: 'Augur',
        address: '0x260071C8D61DAf730758f8BD0d6370353956AE0E'
    },

    'SNX': {
        symbol: 'SNX',
        name: 'Synthetix USD',
        address: '0xD868790F57B39C9B2B51b12de046975f986675f9'
    },

    'TUSD': {
        symbol: 'TUSD',
        name: 'TrueUSD',
        address: '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e'
    },

    'USDC': {
        symbol: 'USDC',
        name: 'USD Coin',
        address: '0xe22da380ee6B445bb8273C81944ADEB6E8450422'
    },

    'USDT': {
        symbol: 'USDT',
        name: 'Tether',
        address: '0x13512979ADE267AB5100878E2e0f485B568328a4'
    },

    'WBTC': {
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        address: '0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA'
    },

    'ZRX': {
        symbol: 'ZRX',
        name: '0x Coin',
        address: '0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C'
    }
}

export const fetchReserveData = async (reserveKey) => {
    const reserveData = await window.lendingPoolHttps.methods.getReserveData(reserves[reserveKey].address).call();
    reserves[reserveKey].reserveData = reserveData;
}

export const createAToken = (reserveKey) => {
    const aToken = new window.web3.eth.Contract(AToken.abi, reserves[reserveKey].reserveData.aTokenAddress);
    reserves[reserveKey].aToken = aToken;
}

export const fetchAToken = async (reserveKey) => {
    const aToken = reserves[reserveKey].aToken;
    const aTokenData = {};

    aTokenData.totalSupply = await aToken.methods.totalSupply().call();
    aTokenData.decimals = await aToken.methods.decimals().call();
    aTokenData.exchangeRate = await aToken.methods.getExchangeRate().call();
    aTokenData.name = await aToken.methods.name().call();
    aTokenData.symbol = await aToken.methods.symbol().call();

    reserves[reserveKey].aTokenData = aTokenData;
}

export const fetchUSDPrice = async (reserveKey) => {
    const apiKey = '3e4533986d2dd8a6d1bd845538734ecdca708f59fac8657b4c2f5287185aee12';
    const dataRaw = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${reserves[reserveKey].symbol}&tsyms=USD&api_key=${apiKey}`);
    const usd = (await dataRaw.json()).USD;
    reserves[reserveKey].usd = usd;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export const fetchAllReservesData = async () => {

    const reservesKeys = Object.keys(reserves);
    await asyncForEach(reservesKeys, async (reserveKey) => {
        await fetchReserveData(reserveKey);
        createAToken(reserveKey);
        await fetchAToken(reserveKey);
        await fetchUSDPrice(reserveKey);
    });
    window.ready = true;
    console.log(reserves);
}