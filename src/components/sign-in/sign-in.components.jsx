import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email , password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email:'', password: '' });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return(
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>
          Sign in with you email and password
        </span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            label='email'
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label='password'
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div
            className='buttons'
          >
            <CustomButton
              type='submit'
            >
              Sign In
            </CustomButton>
            <CustomButton
              type='button'
              isGoogleSignIn
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;