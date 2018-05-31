
const NotarizeTx = artifacts.require('NotarizeTx');
// const assert = require('chai')
//     .use(require('chai-as-promised'))
contract('NotarizeTx', addresses => {

  const node = addresses[0]
  const buyer = addresses[1]
  const seller = addresses[2]
  const id =  "785334f82ff9aea19b4d80bc51bc1b039f1fa91d3fda69c3544e50427a92876b"
  const date = "2/4/18"
  const value = 1
  const hash =  "0xa06d8c92805e40b767afa80b81b0bdabbea6d10af016a1dd121bc5c6651623a1"
  const status = "purchased"
  const shipping = "shipping"
  const fakeId = "0xb67465b5835337afa0829f5c1f5047278744b57fdccdd56aba21a58eba34e858"
  const fakeSender = addresses[3]
  var instance
  beforeEach(async() => {
  instance = (await NotarizeTx.new( buyer, seller, id, date, value, hash, status, shipping,{from: node, gasLimit:100000000000000}));
});

  describe('NotarizeTx', () => {

    it('should set local variables correctly', async () => {
      // try {
      //   let tx = await instance._tx()
      //   console.log(tx)
      //   assert.equal(buyer, tx[0])
      //   assert.equal(seller, tx[1])
      //   // assert.equal(, tx[0])
      //   // assert.equal(buyer, tx[0])
      //   // assert.equal(buyer, tx[0])
      //   // assert.equal(buyer, tx[0])
      //
      // }
      // catch(error) {
      //   assert(false,"The method should not fail")
      // }
    });
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
        instance.NotaryEvt().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
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
        instance.NotaryEvt().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
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
