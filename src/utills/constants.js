import PropTypes from 'prop-types';

export const userShape = PropTypes.shape({
  about: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  cohort: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
}).isRequired;

export const cardShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  owner: userShape,
  likes: PropTypes.arrayOf(userShape).isRequired,
}).isRequired;
