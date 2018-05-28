const NotarizeTx = artifacts.require('NotarizeTx');

contract('NoterizeTx', addresses => {

  describe('NotarizeTx', () => {

    it('should set local variables correctly', async () => {});
  });

  describe('updateStatus', () => {

    it('should revert if _tx.id is different than _id', async () => {});

    it('should revert if sender is different than tx.buyer', async () => {});

    // BSG_NODE is the address creator of the contractor
    it('should revert if sender is different than BSG_NODE', async () => {});

    it('should update status and raise NotaryEvt', async () => {});
  });

  describe('updateShipping', () => {

    it('should revert if _tx.id is different than _id', async () => {});

    it('should revert if sender is different than tx.buyer', async () => {});

    // BSG_NODE is the address creator of the contractor
    it('should revert if sender is different than BSG_NODE', async () => {});

    it('should update shipping and raise NotaryEvt', async () => {});
  });
});
