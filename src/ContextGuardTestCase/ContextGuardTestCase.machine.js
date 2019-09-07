import { Machine, assign } from "xstate";

const l = content => {
  console.log(content);
  return content;
};

const contextGuard = ctx => ctx.isBadFlag;
const eventGuard = (_, evt) => evt.result;

export const guardMachine = Machine({
  id: "guardTestCase",
  initial: "start",
  context: {
    isBadFlag: false
  },
  states: {
    start: {
      on: {
        TOGGLE_BAD_FLAG: {
          target: "start",
          actions: assign(context => ({
            isBadFlag: !context.isBadFlag
          }))
        },
        TRY_CONTEXT: "context_guarded"
      },
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("start", {
            exact: false
          });
        }
      }
    },
    context_guarded: {
      initial: "context_initial",
      states: {
        context_initial: {
          on: {
            TRY_CONTEXT: [
              {
                target: "context_left",
                cond: ctx => ctx.isBadFlag,
                actions: assign(() => ({ isBadFlag: false }))
              },
              {
                target: "context_right"
              }
            ]
          },
          meta: {
            test: async payload => {
              await payload.renderResult.findByText("context_initial", {
                exact: false
              });
            }
          }
        },
        context_left: {
          type: "final",
          meta: {
            test: async payload => {
              await payload.renderResult.findByText("context_left", {
                exact: false
              });
            }
          }
        },
        context_right: {
          type: "final",
          meta: {
            test: async payload => {
              await payload.renderResult.findByText("context_right", {
                exact: false
              });
            }
          }
        }
      },
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("context_guarded", {
            exact: false
          });
        }
      }
    }
  }
});
