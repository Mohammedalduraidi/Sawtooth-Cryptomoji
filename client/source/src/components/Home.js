
import React, { Component } from 'react';
import axios from 'axios';
import { createKeys, getPublicKey, createPrivateKey } from '../../services/signing';
// import { encode } from '../../services/encoding'
import { getCollectionAddress } from '../../services/addressing';
import { encodeAll } from '../../services/transactions';
var { privateKey, publicKey} = createKeys();
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      save: '',
      publicKey: ''

    };
  }
  componentDidMount() {
    // console.log("jackel is here", encode(privateKey))
    // console.log(encodeAll(privateKey, { action: 'CREATE_COLLECTION' }))
    // axios({
    //   method: 'POST',
    //   url: '/api/batches',
    //   data: encodeAll(privateKey, { action: 'CREATE_COLLECTION' }),
    //   headers: { 'Content-Type': 'application/octet-stream' }
    // }).then((res => {
    //   console.log(res);
    // })).catch(err => {
    //   console.log(err);
    // });
    this.setState({
      publicKey
    });
    var address = getCollectionAddress(publicKey);
    axios.get(`/api/state/${address}`).then(res => {
      console.log('my name is jeff', res);
    }).catch(err => {
      console.log(err);
    });

    axios.get('/api/state?address=5f4d7600').then(res => {
      console.log('Hello world', res.data);
    }).catch(err => {
      console.log(err);
    });

  }
  createCollection() {
    console.log('create collection')
    axios({
          method: 'POST',
          url: '/api/batches',
          data: encodeAll(privateKey, { action: 'CREATE_COLLECTION' }),
          headers: { 'Content-Type': 'application/octet-stream' }
        }).then((res => {
          console.log(res);
        })).catch(err => {
          console.log(err);
        });

  }

  render() {
    return (
      <div>

        <h1>your publicKey is :{this.state.publicKey}</h1>
        <hr />
        <button onClick={this.createCollection.bind(this)}>go</button>
        
      </div>
    );
  }
}

