import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Frozen Gate - Premium IQF Fruits & Vegetables',
  description: 'Frozen Gate is a leading manufacturer of IQF Frozen Fruits & Vegetables, exporting premium products worldwide for over 30 years.',
  keywords: 'frozen fruits, frozen vegetables, IQF, premium frozen products, food export',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
