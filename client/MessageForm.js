import React, {Component} from 'react';
import styles from './MessageForm.css';

// komponent-kontener

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''}; // ustawiamy początkowe puste pole waidomości
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = {
      from : this.props.name, // nadawca wiadomości
      text : this.state.text // treść wiadomości
    };
    this.props.onMessageSubmit(message);
    this.setState({ text: '' }); // wyczyszczenie inputa po wysłaniu wiadomości
  }

  // ustawiamy wartość inputa
  changeHandler(e) {
    this.setState({ text : e.target.value });
  }

  render() {
    return(
      <form className={styles.MessageForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.MessageInput}
          onChange={e => this.changeHandler(e)}
          value={this.state.text}
          placeholder='Message'
        />
      </form>
    );
  }
}

export default MessageForm;