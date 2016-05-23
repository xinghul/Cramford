"use strict"

import React from "react"
import { Button, Glyphicon, Accordion, Panel } from "react-bootstrap"

import styles from "./ItemFilterApp.css"

import ColorFilter from "./ColorFilter.jsx"
import ItemDisplayStore from "stores/ItemDisplayStore"

function getStateFromStores() {
  return {
    filters: ItemDisplayStore.getFilters()
  }
}

export default class ItemFilterApp extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      filters: ItemDisplayStore.getFilters(),
      
      isCollapsed: false
    };
  }
  
  componentDidMount() {
    ItemDisplayStore.addChangeListener(this._onChange);    
  }
  
  componentWillUnmount() {
    ItemDisplayStore.removeChangeListener(this._onChange);
  }
  
  _onChange = () => {
    this.setState(getStateFromStores());
  };
  
  handleCollapseButtonClick = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  };
  
  createFilterItems() {
    return (
      <div className="filter-item-section">
        <ColorFilter />
      </div>
    );
  }
  
  render() {
    
    let glyph = do {
      if (this.state.isCollapsed) {
        "chevron-right"
      } else {
        "chevron-left"
      }
    }
    
    let width = do {
      if (this.state.isCollapsed) {
        "20px"
      } else {
        "200px"
      }
    }
    
    let style = {
      width: width
    };
    
    let filterItems = this.createFilterItems();
    
    return (
      <div style={style} className="item-filter-app">
        <Button bsSize="xsmall" onClick={this.handleCollapseButtonClick} className="collapse-button">
          <Glyphicon glyph={glyph}/>
        </Button>
        <div hidden={this.state.isCollapsed}>
          {filterItems}
        </div>
      </div>
    );
    
  }
}
