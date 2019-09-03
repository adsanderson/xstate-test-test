import { Machine, assign } from "xstate";

const l = content => {
  console.log(content);
  return content;
};

const contextGuard = ctx => ctx.isBadFlag;
const eventGuard = (_, evt) => false;

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
        TRY_CONTEXT: "context_guarded",
        TRY_EVENT: "event_guarded"
      },
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("start");
        }
      }
    },
    context_guarded: {
      on: {
        TRY_CONTEXT: [
          {
            internal: true,
            cond: contextGuard,
            actions: assign(() => ({ isBadFlag: false }))
          },
          {
            target: "end"
          }
        ]
      },
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("context_guarded");
        }
      }
    },
    event_guarded: {
      on: {
        TRY_EVENT: [
          {
            internal: true,
            cond: eventGuard
          },
          {
            target: "end"
          }
        ]
      },
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("event_guarded");
        }
      }
    },
    end: {
      type: "final",
      meta: {
        test: async payload => {
          await payload.renderResult.findByText("end");
        }
      }
    }
  }
});
