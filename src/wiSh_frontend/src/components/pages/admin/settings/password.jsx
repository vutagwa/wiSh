import React, { useState } from 'react';

const Password = () => {
  const [formState, setFormState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    error: '',
    success: false,
    loading: false
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formState;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormState(prevState => ({
        ...prevState,
        error: 'All fields are required.'
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormState(prevState => ({
        ...prevState,
        error: 'New password and confirmation do not match.'
      }));
      return;
    }

    setFormState(prevState => ({
      ...prevState,
      loading: true,
      error: ''
    }));

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setFormState(prevState => ({
          ...prevState,
          success: true,
          loading: false,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        setFormState(prevState => ({
          ...prevState,
          error: data.message || 'Something went wrong.',
          loading: false
        }));
      }
    } catch (error) {
      setFormState(prevState => ({
        ...prevState,
        error: 'Network error, please try again later.',
        loading: false
      }));
    }
  };

  return (
    <div className="tab-pane fade show active" id="password" role="tabpanel">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Change Password</h5>
          {formState.error && <div className="alert alert-danger">{formState.error}</div>}
          {formState.success && <div className="alert alert-success">Password changed successfully!</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={formState.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={formState.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={formState.loading}>
              {formState.loading ? 'Saving...' : 'Save changes'}
            </button>
          </form>
          <div className="mt-3">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
