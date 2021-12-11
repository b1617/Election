// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    string public name;
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => uint256) public votes;
    mapping(address => bool) public voters;
    uint256 public candidateCount = 0;

    struct Candidate {
        uint256 id;
        string firstname;
        string lastname;
        string team;
        string age;
    }

    event Log(string msg, address from, uint256 to);

    constructor() {
        name = 'Election';
    }

    function addCandidate(
        string memory _firstname,
        string memory _lastname,
        string memory _team,
        string memory _age
    ) public {
        require(bytes(_firstname).length > 0 && bytes(_lastname).length > 0);
        candidates[candidateCount] = Candidate(
            candidateCount,
            _firstname,
            _lastname,
            _team,
            _age
        );
        votes[candidateCount] = 0;
        ++candidateCount;
    }

    function addVote(uint256 _id) public {
        require(_id < candidateCount && !voters[msg.sender]);
        votes[_id] = votes[_id] + 1;
        voters[msg.sender] = true;
        emit Log('Add vote', msg.sender, _id);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory _candidates = new Candidate[](candidateCount);
        for (uint256 i = 0; i < candidateCount; ++i) {
            _candidates[i] = candidates[i];
        }
        return _candidates;
    }

    function read() public view returns (string memory) {
        return name;
    }
}
