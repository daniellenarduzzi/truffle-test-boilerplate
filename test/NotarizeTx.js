const NotarizeTx = artifacts.require('NotarizeTx');

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
