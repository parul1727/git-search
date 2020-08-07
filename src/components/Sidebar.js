import React from "react";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import CreatableSelect, { components } from "react-select";
import { connect } from "react-redux";

import {buildSelectStyle} from "../helpers/style";
import SearchIcon from '../images/icon-search.svg';
import ListItem from "./ListItem";
import {getColor} from "../helpers";

class Sidebar extends React.Component{
    constructor() {
        super();
        this.state = {
            selectedRepos: []
        }
    }
    handleInputChange = (searchText) => {
        this.props.loadSearchList(searchText);
    }

    render() {
        const { selectedRepos } = this.state;
        const { t } = this.props;

        const Option = props => {
            return (
                <components.Option {...props}>
                    {props.data.label}
                </components.Option>
            );
        }

        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <SeachIconImg src={SearchIcon} alt=''/>
                    </components.DropdownIndicator>
                )
            );
        };

        return <StyledSidebar>
            <CreatableSelect
                placeholder='Search a Github Repository...'
                isClearable={false}
                styles={buildSelectStyle("normal")}
                getOptionValue={option => option.id}
                options={this.props.searchList}
                components={{ Option, DropdownIndicator  }}
                onInputChange={this.handleInputChange}
                onChange={option => {
                    option = {...option, color: getColor()}
                    this.setState({selectedRepos: [...selectedRepos, option]})
                }}
            />
            {selectedRepos.map(repo => <ListItem key={repo.id} repo={repo} />)}
        </StyledSidebar>
    }
}

const StyledSidebar = styled.div`
    width: 30%;
    background: #37374A;
    padding: 24px;
    box-sizing: border-box;
`;

const SeachIconImg = styled.img`
    height: 16px;
    width: 16px;
`

export default connect(
    state =>({
        searchList: state.search.searchList
    }),
    dispatch => ({
        loadSearchList: dispatch.search.loadSearchList
    })
) (withTranslation()(Sidebar));
