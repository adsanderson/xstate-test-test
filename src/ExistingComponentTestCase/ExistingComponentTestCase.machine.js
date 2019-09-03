import { Machine, assign } from "xstate";

export const existingComponentMachine = Machine({
  id: "downshiftTestCase",
  initial: "start",
  states: {
    start: {
      on: {
        SEARCH: "open"
      },
      meta: {
        test: async payload => {
          return true;
          // await payload.renderResult.findByText("start");
        }
      }
    },
    open: {
      meta: {
        test: async payload => {
          const list = await payload.renderResult.findByRole("listbox");
          expect(list.childNodes.length).toBe(1);
        }
      }
    }
  }
});
