import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import ReactLeafletSearch from "react-leaflet-search";
import 'index.css'
import L from 'leaflet'
import { BsFillHouseFill } from 'react-icons/bs';

class FullMap extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    minZoom: 2, 
     
      }
    }

  render() {
    const position = [this.state.lat, this.state.lng];

    const myIcon = L.icon({
        iconUrl: "home.png",    
        iconRetinaUrl: "home.png",  
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    return (
        <div>
            <Map center={position} zoom={this.state.zoom}
            style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={this.state.minZoom}>
                <ReactLeafletSearch 
                    className="custom-style"
                    position="topleft" 
                    provider="OpenStreetMap" 
                    providerOptions={{ region: "gb" }}
                    inputPlaceholder="The default text in the search bar"
                    showMarker={true}
                    showPopup={false}
                    markerIcon={myIcon}>
                </ReactLeafletSearch>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
            </Map>
        </div>
    );
  }
}

export default FullMap;