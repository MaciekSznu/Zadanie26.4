// importujemy moduły
import React, {Component} from 'react';

import styles from './UserForm.css';

// komponent-kontener

// tworzymy komponent
class UserForm extends Component {
  constructor(props) {
    super(props);
    // ten komponent posiada własny stan name
    this.state = {name: ''};
  }

  // metoda zatwierdzająca formularz modyfikująca tym samym stan w komponencie App
  handleSubmit(e) {
    e.preventDefault();
    this.props.onUserSubmit(this.state.name); // przekazujemy do metody onUserSubmit to co zostało wpisane w formularzu
  }

  // metoda odbiera value wpisywana w input a następnie modyfikuje odpowiednio stan - zmienia tekst widoczny w inpuci
  handleChange(e) {
    this.setState({ name : e.target.value });
  }

  render() {
    return(
      // formularz z jednym polem
      <form className={styles.UserForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.UserInput}
          placeholder='Write your nickname and press enter'
          onChange={e => this.handleChange(e)} // props dzięki któremu modyfikujemy value
          value={this.state.name} // początkowa wrtośc to puste pole pobiearne name z konstruktora
        />
      </form>
    );
  }
}

// exportujemy komponent
export default UserForm;