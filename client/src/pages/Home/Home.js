import React, { Component } from 'react';

import logo from './logo.svg';
import Calculators from './Calculators.png';

class HomePage extends Component {
  render() {
    return (
      <div className='Home'>
        <div className='row'>
          <div className='col'>
            <img src={Calculators} className='Cal' alt='logo' />
            <p>
              Welcome to "I Love Family Banking"
              {/* Edit <code>src/pages/Home.js</code> and save to reload. */}
            </p>
            <a
              className='Robert-link'
              href='https://www.linkedin.com/in/robertzuniga'
              target="_blank"
              rel="noopener noreferrer"
            >
              Robert Zuniga LinkedIn Profile 
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
