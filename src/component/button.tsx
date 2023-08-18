import React from "react";
import { Container, Section, Button } from 'react-bulma-components';

interface AddButtonProps {
    onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
        <Section className="buttonCreate">
            <Container>
                <div className="is-pulled-right">
                    <Button onClick={onClick} color="link">Agregar</Button>
                </div>
            </Container>
        </Section>
    );
}

export default AddButton;