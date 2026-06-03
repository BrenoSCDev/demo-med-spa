import { LanguageProvider } from './contexts/LanguageContext';
import LanguagePicker from './components/LanguagePicker';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Credentials from './components/Credentials';
import Testimonials from './components/Testimonials';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <LanguagePicker />
      <Hero />
      <Services />
      <Gallery />
      <Process />
      <Credentials />
      <Testimonials />
      <AppointmentForm />
      <Footer />
    </LanguageProvider>
  );
}
