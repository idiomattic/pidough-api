import React from "react";
import { withRouter } from "react-router";

class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  demoState() {
    this.setState({
      username: 'demo',
      password: 'qwerty'
    })
  }

  redirectToFeed() {
    this.props.history.push('/feed')
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.action(this.state)
      .then(() => this.props.hideModal())
      .then(() => this.props.clearErrors())
      .then(() => this.redirectToFeed())
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    })
  }

  handleErrors() {
    return(
      <ul className='session error-list'>
        {this.props.errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    )
  }

  formGreeting() {
    return this.props.formType === 'Sign In' ? 'Welcome Back.' : 'Join PizzaPi.'
  }

  render() {
    return(
      <div className='session-form-div'>
        <h2 className='form-greeting' >{this.formGreeting()}</h2>
        <form className='session-form' onSubmit={this.handleSubmit}>
          <span className='close-button' onClick={() => this.props.hideModal()}>&times;</span>
          <label>Enter your username here:
            <br />
            <input className='credentials' 
              type="text  " 
              value={this.state.username} 
              onChange={this.update('username')} />
          </label>
          <br />
          <label>Your password:
            <br />
            <input className='credentials password' 
              type="password" 
              value={this.state.password} 
              onChange={this.update('password')} />
          </label>
          <br />
          {this.handleErrors()}
          <br />
          <input className='black-button' 
            type="submit" 
            value={this.props.formType} />
          <br />
          {this.props.otherForm}
        </form>
      </div>
    )
  }
}

export default withRouter(SessionForm)