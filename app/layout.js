import MainHeader from '@/components/main-header/main-header';
import './globals.css';
import MainHeaderBackground from '@/components/main-header/main-header-background';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeaderBackground /> 

        <MainHeader />

        {children}
      </body>
    </html>
  );
}
