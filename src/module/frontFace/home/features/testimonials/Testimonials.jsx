import React from "react";
import Container from "../../../../../shared/layouts/Container";
import man1 from "../../../../../assets/img/home/testimonials/man.jpg";
import women from "../../../../../assets/img/home/testimonials/women.jpg";
import women1 from "../../../../../assets/img/home/testimonials/w.jpg";

// import woman from '../../../../../assets/img/home/testimonials/';
import TestimonialCard from "../../components/TestimonialCard";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sirius Black",
      role: "Developer",
      handle: "buckybwe",
      feedback: {
        title: "Professional work, awesome!",
        text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis mollis, est non commodo luctus.",
      },
      rating: 4,
      image: women,
    },
    {
      id: 2,
      name: "John Doe",
      role: "Designer",
      handle: "johndoe",
      feedback: {
        title: "Creative and detail-oriented",
        text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis mollis, est non commodo luctus.",
      },
      rating: 5,
      image: man1,
    },
    {
      id: 3,
      name: "Jane Smith",
      role: "Project Manager",
      handle: "janesmith",
      feedback: {
        title: "Efficient and reliable",
        text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis mollis, est non commodo luctus.",
      },
      rating: 4,
      image: women1,
    },
  ];

  return (
    <Container>
      <h2 className="text-center">What pople say about us</h2>
      <div className="flex justify-center items-center gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </Container>
  );
};

export default Testimonial;
