import React from 'react';
import { withRouter } from '../withRouter';
import { render } from '@testing-library/react';


test('withRouter', () => {
    const Container = withRouter;
    const wrapper = <Container />
    console.log('wrap', wrapper.props);
});
