import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { ICandidate } from '../interfaces/Candidate';
import { IContract } from '../interfaces/Contract';
import { IUser } from '../interfaces/User';
import { updateCandidate } from '../redux/slices/candidateSlice';
import { RootState } from '../redux/store';

import CandidateItem from './CandidateItem';

const CandidateList = () => {
    const {
        candidates,
        contract,
        user: { account },
    }: {
        candidates: ICandidate[];
        contract: IContract;
        user: IUser;
    } = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    const onVote = async (candidate: ICandidate) => {
        try {
            await contract.methods
                .addVote(candidate.id)
                .send({ from: account });
            dispatch(
                updateCandidate({ ...candidate, votes: +candidate.votes + 1 })
            );
            toast.success('Success');
        } catch (e) {
            console.error(e);
            toast.error('Failed to vote');
        }
    };

    return (
        <Container className="d-flex">
            {candidates.map((candidate, key) => {
                return (
                    <CandidateItem
                        candidate={candidate}
                        onVote={onVote}
                        key={key}
                    />
                );
            })}
        </Container>
    );
};

export default CandidateList;
