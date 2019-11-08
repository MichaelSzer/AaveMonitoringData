import React from 'react';
import './index.css';
import BigNumber from 'bignumber.js';
import { addressToSymbol } from '../../data/reserves';
import { animations } from 'react-animation';
import { numberWithCommas } from '../../utils/helpers';

class ItemList extends React.PureComponent {

    renderReturnValues = () => {
        
        const { event, returnValues } = this.props;

        switch(event){

            case 'LiquidationCall':
                return (
                    <React.Fragment>
                        <div style={{ width: 360 }} className='events-monitor-list-value'>
                            <p style={{ fontSize: '0.8rem', alignSelf: 'flex-start' }}>{`user`}</p>
                            <p style={{ fontSize: '0.8rem', alignSelf: 'flex-start', paddingTop: 6 }}>{`${returnValues._user}`}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '9rem' }}>
                            <div style={{ width: 72 }} className='events-monitor-list-value'>
                                <p style={{ fontSize: '0.8rem' }}>{`collateral`}</p>
                                <p style={{ fontSize: '1rem', paddingTop: 6 }}>{`${addressToSymbol[returnValues._collateral].symbol}`}</p>
                            </div>
                            <div style={{ width: 72 }} className='events-monitor-list-value'>
                                <p style={{ fontSize: '0.8rem' }}>{`reserve`}</p>
                                <p style={{ fontSize: '1rem', paddingTop: 6 }}>{`${addressToSymbol[returnValues._reserve].symbol}`}</p>
                            </div>
                        </div>
                        <div style={{ width: 72 }} className='events-monitor-list-value'>
                            <p style={{ fontSize: '0.8rem' }}>{`amount`}</p>
                            <p style={{ fontSize: '1rem', paddingTop: 6 }}>{`${numberWithCommas(BigNumber(returnValues._amount).shiftedBy(-18).toFixed(2))}`}</p>
                        </div>
                    </React.Fragment>
                );
                    
            case 'Swap':
                return (
                    <React.Fragment>
                        <div style={{ width: 360 }} className='events-monitor-list-value'>
                            <p style={{ fontSize: '0.8rem', alignSelf: 'flex-start' }}>{`user`}</p>
                            <p style={{ fontSize: '0.8rem', alignSelf: 'flex-start', paddingTop: 6 }}>{`${returnValues._user}`}</p>
                        </div>
                        <div style={{ width: 72 }} className='events-monitor-list-value'>
                            <p style={{ fontSize: '0.8rem' }}>{`reserve`}</p>
                            <p style={{ fontSize: '1rem', paddingTop: 6 }}>{`${addressToSymbol[returnValues._reserve].symbol}`}</p>
                        </div>
                    </React.Fragment>
                );

            case 'Borrow':
            case 'RedeemUnderlying':
            case 'Deposit':
                return (
                    <React.Fragment>
                        <div style={{ width: 360 }} className='events-monitor-list-value'>
                            <p style={{ fontSize: '0.8rem', alignSelf: 'flex-start', color: '#eeeeee' }}>{`user`}</p>
                            <p style={{ fontSize: '0.8rem', alignSelf: 'flex-start', paddingTop: 6 }}>{`${returnValues._user}`}</p>
                        </div>
                        <div style={{ width: '9rem' }} className='events-monitor-list-value'>
                            <p style={{ fontSize: '0.8rem', color: '#eeeeee' }}>{`reserve`}</p>
                            <p style={{ fontSize: '1rem', paddingTop: 6 }}>{`${addressToSymbol[returnValues._reserve].symbol}`}</p>
                        </div>
                        <div style={{ width: 72 }} className='events-monitor-list-value'>
                            <p style={{ fontSize: '0.8rem', color: '#eeeeee' }}>{`amount`}</p>
                            <p style={{ fontSize: '1rem', paddingTop: 6 }}>{`${numberWithCommas(BigNumber(returnValues._amount).shiftedBy(-18).toFixed(2))}`}</p>
                        </div>
                    </React.Fragment>
                );

            default:
                return;
        }
    }

    render(){
        const { event, blockNumber, transactionHash } = this.props;

        return(
            <a id='transaction' style={{ animation: animations.bounceIn }} rel="noopener noreferrer" href={`https://kovan.etherscan.io/tx/${transactionHash}`} target='_blank'>
                <div className="events-monitor-item">
                    <p style={{ fontSize: '1rem', width: '8.5rem', color: 'white' }}>{event}</p>
                    <div className="events-monitor-item-return-values" style={{ flex: 1 }}>
                        {
                            this.renderReturnValues()
                        }                
                    </div>
                    <p style={{ fontSize: '0.8rem', textAlign: 'end', color: 'white' }}>{blockNumber}</p>
                </div>
            </a>
        );
    }
}

const EventsMonitor = ({ events }) => {

    events = events.slice(events.length - 10);

    return(
        <div className="events-monitor">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
                <p style={{ fontSize: '1.2rem' }}>Events Monitor</p>
                <div id="live-streaming" />
            </div>
            <div style={{ width: '100%', height: 1, backgroundColor: 'black', marginBottom: 12 }} />
            <div className="events-monitor-item">
                <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{'Event'}</p>
                <p style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'end' }}>{'Block #'}</p>
            </div>
            <div className="events-monitor-list">
                {events.map(eventObj => <ItemList key={`${eventObj.id}`} {...eventObj} />)}
            </div>
        </div>
    );
}

export default EventsMonitor;