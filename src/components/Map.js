import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class DemoMap extends Component {
    state = {
        lat: 40.712,
        lng: -74.006,
        zoom: 13,
    }
    render() {
        return (
            this.props.incidents ?
            <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}
            style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={this.state.minZoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              {
               this.props.incidents.map(incident => {
                    if (!incident['Latitude'] || !incident['Latitude']) {
                        const point = [1,1];
                        return
                    } else {
                        const point = [incident['Latitude'],incident['Longitude']]
                        console.log(point);
                    
         
                return (
                <Marker position={point} key={incident['id']} >
                    <Popup>
                        <span>ADDRESS: {incident['STREET_NUMBER']} {incident['STREET_NAME']}, {incident['CITY']} - {incident['POSTCODE']}</span>
                     <br/>
                        <span>NAME: {incident['SITE_NAME']}</span><br/>
                    </Popup>
                </Marker>
  )
                }
 })
}
            </Map>
            :
            'Data is loading...'

         )
     }
 }