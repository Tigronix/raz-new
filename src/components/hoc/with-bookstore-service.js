import React from 'react';
import { RazbiratorServiceConsumer } from '../razbirator-service-context';

const withRazbiratorService = () => (Wrapped) => {

  return (props) => {
    return (
      <RazbiratorServiceConsumer>
        {
          (razbiratorService) => {
            return (<Wrapped {...props}
                     razbiratorService={razbiratorService}/>);
          }
        }
      </RazbiratorServiceConsumer>
    );
  }
};

export default withRazbiratorService;
