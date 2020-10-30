import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    faculty: "",
    year: "",
    phone: "",
    desiredperweek: "",
    hobbies: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    school,
    faculty,
    year,
    phone,
    desiredperweek,
    bio,
    hobbies,
    facebook,
    instagram,
    linkedin,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select
            placeholder='School'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Your School</option>
            <option value='IDC'>IDC</option>
          </select>
        </div>
        <div className='form-group'>
          <select name='faculty' value={faculty} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Your Faculty</option>
            <option value='CS & Entrepreneurship'>CS & Entrepreneurship</option>
            <option value='CS'>CS</option>
          </select>
          <small className='form-text'>
            It is important in order to know your Mingle Friends
          </small>
        </div>
        <div className='form-group'>
          <select
            placeholder='Year'
            name='year'
            value={year}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Your Year</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Phone Number'
            name='phone'
            value={phone}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className='form-group'>
          <select
            placeholder='Mingles Per Week'
            name='desiredperweek'
            value={desiredperweek}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select How Many Mingles You Want a Week</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Hobbies'
            name='hobbies'
            value={hobbies}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. Sports, Progrraming,
            Netflix...)
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
