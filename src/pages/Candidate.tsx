import AddNewCandidate from '../components/CandidateForm';
import Header from '../components/Header';
import Meta from '../components/Meta';

const Candidate = () => {
    const title = 'Add a new candidate';
    const description = 'Fill the form';

    return (
        <div>
            <Meta title={title} />
            <Header head={title} description={description} />
            <AddNewCandidate />
        </div>
    );
};

export default Candidate;
