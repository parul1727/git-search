import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

class GitSearch extends React.Component{
    render() {
        return <Wrapper>
            <GraphBox>Git Search</GraphBox>
            <Sidebar />
        </Wrapper>
    }
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    font-size: 16px;
`

const GraphBox = styled.div`
    display: flex;
    flex: 1;
`

export default GitSearch;
