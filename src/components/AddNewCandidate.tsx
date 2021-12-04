import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

const AddNewCandidate = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Container style={{ padding: ' 0 10% 0 10%' }}>
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
                        render={({ field: { ref }, formState }) => (
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

export default AddNewCandidate;
