/*
 Bitsign transaction notarizacion contract v0.1c
*/
pragma solidity ^0.4.15;

contract NotarizeTx {

  //State variables
    mapping (bytes32 => bytes32) private proofs;
    address public BSG_NODE;
    struct Tx {
        address  buyer;
        address  seller;
        bytes32  id;
        string  date;
        uint  value;
        bytes32  hash;
        string  status;
        string  shipping;
    }

    Tx _tx;

    function getTx() public view returns (address,address,bytes32,string,uint,bytes32,string,string){

        return (_tx.buyer, _tx.seller, _tx.id, _tx.date, _tx.value, _tx.hash, _tx.status, _tx.shipping);
    }

    event NotaryEvt(bytes32 _hash, bytes32 _id);

  /*
    Contract constructor takes _user as client Ethereum address
   */
    constructor(address _buyer, address _seller, bytes32 _id, string _date, uint _value, bytes32 _hash, string _status, string _shipping) public {
        _tx.buyer = _buyer;
        _tx.seller = _seller;
        _tx.id = _id;
        _tx.date = _date;
        _tx.value = _value;
        _tx.hash = _hash;
        _tx.status = _status;
        _tx.shipping = _shipping;
        proofs[_hash] = _id;
        BSG_NODE = msg.sender;
    }
  /**
  *
  *
   */
    function updateStatus(string _status, bytes32 _id, bytes32 _hash) public {
        require (_id == _tx.id && (msg.sender == _tx.buyer || msg.sender == BSG_NODE));
        _tx.status = _status;
        _tx.hash = _hash;
        proofs[_hash] = _id;
        emit NotaryEvt(_hash, _tx.id);
    }
    /**
    *
     */
    function updateShipping(string _shipping, bytes32 _id, bytes32 _hash) public {
        require(_id == _tx.id && (msg.sender == _tx.buyer || msg.sender == BSG_NODE));
        _tx.status = _shipping;
        _tx.hash = _hash;
        proofs[_hash] = _tx.id;
        emit NotaryEvt(_hash, _tx.id);
    }
}
