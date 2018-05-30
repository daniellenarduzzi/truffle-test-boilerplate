
const NotarizeTx = artifacts.require('NotarizeTx');
// const assert = require('chai')
//     .use(require('chai-as-promised'))
contract('NotarizeTx', addresses => {

  const node = addresses[0]
  const buyer = addresses[1]
  const seller = addresses[2]
  const id =  "0xdcfcb5694135cb4cd6db40875d54521dfa60a3a5"
  const date = "2/4/18"
  const value = 1
  const hash =  "0x637c728ec66f988da224a17a1a9f617ed4bf26aa"
  const status = "purchased"
  const shipping = "shipping"
  const fakeId = "0xcbf2177c74847d03eed704bc022c587f1153ba83"
  const fakeSender = addresses[3]
  var instance
  beforeEach(async() => {
  instance = (await NotarizeTx.new( buyer, seller, id, date, value, hash, status, shipping,{from: node, gasLimit:100000000000000}));
});

  describe('NotarizeTx', () => {

    it('should set local variables correctly', async () => {});
  });

  describe('updateStatus', () => {

    it('should revert if tx.id is different than id', async () => {
      try {
        await instance.updateStatus("prueba", fakeId, hash, { from: node})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    });

    it('should revert if sender is different than tx.buyer or BSG_NODE', async () => {
      try {
        await instance.updateStatus("prueba", id, hash,{from: fakeSender})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    });
    it('should update status and raise NotaryEvt', async () => {
      try {
        await instance.updateStatus("prueba", id, hash, { from: node})
        instance.NotaryEvt({}, { fromBlock: 0, toBlock: 'latest' }).get((error, res) => {
          if (error){
            console.log('Error in NotaryEvt event handler: ' + error)
          }
          else{
            assert(res)
          }
        });
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    });
  });

  describe('updateShipping', () => {

    it('should revert if _tx.id is different than _id', async () => {
      try {
        await instance.updateShipping("prueba", fakeId, hash, { from: node})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    });

    it('should revert if sender is different than tx.buyer or BSG_NODE', async () => {
      try {
        await instance.updateShipping("prueba", id, hash,{from: fakeSender})
        assert.fail()
    }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    });

    it('should update shipping and raise NotaryEvt', async () => {
      try {
        await instance.updateShipping("prueba", id, hash, { from: node})
        instance.NotaryEvt({}, { fromBlock: 0, toBlock: 'latest' }).get((error, res) => {
          if (error){
            console.log('Error in NotaryEvt event handler: ' + error)
          }
          else{
            assert(res)
          }
        });
    }
      catch(error) {
        assert(false,"The method should not fail")
      }
    });
  });
});
