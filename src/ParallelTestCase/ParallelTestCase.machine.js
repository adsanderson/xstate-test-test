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
            test: async payload => {
              await payload.test(payload);
            }
          }
        },
        off: {
          on: {
            TOGGLE_BOLD: "on"
          },
          meta: {
            test: async payload => {
              await payload.test(payload);
            }
          }
        }
      },
      meta: {
        test: async payload => {
          await payload.test(payload);
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
            test: async payload => {
              await payload.test(payload);
            }
          }
        },
        off: {
          on: {
            TOGGLE_ITALIC: "on"
          },
          meta: {
            test: async payload => {
              await payload.test(payload);
            }
          }
        }
      },
      meta: {
        test: async payload => {
          await payload.test(payload);
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
            test: async payload => {
              await payload.test(payload);
            }
          }
        },
        off: {
          on: {
            TOGGLE_UNDERLINE: "on"
          },
          meta: {
            test: async payload => {
              await payload.test(payload);
            }
          }
        }
      },
      meta: {
        test: async payload => {
          await payload.test(payload);
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
            test: async payload => {
              await payload.test(payload);
            }
          }
        },
        off: {
          on: {
            TOGGLE_STRIKE: "on"
          },
          meta: {
            test: async payload => {
              await payload.test(payload);
            }
          }
        }
      },
      meta: {
        test: async payload => {
          await payload.test(payload);
        }
      }
    }
  }
});
