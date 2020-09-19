import React, { Component, Fragment} from 'react';
import axios from 'axios';
import ReactDOM, { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import DemoMap from './components/Map'
import Papa from 'papaparse'

const App = () => {
  const [incidents, setRows] = React.useState([])
  React.useEffect(() => {
    async function getData() {
      const response = await fetch('Voting_Poll_Sites.csv')
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      console.log(csv)
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      console.log(results)
      const incidents = results.data // array of objects
      setRows(incidents)
    }
    getData()
  }, []) // [] means just do this once, after initial render
  console.log(incidents)
    return (
      <DemoMap incidents={incidents}/>
    );
  
}


export default App;
