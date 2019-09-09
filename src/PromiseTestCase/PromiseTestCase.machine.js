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
        test: async payload => {
          await payload.renderResult.findByText("idle");
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
        test: async function(payload) {
          await payload.renderResult.findByText("fetching");
        }
      }
    },
    done: {
      on: {
        ACKNOWLEDGE: "final"
      },
      meta: {
        test: async payload => {
          // await payload.renderResult.findByText('"this is the data"');
        }
      }
    },
    error: {
      on: {
        ACKNOWLEDGE: "final"
      },
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("error");
        }
      }
    },
    final: {
      type: "final",
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("final");
        }
      }
    }
  }
});
