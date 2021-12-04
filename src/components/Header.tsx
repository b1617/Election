import { Container } from 'react-bootstrap';

interface Props {
    head: String;
    description: String;
}

const Header = ({ head, description }: Props) => {
    return (
        <Container>
            <div className="text-center mt-5">
                <h1>{head}</h1>
                <p className="lead text-capitalize">{description}</p>
            </div>
        </Container>
    );
};

export default Header;
