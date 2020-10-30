import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { name, _id, avatar },
    school,
    faculty,
    year,
    hobbies,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} className='round-img' alt='avatar' />
      <div>
        <h2>{name}</h2>
        <p>
          {year} year {school && <span>at {faculty}</span>}
        </p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {hobbies.slice(0, 4).map((hobbie, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {hobbie}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
