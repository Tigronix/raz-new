import React, { Component, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { withRazbiratorService } from '../hoc';
import {
  fetchFiles,
  reorderRealFiles,
  getCropImage
} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const Dnd = ({
  realFiles,
  renderDnd,
  onDragEnd,
  filesLoading,
  getCrop
}) => {
  return (
    <div>
      {renderDnd(realFiles, onDragEnd, filesLoading, getCrop)}
    </div>
  )
};

class DndContainer extends Component {
  componentDidMount() {
    this.props.fetchFiles();
  }

  render() {
    const {
      loading,
      error,
      realFiles,
      renderDnd,
      onDragEnd,
      filesLoading,
      getCrop
    } = this.props;

    if (loading) {
      return <Spinner></Spinner>;
    }

    if (error) {
      return <ErrorIndicator></ErrorIndicator>
    }

    return <Dnd
      renderDnd={renderDnd}
      realFiles={realFiles}
      onDragEnd={onDragEnd}
      filesLoading={filesLoading}
      getCrop={getCrop}
    ></Dnd>
  }
}

const mapStateToProps = (
  {
    files: {
      loading,
      error,
      realFiles,
      filesLoading
    }
  }
) => {
  return {
    loading,
    error,
    realFiles,
    filesLoading
  };
};

const mapDispatchToProps = (dispatch, { razbiratorService }) => {
  return {
    fetchFiles: fetchFiles(razbiratorService, dispatch),
    onDragEnd: (result, realFiles) => {
      // a little function to help us with reordering the result
      const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
      };

      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const items = reorder(
        realFiles,
        result.source.index,
        result.destination.index
      );

      return dispatch(reorderRealFiles(items));
    },
    renderDnd: (realFiles, onDragEnd, filesLoading, getCrop) => {
      const renderDrag = () => {
        const grid = 8;

        const getItemStyle = (draggableStyle, isDragging) => ({
          // some basic styles to make the items look a bit nicer
          userSelect: 'none',
          padding: grid * 2,
          margin: `0 0 ${grid}px 0`,

          // change background colour if dragging
          background: isDragging ? 'lightgreen' : 'grey',

          // styles we need to apply on draggables
          ...draggableStyle
        });

        const getListStyle = (isDraggingOver) => ({
          background: isDraggingOver ? 'lightblue' : 'lightgrey',
          padding: grid,
          width: 250
        });

        return <DragDropContext onDragEnd={(result) => onDragEnd(result, realFiles)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => {
              return <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {realFiles.map(
                  (item, index) => {
                    const stringId = item.id.toString();

                    return <Draggable
                      key={item.id}
                      draggableId={stringId}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <Fragment>
                            <div
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}

                              style={getItemStyle(
                                provided.draggableProps.style,
                                snapshot.isDragging
                              )}
                            >
                              <img src={item.src} alt="" />
                              <button type="button" className="btn btn-primary mr-1 mb-2 mt-2">Rotate Left</button>
                              <button type="button" className="btn btn-primary mr-1 mb-2">Rotate Right</button>
                              <button
                                onClick={useCallback(() => {
                                  getCrop(item)
                                }, [])}
                                type="button" className="btn btn-warning mr-1 mb-2">Crop</button>
                              <button type="button" className="btn btn-danger mr-1 mb-2">Delete</button>
                            </div>
                            { provided.placeholder}
                          </Fragment>
                        )
                      }}
                    </Draggable>
                  }
                )}
                {provided.placeholder}
              </div>
            }}
          </Droppable>
        </DragDropContext>
      };


      if (filesLoading && !realFiles) {
        return <Spinner></Spinner>
      }

      if (!filesLoading && realFiles) {
        return renderDrag()
      }

      if (filesLoading && realFiles) {
        return (
          <div>
            <Spinner></Spinner>
            {renderDrag()}
          </div>
        )
      }
    },
    getCrop: (cropFile) => {
      getCropImage(razbiratorService, dispatch, cropFile)
    }
  };
};

export default compose(
  withRazbiratorService(),
  connect(mapStateToProps, mapDispatchToProps)
)(DndContainer);