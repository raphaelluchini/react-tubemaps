import React, { Component } from 'react';
import GMapsLoader from './GMapsLoader';
import { connect } from 'react-redux';
import { updateMarker } from './actions';
import './Gmaps.css';
import { updateVideo } from '../Youtube/actions';

export class GMaps extends Component {

  constructor(props) {
    super(props);
    this.mapsLoader = new GMapsLoader();
  }

  getApiRequest(key, { lat, lng }) {
    return fetch(`https://www.googleapis.com/youtube/v3/search?type=video&q=surfing&locationRadius=10mi&location=${lat}%2C${lng}&part=snippet&key=${key}`)
      .then((data) => {
        return data.json();
      })
  }

  componentDidMount() {
    this.mapsLoader.getMaps(this.props.gkey).then((google) => {

      const map = new google.maps.Map(this.refs.map, {
        center: {
          lat: 52.5200,
          lng: 13.4050
        },
        zoom: 10
      })

      let marker = new google.maps.Marker({
        map: map
      });

      google.maps.event.addListener(map, 'click', (event) => {
        this.props.dispatch(updateMarker(event.latLng));
        this.getApiRequest(this.props.gkey, {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }).then((data) => {
          if (data.items && data.items.length > 0) {
            this.props.dispatch(updateVideo(data.items[0]));
          } else {
            alert('No videos in this region');
          }
        });
        marker.setPosition(event.latLng)
      });
    });
  }

  render() {
    return (
      <div ref="map" className="Maps">I should be a map!</div>
    );
  }
}

export default connect()(GMaps);
