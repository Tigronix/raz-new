import React, { Fragment } from 'react';
import FilesLoader from '../file-loader';
import Dnd from '../dnd';

const Main = () => {
  return (
    <Fragment>
      <FilesLoader></FilesLoader>
      <Dnd></Dnd>
    </Fragment>
  )
}

export default Main;