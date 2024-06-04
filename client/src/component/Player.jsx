function BaseballField() {
    const [items, setItems] = React.useState(players);
  
    const onDragEnd = (result) => {
      if (!result.destination) return;
      const reorderedItems = Array.from(items);
      const [removed] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 1, removed);
      setItems(reorderedItems);
    };
  
    return (
      <ChakraProvider>
        <Box width="100vw" height="100vh" position="relative" bg="green.500">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="field" direction="horizontal">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          m={2}
                          p={4}
                          bg="white"
                          borderRadius="md"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          width="100px"
                          height="100px"
                          textAlign="center"
                        >
                          <Text>{item.name}</Text>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </ChakraProvider>
    );
  }