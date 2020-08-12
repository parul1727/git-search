import React from "react";
import styled from "styled-components";
import moment from 'moment';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";

import IconStar from '../images/icon-star.svg';
import IconDelete from '../images/icon-delete.svg';

class ListItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            commits: 0,
            showDelete: false
        }
        this.fetch(props);
    }

    fetch() {
        this.props.getCommitHistory(this.props.repo);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { id } = this.props.repo;
        if (this.props.commitHistory[id] && prevProps.commitHistory[id] !== this.props.commitHistory[id]) {
            const commits = this.props.commitHistory[id].reduce((total, c) => total += c.total, 0);
            this.setState({ commits });
        }
    }

    render() {
        const { label, pushedAt, color, id } = this.props.repo;
        const user = label.substring(0, label.lastIndexOf("/"));
        const repo = label.substring(label.lastIndexOf("/") + 1, label.length);
        return <Wrapper
            onMouseEnter={() => {
                this.setState({showDelete: true});
                this.props.setHoveredItem(id);
            }}
            onMouseLeave={() => {
                this.setState({showDelete: false});
                this.props.setHoveredItem(-1);
            }}
        >
            <ItemBorder color={color} alt=''></ItemBorder>
            <ItemWrapper>
                <div>
                    <Label>{user} / <span>{repo}</span></Label>
                    <Info>
                        <img src={IconStar}/>
                        <Label><span>{this.state.commits}</span></Label>
                        <Label>{`${this.props.t('Updated')} ${moment(pushedAt).fromNow()}`}</Label>
                    </Info>
                </div>
                {this.state.showDelete && <img src={IconDelete} onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.props.handleDelete(id)
                }} />}
            </ItemWrapper>
        </Wrapper>
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    cursor: pointer;
`

const ItemBorder = styled.div`
    background: ${props => props.color};
    width: 10px;
    border-radius: 4px 0 0 4px;
`

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    background: black;
    color: white;
    padding: 24px 16px;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
    left: -2px;
    
    img{
        height: 16px;
        width: 16px;
    }
`

const Label = styled.div`
    color: #BDBBD2;
    font-weight: 600;
    span{
        color: white;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 4px;
    box-sizing: border-box;
    img{
        height: 16px;
        width: 16px;
    }
    div{
        margin-left: 8px;
    }
`

export default connect(
    state => ({
        commitHistory: state.search.commitHistory
    }),
    dispatch => ({
        getCommitHistory: dispatch.search.getCommitHistory,
        setHoveredItem: dispatch.search.setHoveredItem
    })
) (withTranslation()(ListItem));
