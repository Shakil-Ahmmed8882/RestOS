

import React from "react";

const Container = ({ className = 'pb-8', children }) => {
  return (
    <section className={`${className} py-8 max-w-6xl mx-auto   `}>
      {children}
    </section>
  );
};

export default Container;
