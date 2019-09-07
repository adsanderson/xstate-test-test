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
        TRY_EVENT: "event_guarded"
      },
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("start", {
            exact: false
          });
        }
      }
    },
    event_guarded: {
      initial: "event_initial",
      states: {
        event_initial: {
          on: {
            TRY_EVENT: [
              {
                target: "event_left",
                cond: "eventGuard"
              },
              {
                target: "event_right"
              }
            ]
          },
          meta: {
            test: async payload => {
              await payload.renderResult.findByText("event_initial", {
                exact: false
              });
            }
          }
        },
        event_left: {
          type: "final",
          meta: {
            test: async payload => {
              await payload.renderResult.findByText("event_left", {
                exact: false
              });
            }
          }
        },
        event_right: {
          type: "final",
          meta: {
            test: async payload => {
              await payload.renderResult.findByText("event_right", {
                exact: false
              });
            }
          }
        }
      },
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("event_guarded", {
            exact: false
          });
        }
      }
    }
  }
});
