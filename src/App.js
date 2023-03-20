import React from 'react';
import Footer from './components/footer/footer';
import Header from './components/header/header';

const App = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default App;
