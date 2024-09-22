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
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-search">
          <label htmlFor="term">Search</label>
          <input
            id="term"
            name="term"
            type="text"
            placeholder="treatment study"
            onChange={handleChange}
            value={values.term}
          />
        </div>

        <div className="form-select">
          <label htmlFor="status">Status</label>
          <select
            value={values.status}
            onChange={handleChange}
            id="status"
            name="status"
          >
            {statusList.map((sts) => (
              <option key={sts.text} value={sts.value}>
                {sts.text}
              </option>
            ))}
          </select>
        </div>

        <div className="form-select">
          <label htmlFor="phase">Phase</label>
          <select
            value={values.phase}
            onChange={handleChange}
            id="phase"
            name="phase"
          >
            {phaseList.map((phs) => (
              <option key={phs.text} value={phs.value}>
                {phs.text}
              </option>
            ))}
          </select>
        </div>

        <div className="form-date">
          <label htmlFor="date">Completion date</label>
          <input
            id="date"
            name="date"
            type="date"
            max="2025-12-31"
            onChange={handleChange}
            value={values.date}
          />
        </div>

        <div className="form-buttons">
          <button className="button-submit" type="submit">
            Submit
          </button>
          <button
            className="button-reset"
            type="button"
            onClick={(e) => {
              handleReset(e);
              resetData();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
