import React from 'react';

import { Button } from '@learnbase/ui';
import { isWindow } from '@learnbase/utils';

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
