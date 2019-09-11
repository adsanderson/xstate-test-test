import { Machine, assign, spawn } from "xstate";

const someMachine = Machine({
  id: "some",
  initial: "none",
  states: {
    none: {}
  }
});

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
            test: async test => {
              await test.tests.subOne(test.testContext);
            }
          }
        },
        subTwo: {
          on: { SUB: "subOne" },
          meta: {
            test: async test => {
              await test.tests.subTwo(test.testContext);
            }
          }
        }
      },
      meta: {
        test: async test => {
          await test.tests.one(test.testContext);
        }
      }
    },
    two: {
      on: {
        TOGGLE: "three"
      },
      meta: {
        test: async test => {
          await test.tests.two(test.testContext);
        }
      }
    },
    three: {
      on: {
        TOGGLE: "threeTransition"
      },
      meta: {
        test: async test => {
          await test.tests.three(test.testContext);
        }
      }
    },
    threeTransition: {
      invoke: {
        src: "simplePromise",
        onDone: "four"
      },
      meta: {
        test: async test => {
          await test.tests.threeTransition(test.testContext);
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
        test: async test => {
          await test.tests.four(test.testContext);
        }
      }
    }
  }
});
