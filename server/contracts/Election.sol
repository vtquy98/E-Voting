pragma solidity >=0.4.0 <0.7.0;

contract ElectionCreation {
  Election[] public deployedElections;
  event ElectionCreated(Election electionAddress);

  function createElection(
    string memory electionName,
    string memory electionDescription
  ) public {
    Election newElection = new Election(
      electionName,
      electionDescription,
      msg.sender
    );

    emit ElectionCreated(newElection);
    deployedElections.push(newElection);
  }

  function getLastedDeployedElection() public view returns (Election) {
    return deployedElections[deployedElections.length - 1];
  }

  function getDeployedElections() public view returns (Election[] memory) {
    return deployedElections;
  }
}

contract Election {
  struct Voter {
    string fullName;
    bool exists;
  }

  struct Candidate {
    string fullName;
    string candidateDescription;
    uint256 votes;
  }

  address public manager;
  string public electionName;
  string public electionDescription;

  Voter[] public voters;
  Candidate[] public candidates;

  address[] public candidateList;
  address[] public voterList;

  uint256 public totalVotes;
  //   bool public complete;
  //   uint256 public winner;

  mapping(address => Candidate) public candidateData;
  mapping(address => Voter) public voterData;

  constructor(
    string memory _electionName,
    string memory _electionDescription,
    address _sender
  ) public {
    manager = _sender;
    electionName = _electionName;
    electionDescription = _electionDescription;
    state = State.Created;
  }

  enum State {Created, Voting, Ended}
  State public state;

  modifier inState(State _state) {
    require(state == _state, 'Invalid time to vote!');
    _;
  }

  mapping(address => mapping(address => bool)) hasVoted;

  modifier canVote(address _voterAddress, address _candidateAddress) {
    require(!hasVoted[_candidateAddress][_voterAddress], 'You already voted!');
    _;
  }

  function registerVoter(address voterAddress, string memory fullName)
    public
    inState(State.Created)
    restricted
  {
    Voter memory newVoter = Voter({fullName: fullName, exists: true});

    voterList.push(voterAddress);
    voters.push(newVoter);
    voterData[voterAddress] = newVoter;
  }

  function registerCandidate(
    address candidateAddress,
    string memory fullName,
    string memory candidateDescription
  ) public inState(State.Created) restricted {
    Candidate memory newCandidate = Candidate({
      fullName: fullName,
      candidateDescription: candidateDescription,
      votes: 0
    });

    candidateData[candidateAddress] = newCandidate;
    candidateList.push(candidateAddress);
    candidates.push(newCandidate);

  }

  function startVote() public inState(State.Created) restricted {
    state = State.Voting;
  }

  function pollVote(address _candidateAddress)
    public
    inState(State.Voting)
    canVote(msg.sender, _candidateAddress) //throw if user has already voted
  {
    require(voterData[msg.sender].exists, 'You are not authorized to vote!');
    hasVoted[_candidateAddress][msg.sender] = true; //make note of the fact he's voting now
    candidateData[_candidateAddress].votes += 1;
    totalVotes++;
  }

  function endVote() public inState(State.Voting) restricted {
    // close the poll
    state = State.Ended;

    //caculation:
    // uint256 max = 0;
    // for (uint256 i = 0; i < candidates.length; i++) {
    //   if (candidates[i].votes > max) {
    //     max = candidates[i].votes;
    //     winner = candidates[i].candidateId;

    //   }
    // }

  }

  //   function getResult() public view returns (uint256, uint256, uint256) {
  //     return (totalVotes, candidates[winner].votes, winner);
  //   }

  function getVotersCount() public view returns (uint256) {
    return voters.length;
  }

  function getCandidatesCount() public view returns (uint256) {
    return candidates.length;
  }

  //get all candidate
  function allCandidates() public view returns (address[] memory) {
    return candidateList;
  }

  //get all voter
  function allVoters() public view returns (address[] memory) {
    return voterList;
  }

  function totalVotesFor(address candidateAddress)
    public
    view
    returns (uint256)
  {
    return candidateData[candidateAddress].votes;
  }

  modifier restricted {
    require(msg.sender == manager, 'Something went wrong!');
    _;
  }
}
