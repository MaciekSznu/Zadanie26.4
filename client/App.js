import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {users: [], messages: [], text: '', name: ''};
  }

  // nasłuchiwanie na wiadomości typu update i message
  componentDidMount() {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
  }

  // odebranie wiadomości, aktualizacja stanu wiadomości; aktualizacja stanu aplikacji oraz wywołanie metody render
  messageReceive(message) {
    const messages = [message, ...this.state.messages];
    this.setState({messages});
  }

  // serwer każdorazowo będzie wysyłał aktualna listę userów
  chatUpdate(users) {
    this.setState({users});
  }

  // aktualizuje bieżący stan aplikacji, emituje wysłaną wiadomość
  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    this.setState({messages});
    socket.emit('message', message);
  }

  // obsługuje nowego usera, wysyła info do serwera, któy powiadamia pozostałych userów o dołączeniu nowego usera do chatu
  handleUserSubmit(name) {
    this.setState({name});
    socket.emit('join', name);
  }

  render() {
    return this.state.name !== '' ? (
      this.renderLayout()
    ) : this.renderUserForm() // zaimplementowane w późniejszej części
  }
  
  renderLayout() {
   return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <div className={styles.AppTitle}>
            ChatApp
          </div>
          <div className={styles.AppRoom}>
            App room
          </div>
        </div>
        <div className={styles.AppBody}>
          <UsersList
            users={this.state.users}
          />
          <div className={styles.MessageWrapper}>
            <MessageList
              messages={this.state.messages}
            />
            <MessageForm
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}
            />
          </div>
        </div>
      </div>
   );
  }

  renderUserForm() {
    return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
  }
};


export default hot(module)(App);