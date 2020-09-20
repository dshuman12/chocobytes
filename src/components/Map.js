import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
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

        const myIcon = L.icon({
            iconUrl: "home.png",    
            iconRetinaUrl: "home.png",  
            iconSize: [40, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });

        const iconBooth = L.Icon({
            iconUrl: "vote.png",
            iconRetinaUrl: "vote.png",
            iconAnchor: null,
            popupAnchor: null,
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null,
            iconSize: new L.Point(60, 75),
            className: 'leaflet-div-icon'
        });
        

        return (
            this.props.incidents ?
            <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}
            style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={this.state.minZoom}>
            <ReactLeafletSearch 
                className="custom-style"
                position="topleft" 
                provider="OpenStreetMap" 
                providerOptions={{ region: "us" }}
                inputPlaceholder="The default text in the search bar"
                showMarker={true}
                showPopup={false}
                markerIcon={myIcon}>
            </ReactLeafletSearch>
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
                <Marker position={point} key={incident['id']} icon={iconBooth} >
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