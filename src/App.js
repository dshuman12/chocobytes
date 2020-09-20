import React, { Component, Fragment} from 'react';
import axios from 'axios';
import ReactDOM, { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import DemoMap from './components/Map'
import Papa from 'papaparse'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import logo from './logo1.jpg';
import './custom.scss';
import './styles.css';

const App = () => {
  const [incidents, setRows] = React.useState([])
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
            <Menu iconShape="square">
              <MenuItem><img src={logo} alt="logo" class="center"></img>
              <h2 class="title">TurboVote</h2></MenuItem>
              
            </Menu>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem>Dashboard</MenuItem>
              <SubMenu title="Components">
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
              </SubMenu>
              <MenuItem><h1></h1></MenuItem>
              <MenuItem><h1></h1></MenuItem>
              <MenuItem><h1></h1></MenuItem>
              <MenuItem><h1></h1></MenuItem>
              <MenuItem><h1></h1></MenuItem>
              <MenuItem><h1></h1></MenuItem>
              <MenuItem><h1></h1></MenuItem>
              <MenuItem><h1></h1></MenuItem>
              <MenuItem></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
                <MenuItem>Dashboard</MenuItem>
                <SubMenu title="Components">
                  <MenuItem>Component 1</MenuItem>
                  <MenuItem>Component 2</MenuItem>
                </SubMenu>
              </Menu>
          </SidebarFooter>
        </ProSidebar>;
        <DemoMap incidents={incidents}/>
      </div>
      
    );
  
}


export default App;
