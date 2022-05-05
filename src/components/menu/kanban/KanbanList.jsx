import React, { useEffect, useState } from "react";

import styles from "../../../style/menu/_KanbanBoard.module.scss";
import KanbanBoard from "./KanbanBoard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import KanbanData from "./KanbanData";
import InputContainer from "./InputContainer";
import store from "./store";

//테스트용 id정하기
import uuid from "react-uuid";

const KanbanList = () => {
  const [data, setData] = useState(KanbanData);

  console.log("데이터", data);

  const onDragEnd = (result) => {
    //reorder our column
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //보드끼리 이동할 경우
    if (type === "column") {
      // const newBoardOrder = Array.from(data.columnOrder);
      const newBoardOrder = data.columnOrder;
      newBoardOrder.splice(source.index, 1);
      newBoardOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        columnOrder: newBoardOrder,
      };
      setData(newData);
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    //카드가 다른보드로 이동하지 않을 경우
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
    }

    //카드를 드래그해서 다른 보드로 넘길 경우
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  };

  //보드 추가
  const addBoardHandler = (title) => {
    const newBoardId = uuid();
    console.log("보드아이디", newBoardId, title);
    const newBoard = {
      id: newBoardId,
      title: title,
      taskIds: [],
    };
    const newState = {
      columnOrder: [...data.columnOrder, newBoardId],
      columns: {
        ...data.columns,
        [newBoardId]: newBoard,
      },
      tasks: {
        ...data.tasks,
      },
    };
    setData(newState);
  };

  //카드 추가
  const addCardHandler = (title, boardId) => {
    console.log("카드추가탭", title, boardId);
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title: title,
      check: false,
    };
    const list = data.columns[boardId];
    list.taskIds = [...list.taskIds, newCard];

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [boardId]: list,
      },
    };
    setData(newState);
  };

  return (
    <>
      <store.Provider value={{ addBoardHandler, addCardHandler }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="kanbanBoards"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className={styles.kanban_list}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data?.columnOrder.map((columnId, index) => {
                  const column = data.columns[columnId];
                  const boards = column.taskIds?.map(
                    (boardId) => data.tasks[boardId]
                  );
                  return (
                    <KanbanBoard
                      key={columnId}
                      column={column}
                      boards={boards}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
                <InputContainer type="board" addBoard={addBoardHandler} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </store.Provider>
    </>
  );
};

export default KanbanList;
