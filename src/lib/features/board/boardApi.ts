import { Column } from "@/app/api/data/store";
import { Task } from "@/types/task";
import { showErrorToast } from "@/utils/toast";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuid } from "uuid";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Board"],
  endpoints: (builder) => ({
    getBoard: builder.query<Column[], void>({
      query: () => "/board",
      providesTags: ["Board"],
    }),

    addColumn: builder.mutation<Column, { title: string }>({
      query: ({ title }) => ({
        url: "/board/add-column",
        method: "POST",
        body: { title },
      }),
      async onQueryStarted({ title }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getBoard", undefined, (draft) => {
            draft.push({ id: uuid(), title, tasks: [] });
          })
        );
        try {
          await queryFulfilled; 
          dispatch(boardApi.util.invalidateTags(["Board"]));
        } catch (err: any) {
          console.error("Error adding column:", err);
          patchResult.undo();
          showErrorToast("Failed to add column, please try later.");
        }
      },
    }),

    updateColumn: builder.mutation<Column, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `/board/update-column`,
        method: "PATCH",
        body: { id, title },
      }),
      async onQueryStarted({ id, title }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getBoard", undefined, (draft) => {
            const col = draft.find((c) => c.id === id);
            if (col) col.title = title;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          showErrorToast("Failed to update column, please try later.");
        }
      },
    }),

    deleteColumn: builder.mutation<boolean, { id: string }>({
      query: ({ id }) => ({
        url: `/board/delete-column`,
        method: "DELETE",
        body: { id },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getBoard", undefined, (draft) => {
            return draft.filter((col) => col.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          showErrorToast("Failed to delete column, please try later.");
        }
      },
    }),

    addTask: builder.mutation<Task,{ columnId: string; task: Omit<Task, "id"> }>({
      query: ({ columnId, task }) => ({
        url: `/board/add-task`,
        method: "POST",
        body: { columnId, task },
      }),
      async onQueryStarted({ columnId, task }, { dispatch, queryFulfilled }) {
        const id = uuid();
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getBoard", undefined, (draft) => {
            const col = draft.find((c) => c.id === columnId);
            if (col) col.tasks.push({ ...task, id });
          })
        );
        try {
          await queryFulfilled;
          dispatch(boardApi.util.invalidateTags(["Board"]));
        } catch {
          patchResult.undo();
          showErrorToast("Failed to add task, please try later.");
        }
      },
    }),

    updateTask: builder.mutation<Task,{ columnId: string; taskId: string; task: Partial<Task> }>({
      query: ({ columnId, taskId, task }) => ({
        url: `/board/update-task`,
        method: "PATCH",
        body: { columnId, taskId, task },
      }),
      async onQueryStarted(
        { columnId, taskId, task },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getBoard", undefined, (draft) => {
            const col = draft.find((c) => c.id === columnId);
            const t = col?.tasks.find((tk) => tk.id === taskId);
            if (t) Object.assign(t, task);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          showErrorToast("Failed to update task, please try later.");
        }
      },
    }),

    deleteTask: builder.mutation<boolean, { columnId: string; taskId: string }>(
      {
        query: ({ columnId, taskId }) => ({
          url: `/board/delete-task`,
          method: "DELETE",
          body: { columnId, taskId },
        }),
        async onQueryStarted({ columnId, taskId }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            boardApi.util.updateQueryData("getBoard", undefined, (draft) => {
              const col = draft.find((c) => c.id === columnId);
              if (col) col.tasks = col.tasks.filter((task) => task.id !== taskId);
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
            showErrorToast("Failed to delete task, please try later.");
          }
        },
      }
    ),

    moveTask: builder.mutation<void, {
      fromColumnId: string;
      toColumnId: string;
      taskId: string;
      newIndex: number;
    }>({
      query: (payload) => ({
        url: "/board/move-task",
        method: 'PATCH',
        body: payload,
      }),
      async onQueryStarted({ fromColumnId, toColumnId, taskId, newIndex }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getBoard", undefined, (draft) => {
            const fromCol = draft.find((col) => col.id === fromColumnId);
            const toCol = draft.find((col) => col.id === toColumnId);
            if (!fromCol || !toCol) return;

            const index = fromCol.tasks.findIndex((t) => t.id === taskId);
            if (index === -1) return;

            const [movedTask] = fromCol.tasks.splice(index, 1);
            toCol.tasks.splice(newIndex, 0, movedTask);
          })
        );

        try {
          await queryFulfilled;
        } catch(err : any) {
          patchResult.undo();
          const errorMsg = err?.error?.data?.error || "Failed to move task.";
          showErrorToast(errorMsg);
        }
      }
    })

  }),
});

export const {
  useGetBoardQuery,
  useAddColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useMoveTaskMutation
} = boardApi;
