const KanbanData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "하나둘",
      check: true,
      status: "finish",
    },
    "task-2": {
      id: "task-2",
      content: "셋넷",
      check: false,
      status: "progress",
    },
    "task-3": {
      id: "task-3",
      content: "다섯",
      check: false,
      status: "hold",
    },
    "task-4": { id: "task-4", content: "여섯", check: true, status: "finish" },
    "task-5": {
      id: "task-5",
      content: "일곱여덟",
      check: true,
      status: "finish",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default KanbanData;
