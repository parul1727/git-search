import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import styled from "styled-components";
import moment from "moment";
import IconCommit from '../images/icon-commit.svg';

class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.commitHistory && prevProps.commitHistory !== this.props.commitHistory) {
            const {commitHistory} = this.props;
            const data = Object.keys(commitHistory).reduce((data, key, ii) => {
                const repo = commitHistory[key];
                if (repo.length > 0) {
                    repo.map(value => {
                        if (data[value.week]) {
                            data[value.week] = {
                                ...data[value.week],
                                [`total${ii}`]: value.total,
                                [`id${ii}`]: key
                            }
                        } else {
                            data[value.week] = {
                                week: value.week,
                                [`total${ii}`]: value.total,
                                [`id${ii}`]: key
                            }
                        }
                    });
                }
                return data;
            }, {});
            this.setState({data});
        }
    }
    render() {
        const {commitHistory, commitColors} = this.props;

        const CustomTooltip = ({ active, payload }) => {
            if (active && payload) {
                return (
                    <StyledTooltip className="custom-tooltip">
                        <div className="label">{`Week of ${moment.unix(payload[0].payload.week).format('ll')}`}</div>
                        <div className="label icon"><img src={IconCommit} />{`${payload[0].value} commits`}</div>
                    </StyledTooltip>
                );
            }

            return null;
        };

        return (
            <LineChart width={900} height={600} data={Object.values(this.state.data)}
                       margin={{top: 100, right: 50, left: 50, bottom: 55}}>
                <XAxis/>
                <YAxis/>
                <Tooltip content={CustomTooltip}/>
                {Object.keys(commitHistory).map((key, ii) => (
                    <Line
                        key={ii}
                        connectNulls
                        type="monotone"
                        dataKey={`total${ii}`}
                        stroke={commitColors[key]}
                        fill={commitColors[key]}
                        dot={{fill: 'none', r: 3, stroke: commitColors[key]}}
                        activeDot={{fill: commitColors[key], r: 4}}
                    />
                ))}
            </LineChart>
        );
    }
};

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
        display: flex;
        align-items: center;
        img {
            margin-right: 8px;
        }
    }
`

export default connect(
    state => ({
        commitHistory: state.search.commitHistory,
        commitColors: state.search.commitColors
    })
) (withTranslation()(LineGraph));

