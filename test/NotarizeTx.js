const NotarizeTx = artifacts.require('NotarizeTx');

contract('NotarizeTx', addresses => {

  const node = addresses[0]
  const buyer = addresses[1]
  const seller = addresses[2]
  const id =  web3.utils.asciiToHex("00000000000000000")
  const date = "2/4/18"
  const value = 1
  const hash =  web3.utils.asciiToHex("00000000000000000")
  const status = "purchased"
  const shipping = "shipping"
  const fakeId = web3.utils.asciiToHex("1111111111111111111")
  const fakeSender = addresses[3]

  beforeEach(async() => {
  const instance = (await NotarizeTx.new(buyer, seller, id, date, value, hash, status, shipping, {from: node})).contract;
});

  describe('NotarizeTx', () => {

    it('should set local variables correctly', async () => {});
  });

  describe('updateStatus', () => {

    it('should revert if tx.id is different than id', async () => {
      try {
        await instance.methods.updateStatus("prueba", fakeId, hash, { from: node})
        assert(false, 'updateStatus: It should have failed because fakeId is not equal to id.')
      }
      catch(error) {
        assert(error.message.includes("revert"), 'updateStatus: fakeId is not equal to id, so method returns revert error')
      }
    });

    it('should revert if sender is different than tx.buyer or BSG_NODE', async () => {
      try {
        await instance.methods.updateStatus("prueba", id, hash,{from: fakeSender})
        assert(false, 'updateStatus: It should have failed because fakeSender is different than tx.buyer or BSG_NODE.')
      }
      catch(error) {
        assert(error.message.includes("revert"), 'updateStatus: fakeSender is different than tx.buyer or BSG_NODE, so method returns revert error')
      }
    });
    it('should update status and raise NotaryEvt', async () => {
      try {
        await instance.methods.updateStatus("prueba", id, hash, { from: node})
        assert(true , 'updateStatus: updated, all conditions acomplished.')
      }
      catch(error) {
        should.not.exist(err)
      }
    });
  });

  describe('updateShipping', () => {

    it('should revert if _tx.id is different than _id', async () => {
      try {
        await instance.methods.updateShipping("prueba", fakeId, hash, { from: node})
        assert(false, 'updateShipping: It should have failed because fakeId is not equal to id.')
      }
      catch(error) {
        assert(error.message.includes("revert"), 'updateShipping: fakeId is not equal to id, so method returns revert error')
      }
    });

    it('should revert if sender is different than tx.buyer or BSG_NODE', async () => {
      try {
        await instance.methods.updateShipping("prueba", id, hash,{from: fakeSender})
        assert(false, 'updateShipping: It should have failed because fakeSender is different than tx.buyer or BSG_NODE.')
      }
      catch(error) {
        assert(error.message.includes("revert"), 'updateShipping: fakeSender is different than tx.buyer or BSG_NODE, so method returns revert error')
      }
    });

    it('should update shipping and raise NotaryEvt', async () => {
      try {
        await instance.methods.updateShipping("prueba", id, hash, { from: node})
        assert(true , 'updateShipping: updated, all conditions acomplished.')
      }
      catch(error) {
        should.not.exist(err)
      }
    });
  });
});
