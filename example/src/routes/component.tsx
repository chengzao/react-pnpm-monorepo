import { useParams } from 'react-router-dom';

import * as Components from '../components/index';

import ErrorPage from '../error-page';

export default function Contact() {
  const searchParams = useParams();

  const id = searchParams['id'];

  const RenderComponent = Components[id] || ErrorPage;

  return (
    <div id="components">
      <RenderComponent />
    </div>
  );
}
