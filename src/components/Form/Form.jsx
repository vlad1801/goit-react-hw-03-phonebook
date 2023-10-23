import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './Form.module.css';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.handleAddContact({ name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={style.form} onSubmit={this.handleSubmit}>
        <label className={style.label}>
          <span className={style.spanText}>Name</span>
          <input
            className={style.inputForm}
            id={nanoid()}
            onChange={this.handleChange}
            type="text"
            name="name"
            required
            value={this.state.name}
            placeholder="Rosie Simpson"
          />
        </label>
        <label className={style.label}>
          <span className={style.spanText}>Number</span>
          <input
            className={style.inputForm}
            id={nanoid()}
            onChange={this.handleChange}
            type="tel"
            name="number"
            required
            placeholder="111-22-33"
            value={this.state.number}
          />
        </label>
        <button className={style.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
