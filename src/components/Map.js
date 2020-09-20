import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Pane, Rectangle } from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";
import '../index.css'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";

export default class DemoMap extends Component {
    state = {
        lat: 40.712,
        lng: -74.006,
        zoom: 13,
    }
    render() {

        
        const outer = [
            [50.505, -29.09],
            [52.505, 29.09],
        ]
        const inner = [
            [49.505, -2.09],
            [53.505, 2.09],
        ]

        const myIcon = L.icon({
            iconUrl: "home.png",    
            iconRetinaUrl: "home.png",  
            iconSize: [40, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });

        const iconBooth = L.icon({
            iconUrl: "vote.png",    
            iconRetinaUrl: "vote.png",  
            iconSize: [40, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });
//this.props.setValues(incident)
        return (
            this.props.incidents ?
            <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}
            style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={this.state.minZoom}>
            <div width='300px'>
            <ReactLeafletSearch 
                className="custom-style"
                position="topright" 
                provider="OpenStreetMap" 
                providerOptions={{ region: "us" }}
                inputPlaceholder="Enter your residence"
                showMarker={true}
                showPopup={true}
                markerIcon={myIcon}
                onChange={(info) => this.props.setValues([info.latLng.lat, info.latLng.lng])}
                style={{right: '200px'}}>
                </ReactLeafletSearch>
            </div>
            
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              {this.props.incidents.map(incident => {
                    if (!incident['Latitude'] || !incident['Latitude']) {
                        const point = [1,1];
                    } else {
                        const point = [incident['Latitude'],incident['Longitude']];
                return (
                <Marker position={point} key={incident['id']} icon={iconBooth} onClick={() => {this.props.setBooth(incident)}}>
                    <Popup>
                        <span>ADDRESS: {incident['STREET_NUMBER']} {incident['STREET_NAME']}, {incident['CITY']} - {incident['POSTCODE']}</span>
                     <br/>
                        <span>NAME: {incident['SITE_NAME']}</span><br/>
                    </Popup>
                </Marker>
                )}
                })}
            </Map>
            : 'Data is loading...'
         )
     }
 }