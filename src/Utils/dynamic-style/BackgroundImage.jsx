// DynamicBackground.js

const BackgroundWithImage = ({ imageURL }) => {
  const style = {
    background: `linear-gradient(to right, red, #005757fd), url(${imageURL}) no-repeat fixed`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',

  };

  return <div className="bg-dark-food" style={style}>
    <div className="w-full h-full bg-primaryColor z-10"></div>
    <img className="h-full object-cover" src={imageURL} alt="" />
    </div>;
};

  export default BackgroundWithImage