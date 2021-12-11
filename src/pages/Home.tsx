import ListCandidates from '../components/CandidateList';
import Header from '../components/Header';
import Meta from '../components/Meta';

const Home = () => {
    const pageTitle = 'All candidates';
    const pageDescription = 'Vote for your favorite candidate';

    return (
        <div>
            <Meta title={pageTitle} />
            <Header head={pageTitle} description={pageDescription} />
            <ListCandidates />
        </div>
    );
};

export default Home;
