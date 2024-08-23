import React, { useState, useEffect } from 'react';
import caseReportingActor from '../../../dfx';

const CaseReportForm = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [offenderPic, setOffenderPic] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        // Replace `getTokenBalance` with the actual method to get token balance
        const balance = await caseReportingActor.getTokenBalance();
        setTokenBalance(balance);
      } catch (error) {
        console.error('Error fetching token balance:', error);
      }
    };

    fetchTokenBalance();
  }, []);

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
    <div className="form-container">
      <div className="token-balance">
        <span>Wish Coins: {tokenBalance}</span>
      </div>
      <h2>Report a Case</h2>
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
        <label className="file-upload">
          Offender Picture (optional):
          <input type="file" onChange={(e) => setOffenderPic(e.target.files[0])} />
        </label>
        <button type="submit">Submit Case</button>
      </form>
    </div>
  );
};

export default CaseReportForm;
