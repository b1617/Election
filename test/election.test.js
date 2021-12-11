require('chai').use(require('chai-as-promised')).should();
const Election = artifacts.require('Election');
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 * Given – When – Then
 */
contract('Given a election contract', function ([deployer, candidate, voter]) {
    let election;

    before(async () => {
        election = await Election.deployed();
        await election.addCandidate('John', 'Doe', 'Team 1', 18);
        await election.addCandidate('Alice', 'Joe', 'Team 2', 28);
    });

    describe('when deploy the contract', () => {
        it('should have address', async () => {
            const address = await election.address;
            expect(address).to.not.equal('0x0');
        });
        it('should have name', async () => {
            const name = await election.name();
            expect(name).to.equal('Election');
        });
    });

    describe('when add a new candidate', () => {
        it('should add candidate to the list of candidates', async () => {
            const candidate = await election.candidates(0);
            expect(candidate.firstname).to.equal('John');
            expect(candidate.lastname).to.equal('Doe');
        });

        it('should update candidate counter', async () => {
            count = await election.candidateCount();
            expect(count.toString()).to.equal('2');
        });
    });

    describe('when voting to a candidate', () => {
        it('should update votes counter for the candidate and set sign the voter', async () => {
            await election.addVote(0, { from: voter });
            const votes = await election.votes(0);
            const isVoted = await election.voters(voter);
            expect(votes.toString()).to.equal('1');
            expect(isVoted).to.equal(true);
        });

        it('should throw error if voting second time', async () => {
            await election.addVote(1, { from: voter }).should.be.rejected;
        });
    });

    describe('when retrieve all candidates', () => {
        it('should retrieve all', async () => {
            const candidates = await election.getAllCandidates();
            expect(candidates.length).to.equal(2);
        });
    });
});
