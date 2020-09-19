import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

class SimpleExample extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    minZoom: 2
      }
    }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
        <div>
      <Map center={position} zoom={this.state.zoom}
      style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
      updateWhenZooming={false}
      updateWhenIdle={true}
      preferCanvas={true}
      minZoom={this.state.minZoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      </Map>
      </div>
    );
  }
}

export default SimpleExample;