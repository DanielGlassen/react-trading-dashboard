import React, { useState } from 'react';
import styles from './InputForm.module.scss'; // Import the CSS module

interface InputFormProps {
  onSubmit: (symbol: string, startDate: string, endDate: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [symbol, setSymbol] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!symbol || !startDate || !endDate) {
      setError('Please fill in all fields.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      setError('End date cannot be before start date.');
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 10) {
      setError('Please select a date range with at least 10 trading days.');
      return;
    }

    onSubmit(symbol.trim().toUpperCase(), startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputForm + " flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"}>
      <div className={styles.formGroup + " flex-1 w-full"}>
        <label htmlFor="symbol">Stock Symbol</label>
        <input
          type="text"
          id="symbol"
          name="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter Stock Symbol (e.g., AAPL)"
          required
        />
      </div>
      <div className={styles.formGroup + " flex-1 w-full"}>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup + " flex-1 w-full"}>
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="w-full md:w-auto">
        <button
          type="submit"
          className={styles.submitButton}
        >
          Search
        </button>
      </div>
      {error && (
        <div className={styles.errorMessage + " w-full md:col-span-4"}>
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default InputForm;
