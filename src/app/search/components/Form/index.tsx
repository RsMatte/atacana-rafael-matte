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
      <form className="form" data-testid="main-form" onSubmit={handleSubmit}>
        <div className="form-search">
          <label htmlFor="term">Search</label>
          <input
            id="term"
            name="term"
            type="text"
            placeholder="treatment study"
            onChange={handleChange}
            value={values.term}
            data-testid="search-input"
          />
        </div>

        <div className="form-select form-status">
          <label htmlFor="status">Status</label>
          <select
            value={values.status}
            onChange={handleChange}
            id="status"
            name="status"
            data-testid="status-select"
          >
            {statusList.map((sts) => (
              <option key={sts.text} value={sts.value}>
                {sts.text}
              </option>
            ))}
          </select>
        </div>

        <div className="form-select form-phase">
          <label htmlFor="phase">Phase</label>
          <select
            value={values.phase}
            onChange={handleChange}
            id="phase"
            name="phase"
            data-testid="phase-select"
          >
            {phaseList.map((phs) => (
              <option key={phs.text} value={phs.value}>
                {phs.text}
              </option>
            ))}
          </select>
        </div>

        <div className="form-date form-from">
          <label htmlFor="from">Completion date from</label>
          <input
            id="from"
            name="from"
            type="date"
            onChange={handleChange}
            value={values.from}
            data-testid="from-input"
          />
        </div>

        <div className="form-date form-to">
          <label htmlFor="to">Completion date to</label>
          <input
            id="to"
            name="to"
            type="date"
            max="2025-12-31"
            onChange={handleChange}
            value={values.to}
            data-testid="to-input"
          />
        </div>

        <div className="form-buttons">
          <button
            className="button-submit"
            type="submit"
            data-testid="submit-button"
          >
            Submit
          </button>
          <button
            className="button-reset"
            type="button"
            data-testid="reset-button"
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
