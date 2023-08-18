import React from "react";
import { Card, Columns, Content, Heading } from 'react-bulma-components';
import '../../assets/css/profile.css';
import { PacientI } from '../../interfaces/paciente'

interface Props {
  pacients: PacientI[];
}

const ListPacient: React.FC<Props> = ({ pacients }) => {
  return (
    <div className="containerLayout">
      <Columns>
        {pacients.map(({ nombrePaciente, edad, rut, _id }) => (
          <Columns.Column size={4} key={_id}>
            <Card>
              <Card.Content>
                <Content>
                  <Heading>{nombrePaciente}</Heading>
                  <Heading subtitle size={5}>Rut: {rut}</Heading>
                  <Heading subtitle size={5}>Edad: {edad}</Heading>
                </Content>
              </Card.Content>
            </Card>
          </Columns.Column>
        ))}
      </Columns>
    </div>
  );
};

export default ListPacient;