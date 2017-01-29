import { connect } from 'react-redux';
import React from 'react';
import { submitURL } from '../actions/videoActions';
import { fetchComments } from '../actions/commentsActions';
import { loadVideo } from '../componentHelpers';

const validUrl = require('valid-url');

class InputURL extends React.Component {

  videoSubmit() {
//test location
    // var _this = this;
    // const iframe = document.querySelector('iframe');
    // const player = new Player(iframe);
//test

    let url = this.refs.url.value;
    this.refs.url.value = '';
    if (validUrl.isUri(url) && url.includes('vimeo')) {
      const final = url.substr(url.lastIndexOf('/') + 1);
      url = `https://player.vimeo.com/video/${final}`;
      const data = { url, name: this.props.name };
      this.props.dispatch(submitURL(data))
        .then((video) => {
          this.props.dispatch(fetchComments(data.url));
        })
      loadVideo(url);
      this.props.dispatch(fetchTime())
    } else {
      alert('PLEASE ENTER A VALID VIMEO URL'); // TODO: display an error message for the end user on the page itself.
    }
  }

  render() {
    return (
      <div className="container">
        <input ref="url" placeholder="Add a video..." />
        <button onClick={this.videoSubmit.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default connect(null)(InputURL);
