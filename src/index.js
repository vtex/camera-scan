import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'webrtc-adapter'
import Quagga from 'quagga'

export default class CameraScan extends Component {
  constructor(props) {
    super(props)
    this.dimensions = {
      width: window.innerWidth,
      height: Math.floor(window.innerWidth * 9 / 16),
    }
  }
  scan() {
    if (
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function'
    ) {
      alert('Esse device não suportará a lib de ler ean')
      return
    }
    console.log('Initializing Quagga', this.scanReader)
    // {
    //   inputStream: {
    //     name: 'Live',
    //     type: 'LiveStream',
    //     target: '#scan-reader',
    //   },
    //   decoder: {
    //     readers: ['ean_reader'],
    //   },
    //   debug: {
    //     drawBoundingBox: true,
    //     showFrequency: true,
    //     drawScanline: true,
    //     showPattern: true,
    //   },
    //   // constraints: {
    //   //   ...this.dimensions,
    //   //   facingMode: 'environment',
    //   // },
    // }
    const config = {
      inputStream: {
        type: 'LiveStream',
        target: '#scan-reader',
        constraints: {
          width: 640,
          height: 480,
          facing: 'environment', // or user
        },
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      numOfWorkers: 2,
      decoder: {
        readers: ['code_128_reader'],
      },
      locate: true,
    }
    console.log('CONFIG', config)

    Quagga.init(config, function(err) {
      if (err) {
        console.log('Quagga', err)
        return
      }
      console.log('Initialization finished. Ready to start')
      Quagga.start()
    })

    Quagga.onDetected(data => {
      console.log('DETECTED', data)
      Quagga.stop()
      this.onBarcodeReaded(data.codeResult.code)
    })
  }

  handleScan = () => {
    this.scan()
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <h2>Welcome to React components</h2>
        <button className="mv3" onClick={this.handleScan}>
          SCAN
        </button>
        <div className="flex flex-auto flex-row justify-center items-center">
          <div
            id="scan-reader"
            style={{ ...this.dimensions }}
            ref={scanReader => (this.scanReader = scanReader)}
          />
        </div>
      </div>
    )
  }
}

CameraScan.propTypes = {
  onBarcodeReaded: PropTypes.func.isRequired,
}
