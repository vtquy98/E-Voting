pragma solidity >=0.4.21 <0.7.0;

contract Election {


	 event emitCreateElectionSession(
			address _id,
			string _name,
			string _description,
			string _created_at,
			string _expired_at,
			bool _is_opened,
			uint256 _index);

  struct ElectionSession {
      address id;
      string name;
      string description;
      string created_at;
      string expired_at;
      bool is_opened;
      uint256 index;
  }

  struct Voter {
      address id;
      string name;
      bool voted; // if true, that person already voted
  }

  struct Proposal{
      bytes32 name;
      uint votedCount;
      string description;
  }

  mapping(address => ElectionSession) ElectionStruct;
  address[] indexElection;

	function createElectionSession(
		address _id,
		string memory _name, 
		string memory _description,
		string memory _created_at,
		string memory _expired_at,
		bool _is_opened
		)
	public returns(uint256 index){
		// ElectionStruct[_id].id = _id;
		ElectionStruct[_id].name = _name;
		ElectionStruct[_id].description = _description;
		ElectionStruct[_id].created_at = _created_at;
		ElectionStruct[_id].expired_at = _expired_at;
		ElectionStruct[_id].is_opened = _is_opened;
		ElectionStruct[_id].index = indexElection.push(_id)-1;

		emit emitCreateElectionSession(_id, _name, _description, _created_at, _expired_at, _is_opened, ElectionStruct[_id].index);
		return indexElection.length-1;
	}

}