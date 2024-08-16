

import React from "react";

const Container = ({ className = '', children }) => {
  return (
    <section className={`${className} px-3 py-8 max-w-6xl mx-auto sm:px-4  `}>
      {children}
    </section>
  );
};

export default Container;
