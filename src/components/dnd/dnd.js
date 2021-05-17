import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

export default class Dnd extends React.Component {
  constructor(props) {
    super(props);

    let { realFiles } = props;
    if (!realFiles) {
      realFiles = [];
    }

    this.state = {
      items: realFiles
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map(
                (item, index) => {
                  const stringId = item.id.toString();

                  return <Draggable
                    key={item.id}
                    draggableId={stringId}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div>
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
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                }
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


