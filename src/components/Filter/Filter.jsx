import style from './Filter.module.css';

export const Filter = ({ name, onChange }) => {
  return (
    <div>
      <p className={style.textFilter}>Find contact by name</p>
      <input
        className={style.inputFilter}
        type="text"
        name="name"
        value={name}
        onChange={onChange}
      />
    </div>
  );
};
