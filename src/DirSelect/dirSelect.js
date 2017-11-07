import React, { Component } from 'react';

const electron = window.require('electron');
const { ipcRenderer } =  electron;


const DirSelect = props => (<div>
    <form>
      <div>
        <label htmlFor="item">Directory:</label>
        <input type="text" id="item" autoFocus value={props.path} size="80" />
      </div>
      <button type="submit" onClick={props.onClick}>Choose Directory</button>
    </form>
</div>);

class DirSelectComponent extends Component {

  state = { path: "" }

  componentDidMount = () => {
    ipcRenderer.on('set:dir', (e, item) => {
      this.setState({path: item});
    });
  }

  onClick = (e) => {
    e.preventDefault();
    ipcRenderer.send('get:dir');
  }

  render() {
    return (<div>
    <DirSelect onClick={this.onClick} {...this.state}/>
    </div>);
  }
}

export default DirSelectComponent;
