import React, { useState } from 'react';
import { caseReportingActor } from '../../../dfx';

const CaseReportForm = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [offenderPic, setOffenderPic] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await caseReportingActor.submitCase(location, new Date(date).getTime(), description, offenderPic);
      alert(result);
    } catch (error) {
      console.error('Error submitting case:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Offender Picture (optional):
        <input type="file" onChange={(e) => setOffenderPic(e.target.files[0])} />
      </label>
      <button type="submit">Submit Case</button>
    </form>
  );
};

export default CaseReportForm;
