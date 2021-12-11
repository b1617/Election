import { Card, Button } from 'react-bootstrap';

import { ICandidate } from '../interfaces/Candidate';

interface Props {
    candidate: ICandidate;
}

const CandidateItem = ({ candidate }: Props) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{`${candidate.lastname} ${candidate.firstname}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {candidate.team}
                </Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Vote</Button>
            </Card.Body>
        </Card>
    );
};

export default CandidateItem;
