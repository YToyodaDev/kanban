export enum TaskStatus {
  Todo = 'todo',
  Doing = 'doing',
  Done = 'done',
}
export type Task = {
  task: string;
  status: TaskStatus;
  tags: string[];
};
export type TagStyle = {
  [key: string]: { backgroundColor: string };
};
