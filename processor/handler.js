'use strict';

const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions');
const { decode, encode } = require('./services/encoding');
const { getCollectionAddress, getMojiAddress, getSireAddress } = require('./services/addressing')
const { getPrng } = require('./services/prng')
const FAMILY_NAME = 'cryptomoji';
const FAMILY_VERSION = '0.1';
const NAMESPACE = '5f4d76';
const test = '1234567891123456789112345678911234567891123456789112345678911234567891'

/**
 * A Cryptomoji specific version of a Hyperledger Sawtooth Transaction Handler.
 */
class MojiHandler extends TransactionHandler {
  /**
   * The constructor for a TransactionHandler simply registers it with the
   * validator, declaring which family name, versions, and namespaces it
   * expects to handle. We'll fill this one in for you.
   */
  constructor() {
    console.log('Initializing cryptomoji handler with namespace:', NAMESPACE);
    super(FAMILY_NAME, [FAMILY_VERSION], [NAMESPACE]);
  }

  /**
   * The apply method is where the vast majority of all the work of a
   * transaction processor happens. It will be called once for every
   * transaction, passing two objects: a transaction process request ("txn" for
   * short) and state context.
   *
   * Properties of `txn`:
   *   - txn.payload: the encoded payload sent from your client
   *   - txn.header: the decoded TransactionHeader for this transaction
   *   - txn.signature: the hex signature of the header
   *
   * Methods of `context`:
   *   - context.getState(addresses): takes an array of addresses and returns
   *     a Promise which will resolve with the requested state. The state
   *     object will have keys which are addresses, and values that are encoded
   *     state resources.
   *   - context.setState(updates): takes an update object and returns a
   *     Promise which will resolve with an array of the successfully
   *     updated addresses. The updates object should have keys which are
   *     addresses, and values which are encoded state resources.
   *   - context.deleteState(addresses): deletes the state for the passed
   *     array of state addresses. Only needed if attempting the extra credit.
   */

  makeMoji(publicKey, prng) {
    const mojyArray = [] // should create empty eremoji
  };

  createCollection(context, publickKey, signerPublicKey) {
    const address = getCollectionAddress(publickKey);
    const emojiAderess = getMojiAddress(address, getPrng(parseInt(signerPublicKey)))
    console.log(address)
    return context.getState([address]).then(state => {
      if (state[address].length > 0) {
        throw new InvalidTransaction('Owner already exists');
      }
      const update = {};
      update[address] = encode({ key: publickKey, moji: [test, "112", "12"] });
      console.log('ahelellooo worl', update)
      // update[address]
      //create 3 mojii // moji array
      return context.setState(update);
    });
  }


  // createOwner(context, { name }, ownerPublicKey) {
  //   const address = getSireAddress(ownerKey);
  //   return context.getState([address]).then(state => {
  //     if (state[address].length > 0) {
  //       throw new InvalidTransaction('Owner already exist');
  //     }
  //     const update = {};
  //     update[address] = encode({ key: ownerPublicKey, name });
  //     return context.setState(update);
  //   });
  // }


  apply(txn, context) {
    let payload = null;
    try {
      payload = decode(txn.payload);
    } catch (err) {
      throw new InvalidTransaction('Unable to decode payload');
    }
    console.log('hellllllloooo world')
    if (payload.action === 'CREATE_COLLECTION') {
      return this.createCollection(context, payload, txn.header.signerPublicKey);
    }
    // else if (payload.action === 'CREATE_OWNER') {
    //   return createOwner(context, payload, txn.header.signerPublicKey);
    // }

    throw new InvalidTransaction(' Unknown action <3');
  }
}

module.exports = MojiHandler;
