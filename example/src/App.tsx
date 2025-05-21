import React from 'react';

// import { Button } from '@learnbase/ui';
// import { isWindow } from '@learnbase/utils';
// import { Button as MButton, Demo } from '@learnbase/vite-pack';
// import '@learnbase/vite-pack/dist/esm/style.css'
import { CarouselCustom } from '@learnbase/rslib';

function App() {
  // console.log(isWindow(window));

  return (
    <>
      <div>
        <h1>App</h1>

        <div style={{ width: '500px', height: '300px' }}>
          <CarouselCustom />
        </div>

        {/* <Button color="red" onClick={() => console.log('clicked')} />
        <MButton color="blue" onClick={() => console.log('clicked')} />
        <Demo title="hahaha" /> */}
      </div>
    </>
  );
}

export default App;
