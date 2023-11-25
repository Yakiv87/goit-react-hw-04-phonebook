import React, { Component } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import s from "./Form.module.css";

class Form extends Component {
  static propTypes = {
    submitMethod: PropTypes.func.isRequired,
  };
  state = { name: "", number: "", id: "" };

 

  handleClick = (event) => {
    const { value, name, id } = event.target;
    this.setState({ [name]: value, id: id });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitMethod(this.state);
    this.resetState();
  };

  resetState = () => {
    this.setState({ name: "", number: "", id: "" });
  };

  render() {
    return (
      <form className={s.thumb} onSubmit={this.handleSubmit}>
        <label htmlFor={this.uniqId}>
          <span className={s.name}>Name</span>
          <input
            className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Bath de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleClick}
            id={nanoid()}
          />
        </label>

        <label>
          <span className={s.name}>Number</span>
          <input
            type="tel"
            className={s.input}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleClick}
            value={this.state.number}
            id={nanoid()}
          />
        </label>
        <button type="submit" className={s.button}>
          Save contact
        </button>
      </form>
    );
  }
}

export default Form;