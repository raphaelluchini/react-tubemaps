import React, { Component } from 'react';
import './App.css';
import GMaps from './components/GMaps/GMaps';
import YoutubePlayer from './components/Youtube/YoutubePlayer';
import { Provider } from 'react-redux';
import rootReducer from './reducers'
import { createStore } from 'redux'
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export class App extends Component {
  constructor(props) {
    super(props)
    this.gkey = "AIzaSyBN2r9o8oBenqjdIZIOegqx85ovCu-k0uE"
    this.clientId = "795308565581-417blh1f4nmaij2safrbrhr6iadr17jl.apps.googleusercontent.com"
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <GMaps gkey={this.gkey} />
          <YoutubePlayer clientId={this.clientId} />
        </div>
      </Provider>
    );
  }
}

export default App;
