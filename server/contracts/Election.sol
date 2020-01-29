/*
       .__(.)< (MEOW)     .__(.)< (MEOW)
        \___)              \___)
*/

// pragma solidity ^0.5.0;
pragma solidity >=0.4.22 <0.7.0;

contract Election {
  struct voter {
    string voterName;
    bool voted;
    uint256 vote;
  }

  struct candidate {
    string candidateName;
    string candiateDescription;
  }

  uint256 public totalVoter = 0;
  uint256 public totalCandidate = 0;
  uint256 public totalVote = 0;

  address public ballotOfficialAddress;
  string public ballotOfficialName;
  string public proposal;

  address[] public candidateList;
  address[] public voterList;

  mapping(address => mapping(address => bool)) hasVoted;
  mapping(address => uint256) votesCount;
  mapping(address => voter) public voterRegister;
  mapping(address => candidate) public candidateRegister;
  mapping(address => uint256) public votesReceived;

  enum State {Created, Voting, Ended}
  State public state;

  //creates a new ballot contract
  constructor(string memory _ballotOfficialName, string memory _proposal)
    public
  {
    ballotOfficialAddress = msg.sender;
    ballotOfficialName = _ballotOfficialName;
    proposal = _proposal;
    state = State.Created;
  }

  modifier canVote(address _voterAddress, address _candidateAddress) {
    require(!hasVoted[_candidateAddress][_voterAddress], 'You already voted!');
    _;
  }

  modifier onlyOfficial() {
    require(msg.sender == ballotOfficialAddress, 'Something went wrong!');
    _;
  }

  modifier inState(State _state) {
    require(state == _state, 'Invalid time to vote!');
    _;
  }

  event voterAdded(address voter);
  event voteStarted();
  event voteEnded(uint256 finalResult);
  event voteDone(address voter);
  event candidateAdded(address candidate);

  //add voter
  function addVoter(address _voterAddress, string memory _voterName)
    public
    inState(State.Created)
    onlyOfficial
  {
    voter memory v;
    v.voterName = _voterName;
    // v.voted = false;
    voterRegister[_voterAddress] = v;
    voterList.push(_voterAddress);
    totalVoter++;
    emit voterAdded(_voterAddress);
  }

  //add Candidate
  function addCandidate(
    address _candidateAddress,
    string memory _candidateName,
    string memory _candidateDescripton
  ) public inState(State.Created) onlyOfficial {
    candidate memory c;
    c.candidateName = _candidateName;
    c.candiateDescription = _candidateDescripton;
    candidateRegister[_candidateAddress] = c;
    totalCandidate++;
    candidateList.push(_candidateAddress);
    emit candidateAdded(_candidateAddress);
  }

  //declare voting starts now
  function startVote() public inState(State.Created) onlyOfficial {
    state = State.Voting;
    emit voteStarted();
  }
  //check valid candidate
  // function validCandidate(bytes32 candidate) public view returns (bool) {
  //     for(uint i = 0; i < candidateList.length; i++) {
  //         if (candidateList[i] == candidate) {
  //             return true;
  //         }
  //     }
  //     return false;
  // }

  //Vote for candidate
  function voteForCandidate(address _candidateAddress)
    public
    inState(State.Voting)
    canVote(msg.sender, _candidateAddress) //throw if user has already voted
  {
    hasVoted[_candidateAddress][msg.sender] = true; //make note of the fact he's voting now
    votesCount[_candidateAddress]++;
    votesReceived[_candidateAddress] += 1;
    totalVote++;
    emit voteDone(msg.sender);
  }

  function totalVotesFor(address _candidateAddress)
    public
    view
    returns (uint256)
  {
    return votesReceived[_candidateAddress];
  }

  //voters vote by indicating their choice (true/false)
  // function doVote(bool _choice)
  //     public
  //     inState(State.Voting)
  //     returns (bool voted)
  // {
  //     bool found = false;
  //     if (bytes(voterRegister[msg.sender].voterName).length != 0
  //     && !voterRegister[msg.sender].voted){
  //         voterRegister[msg.sender].voted = true;
  //         vote memory v;
  //         v.voterAddress = msg.sender;
  //         v.choice = _choice;
  //         if (_choice){
  //             countResult++; //counting on the go
  //         }
  //         votes[totalVote] = v;
  //         totalVote++;
  //         found = true;
  //     }
  //     emit voteDone(msg.sender);
  //     return found;
  // }

  //end votes
  function endVote() public inState(State.Voting) onlyOfficial {
    state = State.Ended;
    // finalResult = countResult; //move result from private countResult to public finalResult
    // emit voteEnded(finalResult);
  }

  //get all candidate
  function allCandidates() public view returns (address[] memory) {
    return candidateList;
  }

  //get all voter
  function allVoters() public view returns (address[] memory) {
    return voterList;
  }

}
