import React, { Component } from 'react'
import axios from 'axios';
// const { PublickKey } = require('.../services/signing')
import { createKeys } from '../../services/signing'
import { encode } from '../../services/encoding'
import { encodeAll } from '../../services/transactions'
const { privateKey } = createKeys()
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    console.log("jackel is here", encode(privateKey))
    console.log(encodeAll(privateKey, { action: 'CREATE_COLLECTION' }))
    axios({
      method: 'POST',
      url: '/api/batches',
      data: encodeAll(privateKey, { action: 'CREATE_COLLECTION' }),
      headers: { 'Content-Type': 'application/octet-stream' }
    }).then((res => {
      console.log(res)
    })).catch(err => {
      console.log(err)
    })

    axios.get('/api/state/{address}').then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })

    axios.get('/api/state?address=5f4d7600').then(res=>{
      console.log('Hello world',res)
    }).catch(err=>{
      console.log(err)
    })

  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    )
  }
}
