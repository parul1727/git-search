import React from "react";
import styled from "styled-components";
import moment from 'moment';

import IconStar from '../images/icon-star.svg';
import { getColor } from "../helpers/index";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";

class ListItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            commits: 0
        }
        this.fetch(props);
    }

    fetch() {
        this.props.getCommitHistory(this.props.repo);
    }

    render() {
        const { label, pushedAt, color } = this.props.repo;
        const user = label.substring(0, label.lastIndexOf("/"));
        const repo = label.substring(label.lastIndexOf("/") + 1, label.length);
        return <Wrapper>
            <ItemBorder color={color}></ItemBorder>
            <ItemWrapper>
                <Label>{user} / <span>{repo}</span></Label>
                <Info>
                    <img src={IconStar}/>
                    <Label><span>{this.props.totalCommits}</span></Label>
                    <Label>{moment(pushedAt).fromNow()}</Label>
                </Info>
            </ItemWrapper>
        </Wrapper>
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 16px;
`

const ItemBorder = styled.div`
    background: ${props => props.color};
    width: 10px;
    border-radius: 4px 0 0 4px;
`

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: black;
    color: white;
    padding: 24px 16px;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
    left: -2px;
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
    (state, ownProps) => {
        const commits = state.search.commitHistory[ownProps.repo.id] || [];
        const totalCommits = commits.reduce((total, c) => total += c.total, 0);
        return {
            totalCommits
        }
    },
    dispatch => ({
        getCommitHistory: dispatch.search.getCommitHistory
    })
) (withTranslation()(ListItem));
