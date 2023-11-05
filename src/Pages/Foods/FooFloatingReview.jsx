import PropTypes from 'prop-types';
const FooFloatingReview = ({review}) => {

      const {foodImg,profile,name,comment,date} = review
      console.log(review)

  return (
    <div>
      <div className="rounded-xl  overflow-hidden flex shadow hover:shadow-md max-w-sm bg-[white] cursor-pointer h-32"> 
        <div className={`w-7/12  pl-3 p-3 text-text1 flex flex-col justify-center`}>
          <div className="text-xs text-primary mb-2">
            <a className="flex">
              <img
                src={profile}
                className="rounded-full h-8 w-8 mr-2 object-cover"
              />
              <span className="font-bold tracking-wide text-sm text-pink-400  space-y-1">
                <span>{name}</span>
              <p className="text-[13px] font-normal text-[#575757]">{comment} </p>
          <div className="text-sm text-[black] font-normal text-text2 tracking-wider">
            {date}
          </div>
              </span>
            </a>
          </div>
        </div>
        <div className="lg:flex flex w-5/12 p-5">
          <img
            src={foodImg}
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

FooFloatingReview.propTypes = {
      review: PropTypes.shape({
        foodImg: PropTypes.string.isRequired,
        profile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
    };

export default FooFloatingReview;
