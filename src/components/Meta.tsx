import { Helmet } from 'react-helmet';

const Meta = ({ title }: { title: String }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default Meta;
