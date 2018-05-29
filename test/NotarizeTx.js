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

    it('should revert if _tx.id is different than _id', () => {
      instance.methods.updateStatus("prueba", fakeId, hash)
      .send({
        from: node,
      })
      .then(
        function(val) {
          should.not.exist(val)
        },
        function(err) {
          should.exist(err)
        }
      )
    });

    it('should revert if sender is different than tx.buyer or BSG_NODE', () => {
      instance.methods.updateStatus("prueba", id, hash)
      .send({
        from: fakeSender,
      })
      .then(
        function(val) {
          should.not.exist(val)
        },
        function(err) {
          should.exist(err)
        }
      )
    });

    it('should update status and raise NotaryEvt', () => {
      instance.methods.updateStatus("prueba", id, hash)
      .send({
        from: node,
      })
      .then(
        function(val) {
          should.exist(val)
        },
        function(err) {
          should.not.exist(err)
        }
      )
    });
  });

  describe('updateShipping', () => {

    it('should revert if _tx.id is different than _id', () => {
      instance.methods.updateShipping("prueba", fakeId, hash)
      .send({
        from: node,
      })
      .then(
        function(val) {
          should.not.exist(val)
        },
        function(err) {
          should.exist(err)
        }
      )
    });

    it('should revert if sender is different than tx.buyer or BSG_NODE', () => {
      instance.methods.updateShipping("prueba", id, hash)
      .send({
        from: fakeSender,
      })
      .then(
        function(val) {
          should.not.exist(val)
        },
        function(err) {
          should.exist(err)
        }
      )
    });

    it('should update shipping and raise NotaryEvt', () => {
      instance.methods.updateShipping("prueba", id, hash)
      .send({
        from: node,
      })
      .then(
        function(val) {
          should.exist(val)
        },
        function(err) {
          should.not.exist(err)
        }
      )
    });
  });
});
