
import PropTypes from 'prop-types';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

function Providers({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired, // Validate the children prop
};

export default Providers;