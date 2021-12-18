import { Card, Button, Badge } from 'react-bootstrap';

import { ICandidate } from '../interfaces/Candidate';

interface Props {
    candidate: ICandidate;
    onVote: (candidate: ICandidate) => void;
}

const CandidateItem = ({ candidate, onVote }: Props) => {
    return (
        <Card className="m-3 w-25">
            <Card.Body>
                <Card.Title>{`${candidate.firstname} ${candidate.lastname}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {candidate.age}
                </Card.Subtitle>
                <Card.Text>{candidate.description}</Card.Text>
                <Badge bg="success">Total votes : {candidate.votes}</Badge>
                <Card.Text style={{ float: 'right' }}>
                    <Button
                        variant="outline-primary"
                        onClick={() => onVote(candidate)}
                    >
                        Vote
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CandidateItem;
