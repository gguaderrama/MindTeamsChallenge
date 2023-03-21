import { render, screen } from '@testing-library/react';
import React from 'react';
import ShowUser from '../users';


import {BrowserRouter as Router} from 'react-router-dom';

describe('App tests', () => {
    it('should contains the login', () => {
      const container = render(<Router><ShowUser /></Router>);
      const element = container.queryByText('<h1 class="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root">Sign in</h1>');
     expect(element).not.toBeInTheDocument();
    });
});