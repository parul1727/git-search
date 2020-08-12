import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import styled from "styled-components";
import moment from "moment";
import CommitIcon from "./common/CommitIcon";

class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            graphHeight: 700,
            graphWidth: window.innerWidth - 450,
            margin: {top: 100, right: 50, left: 20, bottom: 55}
        }
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.commitHistory && prevProps.commitHistory !== this.props.commitHistory) {
            const {commitHistory} = this.props;
            const data = Object.keys(commitHistory).map(key => ({
                id: key,
                data: commitHistory[key]
            }));
            this.setState({data});
        }
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, false);
    }

    async handleResize() {
        if (window.innerWidth <= 768) {
            await this.setState({graphWidth: window.innerWidth, graphHeight: 500})
        } else {
            await this.setState({graphWidth: (window.innerWidth - 450), graphHeight: 700})
        }
    }

    render() {
        const {commitColors, hoveredItem} = this.props;

        const CustomTooltip = ({ active, payload, label }) => {
            if (active && payload) {
                return (
                    <StyledTooltip className="custom-tooltip">
                        <div className="label">{`${this.props.t('Week of')} ${moment.unix(label).format('ll')}`}</div>
                        {payload.map((p, ii) =>
                            <div key={ii} className="label icon"><CommitIcon color={p.fill}/><span>{`${p.value} commits`}</span></div>
                        )}
                    </StyledTooltip>
                );
            }

            return null;
        };

        if (this.state.data.length === 0) return '';

        return (
            <LineChart width={this.state.graphWidth} height={this.state.graphHeight}
                       margin={this.state.margin}>
                <XAxis dataKey="week" allowDuplicatedCategory={false} />
                <YAxis dataKey="total"/>
                <Tooltip content={CustomTooltip}/>
                {this.state.data.length  > 0 && this.state.data.map(s => {
                    return (
                        <Line
                            dataKey="total"
                            opacity={hoveredItem === -1 ? 1 : (hoveredItem == s.id ? 1 : 0.3)}
                            stroke={commitColors[s.id]}
                            fill={commitColors[s.id]}
                            data={s.data}
                            key={s.id}
                            type="monotone"
                            dot={{fill: 'white', r: 3, stroke: commitColors[s.id]}}
                            activeDot={{fill: commitColors[s.id], r: 5}}
                            isAnimationActive={false}
                        />
                    )
                })}
            </LineChart>
        );
    }
};

const Wrapper = styled.div`
    &.active{
        .recharts-layer.recharts-line{
            opacity: 0.5;
        }
    }
`

const StyledTooltip = styled.div`
    font-size: 13px;
    background: white;
    box-shadow: rgb(224, 224, 224) -4px 0 5px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
        min-width: 75%;
        display: flex;
        justify-content: start;
        align-items: center;
        svg {
            margin-right: 10px;
        }
    }
`

export default connect(
    state => ({
        commitHistory: state.search.commitHistory,
        commitColors: state.search.commitColors,
        hoveredItem: state.search.hoveredItem
    })
) (withTranslation()(LineGraph));

