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

    openPopup (marker) {
        if (marker && marker.leafletElement) {
          window.setTimeout(() => {
            marker.leafletElement.openPopup()
          })
        }
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

        const that = this; 
        function filterTypes(obj, accepted) {
            var result = {};
            if (obj !== undefined) {
            for (var type in obj)
                if (accepted.indexOf(type) > -1) 
                    result[type] = obj[type];
            return result;
            }
        }

        function degrees_to_radians(degrees)
        {
            var pi = Math.PI;
            return degrees * (pi/180);
        }

        function distance(position1,position2){
            var lat1=position1.Latitude;
            var lat2=position2.Latitude;
            var lon1=position1.Longitude;
            var lon2=position2.Longitude;
            var R = 6371000; // metres
            var φ1 = degrees_to_radians(lat1);
            var φ2 = degrees_to_radians(lat2);
            var Δφ = degrees_to_radians(lat2-lat1);
            var Δλ = degrees_to_radians(lon2-lon1);
        
            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
            var d = R * c;
            return d;
        }
        

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
                onChange={(info) => this.props.setValues([{'Latitude' : info.latLng.lat, 'Longitude' : info.latLng.lng}])}
                onClick={setTimeout((() => {if (this.props.values !== undefined) {
                    console.log(this.props.values)
                    this.props.values.map(value => {
                    const incidents_pos = that.props.incidents.map(incident => 
                        incident = filterTypes(incident, ['Latitude', 'Longitude']))
                    console.log(incidents_pos)

                    var closest= incidents_pos[0];
                    var closest_distance=distance(closest,value);
                    for(var i=1;i<incidents_pos.length;i++){
                        if(distance(incidents_pos[i],value)<closest_distance){
                            closest_distance=distance(incidents_pos[i],value);
                            closest=incidents_pos[i];
                        }
                    }
                    
                    
                    console.log(closest)
                    const point = [closest['Latitude'], closest['Longitude']]
                    console.log(point)
                    const location = this.props.incidents.filter(incident => 
                        incident.Latitude == closest['Latitude'] && incident.Longitude == closest['Longitude'])
                    console.log(location)

                    setTimeout(alert("Vote here!!!\nADDRESS: " + location[0]['STREET_NUMBER'] + " " 
                    + location[0]['STREET_NAME'] + ", " + location[0]['CITY'] + " - " + location[0]['POSTCODE']
                    + "\n" + "NAME: " + location[0]['SITE_NAME']), 100)
                return (
                    <div>
                <Marker position={point} ref={this.openPopup} key={location['id']} icon={iconBooth} onClick={() => {this.props.setBooth(location)}}>
                    <Popup>
                        <span>Vote here!!!</span>
                    <br/>
                        <span>ADDRESS: {location['STREET_NUMBER']} {location['STREET_NAME']}, {location['CITY']} - {location['POSTCODE']}</span>
                    <br/>
                        <span>NAME: {location['SITE_NAME']}</span><br/><br/>
                    </Popup>
                </Marker></div>
                )}
                )}}),100)}
                closeResultsOnClick={true}
                zoom={15}
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
                }
              )}
                
             
            {/*{(() => {if (this.props.values !== undefined) {
                console.log(this.props.values)
                this.props.values.map(value => {
                const incidents_pos = this.props.incidents.map(incident => 
                    incident = filterTypes(['Latitude', 'Longitude']))
                console.log(incidents_pos)
                
                const pos_dict = findNearest(value, incidents_pos)
                console.log(pos_dict)
                const point = [pos_dict['latitude'], pos_dict['longitude']]
                console.log(point)
                const location = this.props.incidents.filter(incident => 
                    incident.Latitude == pos_dict['latitude'] && incident.Longitude == pos_dict['longitude'])
                console.log(location)
            return (
            <Marker position={point} ref={this.openPopup} key={location['id']} icon={iconBooth} onClick={() => {this.props.setBooth(location)}}>
                <Popup>
                    <span>Vote here!!!</span>
                <br/>
                    <span>ADDRESS: {location['STREET_NUMBER']} {location['STREET_NAME']}, {location['CITY']} - {location['POSTCODE']}</span>
                <br/>
                    <span>NAME: {location['SITE_NAME']}</span><br/><br/>
                </Popup>
            </Marker>
            )}
            )}})}*/}

                
            </Map>
            : 'Data is loading...'
         )
     }

}
 
