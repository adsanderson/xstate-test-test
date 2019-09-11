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
        test: async testContext => {
          await testContext.renderResult.findByText("Enter a fruit");
        }
      }
    },
    open: {
      meta: {
        test: async testContext => {
          const list = await testContext.renderResult.findByRole("listbox");
          expect(list.childNodes.length).toBe(1);
        }
      }
    }
  }
});
