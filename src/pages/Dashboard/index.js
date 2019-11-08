import React from 'react';
import './index.css';
import TokenStats from '../../components/TokenStats';
import ReserveFinance from '../../components/ReserveFinance';
import EventsMonitor from '../../components/EventsMonitor';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { reservesInfo, fetchData } from '../../data/reserves';

const BigNumber = require('bignumber.js');

class Dashboard extends React.Component {

    state = {
        selected: 'ETH',
        isLoading: true,
        reserve: {},
        allEvents: [],
        eventsFilter: '' 
    };

    render(){

        const { reserve, isLoading, selected, allEvents, eventsFilter } = this.state;
        
        const events = this.filterEvents(allEvents, eventsFilter);

        console.log(events);

        const bnTotalSupply = !isLoading? new BigNumber(reserve.aTokenData.totalSupply) : 0;
        const bnAvailableLiquidity = !isLoading? new BigNumber(reserve.reserveData.availableLiquidity) : 0;
        const bnExchangeRate = !isLoading? new BigNumber(reserve.aTokenData.exchangeRate) : 0;
        const bnLiquidityRate = !isLoading? new BigNumber(reserve.reserveData.liquidityRate) : 0;
        const bnFixedBorrowRate = !isLoading? new BigNumber(reserve.reserveData.fixedBorrowRate) : 0;
        const bnVariableBorrowRate = !isLoading? new BigNumber(reserve.reserveData.variableBorrowRate) : 0;

        const volume = !isLoading? bnTotalSupply.shiftedBy(-Number(reserve.aTokenData.decimals)).toFixed(2) : 0;
        const liquiditySupply = !isLoading? bnAvailableLiquidity.shiftedBy(-18).toFixed(2) : 0;
        const totalUSD = !isLoading? BigNumber(reserve.usd).dividedBy(bnExchangeRate.shiftedBy(-27)).multipliedBy(bnTotalSupply.shiftedBy(-18)).toFixed(2) : 0;
        const liquidityRate = !isLoading? bnLiquidityRate.shiftedBy(-25).toFixed(2) : 0;
        const fixedBorrowRate = !isLoading? bnFixedBorrowRate.shiftedBy(-25).toFixed(2) : 0;
        const variableBorrowRate = !isLoading? bnVariableBorrowRate.shiftedBy(-25).toFixed(2) : 0;

        window.reserve = reserve;

        return(
            <React.Fragment>
                <div className="dashboard">
                    <div className="asset-select">
                        <text style={{ fontSize: 14, paddingRight: 12 }}>
                            {`Asset: `}
                        </text>
                        <FormControl>
                            <Select 
                                style={{ minWidth: 70 }}
                                value={selected}
                                onChange={this.onSelectChange}
                            >
                                {
                                    Object.keys(reservesInfo).map(reserveKey => <MenuItem key={reserveKey} value={reserveKey}>{`${reserveKey}`}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <text style={{ alignSelf: 'center', fontSize: 28, marginBottom: 24, marginTop: 18 }}>
                        {`${isLoading? '-' : reserve.name}`}
                    </text>
                    <ReserveFinance 
                        isLoading={isLoading} 
                        symbol={!isLoading? reserve.symbol : ''} 
                        liquiditySupply={liquiditySupply} 
                        depositInterestRate={liquidityRate} 
                        stableBorrowRate={fixedBorrowRate} 
                        variableBorrowRate={variableBorrowRate} 
                    />
                    <TokenStats 
                        isLoading={isLoading} 
                        symbol={!isLoading? reserve.aTokenData.symbol : ''} 
                        txCount={!isLoading? reserve.txCount : '0'} 
                        volume={volume} 
                        usd={totalUSD}
                    />
                </div>
                <EventsMonitor
                    events={events}
                />
            </React.Fragment>
        );
    }

    filterEvents = (allEvents, eventsFilter) => {
        let events = [];

        switch(eventsFilter){

            case 'Borrow':
                events = allEvents.filter(eventObj => eventObj.event === 'Borrow');
                break;

            case 'Deposit':
                    events = allEvents.filter(eventObj => eventObj.event === 'Deposit');
                    break;

            case 'FlashLoan':
                    events = allEvents.filter(eventObj => eventObj.event === 'FlashLoan');
                    break;

            case 'LiquidationCall':
                events = allEvents.filter(eventObj => eventObj.event === 'LiquidationCall');
                break;

            case 'Swap':
                events = allEvents.filter(eventObj => eventObj.event === 'Swap');
                break;

            case 'Repay':
                    events = allEvents.filter(eventObj => eventObj.event === 'Repay');
                    break;
            
            default:
                events = allEvents;
                break;
        }

        return events;
    }

    processReserve = (reserve) => {

        reserve.txCount = reserve.aTokenData.pastEvents.length;
        return reserve;
    }

    processLendingPool = async () => {

        const allEvents = await window.lendingPool.getPastEvents('allEvents', { fromBlock: 0, toBlock: 'latest' });
        window.lendingPool.events.allEvents({ fromBlock: 'latest' }).on('data', (eventObj) => {
            this.setState({ allEvents: this.state.allEvents.concat([eventObj]) });
        }).on('error', console.error);
        this.setState({ allEvents });
    }

    onSelectChange = async (event) => {
        this.setState({ isLoading: true });

        const selected = event.target.value;
        const rawReserve = await fetchData(selected);
        const reserve = this.processReserve(rawReserve);

        this.setState({ isLoading: false, selected, reserve });
    }

    componentDidMount() {

        this.interval = setInterval(async () => {
            if(!window.ready) return;
            clearInterval(this.interval);
            this.processLendingPool();
            const rawReserve = await fetchData(this.state.selected);
            const reserve = this.processReserve(rawReserve);
            this.setState({ reserve, isLoading: false });
        }, 100);
    }
}

export default Dashboard;