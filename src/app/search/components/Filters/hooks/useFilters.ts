import { useRef, useState } from 'react';
import { fetchTrialByCode, fetchTrialList } from '../api/api';
import { UseFilterProps } from '../types';

const firstPage = 1;

const useFilters = ({ updateData, resetData }: UseFilterProps) => {
  const [page, setPage] = useState(firstPage);
  const [status, setStatus] = useState('');
  const [phase, setPhase] = useState('');
  const inputElement = useRef<HTMLInputElement>(null);

  const isPreviousPageDisabled = page === firstPage;

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = inputElement.current?.value;

    if (!code) {
      inputElement.current?.reportValidity();
      return;
    }

    fetchTrialByCode({ code }).then((trial) => {
      updateData([trial]);
      setPage(firstPage);
    });
  };

  const clickNextPage = () => {
    fetchTrialList({ page: page + 1, status, phase }).then((data) => {
      updateData(data), setPage((prev) => prev + 1);
    });
  };

  const clickPreviousPage = () => {
    fetchTrialList({ page: page - 1, status, phase }).then((data) => {
      updateData(data), setPage((prev) => prev - 1);
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    fetchTrialList({ status: newStatus, phase }).then((data) => {
      updateData(data), setPage(firstPage);
    });
  };

  const handlePhaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPhase = e.target.value;
    setPhase(newPhase);

    fetchTrialList({ status, phase: newPhase }).then((data) => {
      updateData(data), setPage(firstPage);
    });
  };

  const resetFilters = () => {
    setPage(firstPage);
    setStatus('');
    setPhase('');
    resetData();
  };

  return {
    status,
    phase,
    inputElement,
    handleSearchSubmit,
    handleStatusChange,
    handlePhaseChange,
    clickPreviousPage,
    clickNextPage,
    isPreviousPageDisabled,
    resetFilters,
  };
};

export default useFilters;
