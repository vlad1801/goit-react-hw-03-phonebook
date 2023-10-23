import { Component } from 'react';
import { Form } from './Form/Form';
import { nanoid } from 'nanoid';
import { Contact } from './Contact/Contact';
import { Filter } from './Filter/Filter';
import style from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('keyContacts', stringifiedContacts);
    }
  }

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('keyContacts');
    if (stringifiedContacts) {
      const parsedContacts = JSON.parse(stringifiedContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  handleAddContact = data => {
    const { name, number } = data;
    if (
      this.state.contacts.find(
        contact => contact.name === name && contact.number === number
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...data, id: nanoid() }],
    }));
  };

  handleFilterChange = event => {
    const inputFilter = event.target.value;
    this.setState({ filter: inputFilter });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state.filter;
    const filterContacts = this.state.contacts.filter(contact => {
      return (
        contact.name
          .toLowerCase()
          .includes(this.state.filter.trim().toLowerCase()) ||
        contact.number.includes(this.state.filter)
      );
    });

    return (
      <div className={style.wrap}>
        <h1 className={style.title}>Phonebook</h1>
        <Form handleAddContact={this.handleAddContact} />
        <h2 className={style.titleContact}>Contacts</h2>
        <Filter onChange={this.handleFilterChange} filter={filter} />
        <Contact
          contacts={filterContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
