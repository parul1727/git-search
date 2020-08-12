import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import LineGraph from "./LineGraph";

class GitSearch extends React.Component{
    render() {
        return <Wrapper>
            <GraphBox><LineGraph /></GraphBox>
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
    
    .recharts-tooltip-wrapper{
        /*top: -40px !important;
        left: 0;*/
    }
    .recharts-text.recharts-cartesian-axis-tick-value{
        display: none;
    }
    
    @media all and (max-width: 768px) {
        flex-direction: column-reverse;
    }
`

const GraphBox = styled.div`
    display: flex;
    flex: 1;
`

export default GitSearch;
