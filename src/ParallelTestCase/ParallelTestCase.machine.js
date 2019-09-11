import { Machine } from "xstate";

export const parallelMachine = Machine({
  id: "eventGuardTestCase",
  initial: "event_initial",
  type: "parallel",
  states: {
    bold: {
      initial: "off",
      states: {
        on: {
          on: {
            TOGGLE_BOLD: "off"
          },
          meta: {
            test: async testContext => {
              await testContext.test(testContext);
            }
          }
        },
        off: {
          on: {
            TOGGLE_BOLD: "on"
          },
          meta: {
            test: async testContext => {
              await testContext.test(testContext);
            }
          }
        }
      },
      meta: {
        test: async testContext => {
          await testContext.test(testContext);
        }
      }
    },
    italic: {
      initial: "off",
      states: {
        on: {
          on: {
            TOGGLE_ITALIC: "off"
          },
          meta: {
            test: async testContext => {
              await testContext.test(testContext);
            }
          }
        },
        off: {
          on: {
            TOGGLE_ITALIC: "on"
          },
          meta: {
            test: async testContext => {
              await testContext.test(testContext);
            }
          }
        }
      },
      meta: {
        test: async testContext => {
          await testContext.test(testContext);
        }
      }
    },
    underline: {
      initial: "off",
      states: {
        on: {
          on: {
            TOGGLE_UNDERLINE: "off"
          },
          meta: {
            test: async testContext => {
              await testContext.test(testContext);
            }
          }
        },
        off: {
          on: {
            TOGGLE_UNDERLINE: "on"
          },
          meta: {
            test: async testContext => {
              await testContext.test(testContext);
            }
          }
        }
      },
      meta: {
        test: async testContext => {
          await testContext.test(testContext);
        }
      }
    },
    strike: {
      initial: "off",
      states: {
        on: {
          on: {
            TOGGLE_STRIKE: "off"
          },
          meta: {
            test: async testContext => {
              await testContext.test(testContext);
            }
          }
        },
        off: {
          on: {
            TOGGLE_STRIKE: "on"
          },
          meta: {
            test: async testContext => {
              await testContext.test(testContext);
            }
          }
        }
      },
      meta: {
        test: async testContext => {
          await testContext.test(testContext);
        }
      }
    }
  }
});
