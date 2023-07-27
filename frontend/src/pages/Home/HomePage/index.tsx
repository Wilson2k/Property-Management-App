import HomeNav from '../../../components/HomeNav';
import Home from './Home';

export default function HomePage() {
  return (
    <div>
      <HomeNav link={'/'} />
      <Home />
    </div>
  );
}
