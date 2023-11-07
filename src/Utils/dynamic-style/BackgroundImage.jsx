import PropTypes from 'prop-types';
const BackgroundWithImage = ({ imageURL }) => {
  const style = {
    background: `linear-gradient(to right, red, #005757fd), url(${imageURL}) no-repeat fixed`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
  };

  return (
    <div className="bg-dark-food" style={style}>
      <div className="w-full h-full bg-primaryColor z-10"></div>
      <img className="h-full w-full object-cover" src={imageURL} alt="" />
    </div>
  );
};

BackgroundWithImage.propTypes = {
  imageURL: PropTypes.string.isRequired, // imageURL prop should be a string and is required.
};

export default BackgroundWithImage;