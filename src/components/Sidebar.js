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
            selectedRepos: [],
            error: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleInputChange(searchText) {
        this.props.loadSearchList(searchText);
    }

    async handleDelete (id) {
        const repos = [...this.state.selectedRepos];
        const index = repos.indexOf(repos.find(r => r.id === id));
        repos.splice(index, 1);
        this.setState({selectedRepos: repos});

        const commits = {...this.props.commitHistory};
        delete commits[id];
        await this.props.updateCommitHistory(commits);
    }


    render() {
        const { selectedRepos } = this.state;

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
                placeholder={this.props.t('Search a Github Repository...')}
                isClearable={false}
                value={''}
                styles={buildSelectStyle("normal")}
                getOptionValue={option => option.id}
                options={this.props.searchList}
                components={{ Option, DropdownIndicator  }}
                onInputChange={this.handleInputChange}
                onChange={option => {
                    option = {...option, color: getColor()};
                    this.setState({error: ''});
                    const repo = this.state.selectedRepos.find(repo => repo.id === option.id);
                    if (repo) {
                        this.setState({error: this.props.t('Repository already added')});
                    } else {
                        this.setState({selectedRepos: [...selectedRepos, option]});
                    }
                }}
                noOptionsMessage={() => this.props.t('no search result')}
            />
            {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
            <StyledList>
                {selectedRepos.map(repo => <ListItem key={repo.id} repo={repo} handleDelete={this.handleDelete} />)}
            </StyledList>
        </StyledSidebar>
    }
}

const StyledSidebar = styled.div`
    width: 400px;
    background: #37374A;
    padding: 24px;
    box-sizing: border-box;
    @media all and (max-width: 768px) {
         width: 100%;
    }
`;

const SeachIconImg = styled.img`
    height: 16px;
    width: 16px;
`

const StyledList = styled.div`
    &:hover > div {
        opacity: 0.3;
    }
    > div: hover{
        opacity: 1;
    }
`

const ErrorText = styled.div`
    font-size: 12px;
    color: red;
`

export default connect(
    state =>({
        searchList: state.search.searchList,
        commitHistory: state.search.commitHistory
    }),
    dispatch => ({
        loadSearchList: dispatch.search.loadSearchList,
        updateCommitHistory: dispatch.search.updateCommitHistory
    })
) (withTranslation()(Sidebar));
