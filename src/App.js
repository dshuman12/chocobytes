import React, { Component, Fragment} from 'react';
import axios from 'axios';
import ReactDOM, { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import DemoMap from './components/Map'
import Papa from 'papaparse'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import logo from './logo.png';
import './custom.scss';
import './styles.css';

const App = () => {
  const [incidents, setRows] = React.useState([]);
  const [openBooth, setBooth] = React.useState();
  const [values, setValues] = React.useState();
  React.useEffect(() => {
    async function getData() {
      const response = await fetch('Voting_Poll_Sites.csv')
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const incidents = results.data // array of objects
      setRows(incidents)
    }
    getData()
  }, []) // [] means just do this once, after initial render
    return (
      <div>
        <ProSidebar>
          <SidebarHeader>
            <Menu iconShape="square" >
              <MenuItem><img src={logo} alt="logo" class="center"></img>
              <h2 class="title">TurboVote</h2>
              <p text-align = "center">Find the nearest voting poll <br></br>and go vote today</p></MenuItem>
              
            </Menu>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
            </Menu>
          </SidebarContent>
          {values && <SidebarFooter>
            <Menu iconShape="square">
                <MenuItem>Home</MenuItem>
                <MenuItem>{values[0]}, {values[1]}</MenuItem>
              </Menu>
          </SidebarFooter>}
        </ProSidebar>;
        <DemoMap incidents={incidents} setBooth={setBooth} setValues={setValues}/>
      </div>
      
    );
  
}


export default App;
