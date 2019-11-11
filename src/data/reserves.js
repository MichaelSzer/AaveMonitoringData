import * as AToken from '../contracts/AToken';

export const reservesInfo = {
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

export const addressToSymbol = {

    '0xd2eC3a70EF3275459f5c7a1d5930E9024bA3c4f3': {
        symbol: 'AMPL'
    },

    '0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738': {
        symbol: 'BAT'
    },

    '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD': {
        symbol: 'DAI'
    },

    '0x804C0B38593796bD44126102C8b5e827Cf389D80': {
        symbol: 'ETH'
    },

    '0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8': {
        symbol: 'KNC'
    },

    '0x1BCe8A0757B7315b74bA1C7A731197295ca4747a': {
        symbol: 'LEND'
    },

    '0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789': {
        symbol: 'LINK'
    },

    '0x738Dc6380157429e957d223e6333Dc385c85Fec7': {
        symbol: 'MANA'
    },

    '0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA': {
        symbol: 'MKR'
    },

    '0x260071C8D61DAf730758f8BD0d6370353956AE0E': {
        symbol: 'REP'
    },

    '0xD868790F57B39C9B2B51b12de046975f986675f9': {
        symbol: 'SNX'
    },

    '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e': {
        symbol: 'TUSD'
    },

    '0xe22da380ee6B445bb8273C81944ADEB6E8450422': {
        symbol: 'USDC'
    },
    
    '0x13512979ADE267AB5100878E2e0f485B568328a4': {
        symbol: 'USDT'
    },

    '0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA': {
        symbol: 'WBTC'
    },

    '0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C': {
        symbol: 'ZRX'
    }
}

export let busy = false;

export const fetchReserveData = async (address) => {
    const reserveData = await window.lendingPoolHttps.methods.getReserveData(address).call();
    return reserveData;
}

export const createAToken = (address) => {
    const aToken = new window.web3.eth.Contract(AToken.abi, address);
    return aToken;
}

export const fetchAToken = async (aToken) => {
    const aTokenData = {};

    aTokenData.totalSupply = await aToken.methods.totalSupply().call();
    aTokenData.decimals = await aToken.methods.decimals().call();
    aTokenData.exchangeRate = await aToken.methods.getExchangeRate().call();
    aTokenData.name = await aToken.methods.name().call();
    aTokenData.symbol = await aToken.methods.symbol().call();

    return aTokenData;
}

export const fetchUSDPrice = async (symbol) => {
    const apiKey = '3e4533986d2dd8a6d1bd845538734ecdca708f59fac8657b4c2f5287185aee12';
    const dataRaw = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${apiKey}`);
    const usd = (await dataRaw.json()).USD;
    return usd;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export const fetchAllOnlyReserveData = async () => {
    busy = true;

    const reserves = Object.assign({}, reservesInfo);

    const reservesKeys = Object.keys(reserves);
    await asyncForEach(reservesKeys, async (reserveKey) => {
        reserves[reserveKey].reserveData = await fetchReserveData(reserves[reserveKey].address);
        reserves[reserveKey].usd = await fetchUSDPrice(reserveKey);
    });

    busy = false;

    return reserves;
}

export const fetchAllReservesData = async () => {

    const reserves = Object.assign({}, reservesInfo);

    const reservesKeys = Object.keys(reserves);
    await asyncForEach(reservesKeys, async (reserveKey) => {
        reserves[reserveKey].reserveData = await fetchReserveData(reserves[reserveKey].address);
        reserves[reserveKey].aToken = createAToken(reserves[reserveKey].reserveData.aTokenAddress);
        reserves[reserveKey].aTokenData = await fetchAToken(reserves[reserveKey].aToken);
        reserves[reserveKey].usd = await fetchUSDPrice(reserves[reserveKey].symbol);
        console.log('forEach');
    });

    return reserves;
}

export const fetchData = async (symbol) => {
    busy = true;

    const reserve = reservesInfo[symbol];

    reserve.reserveData = await fetchReserveData(reserve.address);
    reserve.aToken = createAToken(reserve.reserveData.aTokenAddress);
    reserve.aTokenData = await fetchAToken(reserve.aToken);
    reserve.usd = await fetchUSDPrice(reserve.symbol);
    reserve.aTokenData.pastEvents = await reserve.aToken.getPastEvents('allEvents', { fromBlock: 0, toBlock: 'latest' });

    busy = false;

    return reserve;
}