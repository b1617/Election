import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { ICandidate } from '../interfaces/Candidate';
import { RootState } from '../redux/store';

import CandidateItem from './CandidateItem';

const CandidateList = () => {
    const candidates: ICandidate[] = useSelector(
        (state: RootState) => state.candidates
    );
    return (
        <Container>
            {candidates.map((candidate, key) => {
                return <CandidateItem candidate={candidate} key={key} />;
            })}
        </Container>
    );
};

export default CandidateList;
