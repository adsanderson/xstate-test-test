import { Machine, assign } from "xstate";

export const promiseMachine = Machine({
  id: "promiseTestCase",
  initial: "idle",
  context: {
    fetchedData: ""
  },
  states: {
    idle: {
      on: {
        FETCH: "fetching"
      },
      meta: {
        test: async testContext => {
          await testContext.renderResult.findByText("idle");
        }
      }
    },
    fetching: {
      invoke: {
        src: "simplePromise",
        onDone: {
          target: "done",
          actions: assign({
            fetchedData: (_, evt) => evt.data
          })
        },
        onError: "error"
      },
      meta: {
        test: async function(testContext) {
          await testContext.renderResult.findByText("fetching");
        }
      }
    },
    done: {
      on: {
        ACKNOWLEDGE: "final"
      },
      meta: {
        test: async testContext => {
          // await testContext.renderResult.findByText('"this is the data"');
        }
      }
    },
    error: {
      on: {
        ACKNOWLEDGE: "final"
      },
      meta: {
        test: async testContext => {
          await testContext.renderResult.findByText("error");
        }
      }
    },
    final: {
      type: "final",
      meta: {
        test: async testContext => {
          await testContext.renderResult.findByText("final");
        }
      }
    }
  }
});
