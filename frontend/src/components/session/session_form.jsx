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
    return this.props.formType === 'Sign In' ? 'Welcome Back.' : 'PiDough.'
  }

  render() {
    return(
      <div className=''>
        <h2 className='mb-4 font-medium' >{this.formGreeting()}</h2>
        {/* <span className='cursor-pointer top-1 right-3' onClick={() => this.props.hideModal()}>&times;</span> */}
        <form className='session-form' onSubmit={this.handleSubmit}>
          {/* <span className='cursor-pointer absolute top-1 right-3 font-extrabold' onClick={() => this.props.hideModal()}>&times;</span> */}
          <label>Username:
            <br />
            <input className='w-64 mb-3 border-b-2 border-yellow-900 outline-0' 
              type="text  " 
              value={this.state.username} 
              onChange={this.update('username')} />
          </label>
          <br />
          <label>Password:
            <br />
            <input className='w-64 border-b-2 border-yellow-900 outline-0' 
              type="password" 
              value={this.state.password} 
              onChange={this.update('password')} />
          </label>
          <br />
          {this.handleErrors()}
          <br />
          <input className='mb-3 cursor-pointer font-medium text-gray-800 hover:text-black hover:italic' 
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