import { Machine, assign } from "xstate";

export const eventGuardMachine = Machine({
  id: "eventGuardTestCase",
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
  }
});
