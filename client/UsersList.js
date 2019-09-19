import React from 'react';

import styles from './UsersList.css';

// komponent prezentacyjny

const UsersList = props => (
  <div className={styles.Users}>
    <div className={styles.UsersOnline}>
      {props.users.length // odczytujemy liczbę uzytkowników z długości tablicy users
      } people online
    </div>
    <ul className={styles.UsersList}>
      {
        // mapujemy tablicę z listą userów aby zmienic jej elementy
        props.users.map((user) => {
          return (
            <li key={user.id} className={styles.UserItem}>
              {user.name}
            </li>
          );
        })
      }
    </ul>
  </div>
);

export default UsersList;