import React from 'react';

import { Button } from '@bossjobmatt/ui';
import { isWindow } from '@bossjobmatt/utils';

function App() {
  console.log(isWindow(window));

  return (
    <>
      <div>
        <Button color="red" onClick={() => console.log('clicked')} />
      </div>
    </>
  );
}

export default App;
