import './styles.css';

import { useFormikContext, FormikContextType } from 'formik';

import { phaseList, statusList } from './data';
import type { FormProps, FormValues } from './types';

const Form = ({ resetData }: FormProps) => {
  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
  }: FormikContextType<FormValues> = useFormikContext();

  return (
    <div className="filter">
      <form className="filter-form" onSubmit={handleSubmit}>
        <label htmlFor="term">Search by code, title or acronym:</label>
        <input
          id="term"
          name="term"
          type="text"
          placeholder="Type here"
          onChange={handleChange}
          value={values.term}
        />
        <button className="button-primary" type="submit">
          Search
        </button>

        <div className="filter-select">
          <select value={values.status} onChange={handleChange} name="status">
            {statusList.map((sts) => (
              <option key={sts.text} value={sts.value}>
                {sts.text}
              </option>
            ))}
          </select>

          <select value={values.phase} onChange={handleChange} name="phase">
            {phaseList.map((phs) => (
              <option key={phs.text} value={phs.value}>
                {phs.text}
              </option>
            ))}
          </select>
          <button
            className="button-primary"
            onClick={(e) => {
              handleReset(e);
              resetData();
            }}
          >
            Reset
          </button>
        </div>

        <div>
          <label htmlFor="date">Completed on</label>
          <input
            id="date"
            name="date"
            type="date"
            max="2025-12-31"
            onChange={handleChange}
            value={values.date}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
