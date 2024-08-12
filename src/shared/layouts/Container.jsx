

import React from "react";

const Container = ({ className = '', children }) => {
  return (
    <section className={`${className} max-w-6xl mx-auto sm:px-4  `}>
      {children}
    </section>
  );
};

export default Container;
