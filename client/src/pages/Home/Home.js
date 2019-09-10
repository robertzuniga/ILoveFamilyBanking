import React, { Component } from 'react';

import logo from './logo.svg';
import Calculators from './Calculators.png';

class HomePage extends Component {
  render() {
    return (
      <div className='Home'>
        <div className='row'>
          <div className='col'>
            {/* <img src={Calculators} className='Cal' alt='logo' /> */}
            <p>
              Welcome to "I Love Family Banking"
              {/* Edit <code>src/pages/Home.js</code> and save to reload. */}
            </p>
            <p>It's never a question about how much something cost...</p>
            <p>...the real question to ask and answer is...</p>
            <p>
              {" "}
            <strong>
            <em>"How do we finance this?"</em>
            </strong>
            </p>
            <div>
              <img src={Calculators} className="Cal" alt="Calculators" />
            </div>
            <a
              className='Robert-link'
              href='https://www.linkedin.com/in/robertzuniga'
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
              Robert Zuniga LinkedIn Profile
              </strong> 
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
