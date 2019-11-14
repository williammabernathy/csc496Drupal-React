import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//general, default test file generated with create-react-app
//and Road to React instructions.
//.test. files are not sought out
//instead, .spec. is called 
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
