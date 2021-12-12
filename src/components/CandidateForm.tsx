import { Form, Button, Container } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ICandidate } from '../interfaces/Candidate';
import { addCandidate } from '../redux/slices/candidateSlice';
import { RootState } from '../redux/store';

const CandidateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contract: any = useSelector((state: RootState) => state.contract);
    const { account } = useSelector((state: RootState) => state.user);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (candidate: ICandidate) => {
        if (contract?.methods && account) {
            await contract.methods
                .addCandidate(
                    candidate.firstname,
                    candidate.lastname,
                    candidate.age,
                    candidate.team
                )
                .send({ from: account });
            dispatch(addCandidate(candidate));
            toast.success('Success');
            navigate('/');
        } else {
            toast.success('Please connect your wallet');
        }
    };

    return (
        <Container style={{ padding: '0 10% 0 10%' }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formFirstname">
                    <Form.Label>Firstname</Form.Label>
                    <Controller
                        control={control}
                        name="firstname"
                        rules={{ required: true }}
                        render={({ field: { value, ref, onChange } }) => (
                            <Form.Control
                                type="text"
                                onChange={onChange}
                                ref={ref}
                                value={value}
                                isInvalid={errors.firstname}
                                placeholder="John"
                            />
                        )}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Lastname</Form.Label>
                    <Controller
                        control={control}
                        name="lastname"
                        rules={{ required: true }}
                        render={({ field: { value, onChange, ref } }) => (
                            <Form.Control
                                type="text"
                                ref={ref}
                                onChange={onChange}
                                value={value}
                                isInvalid={errors.lastname}
                                placeholder="Doe"
                            />
                        )}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Controller
                        control={control}
                        name="age"
                        rules={{ required: true, min: 18 }}
                        render={({ field: { value, ref, onChange } }) => (
                            <Form.Control
                                type="number"
                                ref={ref}
                                onChange={onChange}
                                value={value}
                                isInvalid={errors.age}
                                placeholder="18"
                            />
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors?.age?.type === 'min' && 'Minimum 18'}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Team</Form.Label>
                    <Controller
                        control={control}
                        name="team"
                        rules={{ required: true }}
                        render={({ field: { value, onChange, ref } }) => (
                            <Form.Control
                                type="text"
                                ref={ref}
                                onChange={onChange}
                                value={value}
                                isInvalid={errors.lastname}
                                placeholder="Paris"
                            />
                        )}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Controller
                        name=""
                        control={control}
                        render={({ formState }) => (
                            <Button
                                type="submit"
                                className="btn btn-primary"
                                style={{ float: 'right' }}
                            >
                                {formState.isSubmitting && (
                                    <span className="spinner-border spinner-border-sm mr-1" />
                                )}
                                Save
                            </Button>
                        )}
                    />
                </Form.Group>
            </Form>
        </Container>
    );
};

export default CandidateForm;
