import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateVideo } from './actions';
import GApi from '../../services/gapi/GApi';
import './YoutubePlayer.css';

export class YoutubePlayer extends Component {

  constructor(props) {
    super(props);
    this.gapi = new GApi();
    this.likeVideo = this.likeVideo.bind(this);
    this.close = this.close.bind(this);
  }

  dispatchLike(videoId) {
    this.gapi.getGApi().client.youtube.videos.rate({
      'id': videoId,
      'rating': 'like'
    })
  }

  likeVideo() {
    this.gapi.getGapi(this.props.clientId).then(() => {
      return this.gapi.isAuthenticated();
    }).then((user) => {
      if (!user.getId()) {
        return this.gapi.signIn();
      } else {
        return user;
      }
    }).then((user) => {
      alert(`You liked ${this.props.video.snippet.title}!`)
      return this.dispatchLike(this.props.video.id.videoId);
    })
  }

  close() {
    this.props.dispatch(updateVideo(null));
  }

  render() {
    if (!this.props.video) {
      return <div className="Player">No Video Selected</div>;
    }
    const videoId = this.props.video.id.videoId;
    const url = `https://youtube.com/embed/${videoId}`;


    return (
      <div className="modal-content">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe title="video" className="video-iframe" src={url}></iframe>
          </div>
          <div>
            <div>{this.props.video.snippet.description}</div>
            <button className="like" onClick={this.likeVideo}>Like this video <span role="img" aria-label="like">👍</span></button>
          </div>
          <button className="modal-close" onClick={this.close}>X</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    video: state.youtube.video,
    position: state.maps.position
  };
}

export default connect(mapStateToProps)(YoutubePlayer)
