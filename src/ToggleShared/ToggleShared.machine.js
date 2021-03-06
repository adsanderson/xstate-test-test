import { Machine, assign } from "xstate";

export const toggleMachine = Machine({
  id: "toggle",
  initial: "one",
  context: {
    loops: 0,
    someRef: null
  },
  states: {
    one: {
      on: {
        TOGGLE: "two"
      },
      initial: "subOne",
      states: {
        subOne: {
          on: { SUB: "subTwo" },
          meta: {
            test: async renderResult => {
              await renderResult.findByText("subOne", { exact: false });
            }
          }
        },
        subTwo: {
          on: { SUB: "subOne" },
          meta: {
            test: async renderResult => {
              await renderResult.findByText("subTwo", { exact: false });
            }
          }
        }
      },
      meta: {
        test: async renderResult => {
          await renderResult.findByText("one", { exact: false });
        }
      }
    },
    two: {
      on: {
        TOGGLE: "three"
      },
      meta: {
        test: async renderResult => {
          await renderResult.findByText('"two"');
        }
      }
    },
    three: {
      on: {
        TOGGLE: "threeTransition"
      },
      meta: {
        test: async renderResult => {
          await renderResult.findByText('"three"');
        }
      }
    },
    threeTransition: {
      invoke: {
        src: "simplePromise",
        onDone: "four"
      },
      meta: {
        test: async renderResult => {
          await renderResult.findByText('"threeTransition"');
        }
      }
    },
    four: {
      on: {
        TOGGLE: {
          target: "one",
          actions: assign({
            loops: ctx => ctx.loops + 1
          })
        }
      },
      meta: {
        test: async renderResult => {
          await renderResult.findByText('"four"');
        }
      }
    }
  }
});
