import React, { Component } from 'react'
import { render } from 'react-dom'
import 'vtex-tachyons'

import Example from '../../src'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barcode: 'Nothing readed yet',
    }
  }

  handleBarcode = barcode => {
    this.setState({
      barcode,
    })
  }

  render() {
    const { barcode } = this.state
    return (
      <div>
        <h1>Camera Scan Demo</h1>
        <h2>Barcode: {barcode}</h2>
        <Example onBarcodeReaded={this.handleBarcode} />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
