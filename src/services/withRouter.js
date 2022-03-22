import React from 'react';
import { useNavigate } from 'react-router-dom';

// HOC to handle navigation in class components
export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};
