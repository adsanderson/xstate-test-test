import { Machine, assign, spawn, sendParent } from "xstate";

// const dropdownMachine = Machine({
//   initial: "start",
//   states: {
//     start: {
//       on: {
//         SEARCH: "open"
//       },
//       meta: {
//         test: async testContext => {
//           await testContext.renderResult.findByText("Enter a fruit");
//         }
//       }
//     },
//     open: {
//       on: {
//         SELECT: {
//           target: "start",
//           actions: assign({
//             selectedValue: (_, evt) => evt.selectedValue
//           })
//         }
//       },
//       meta: {
//         test: async testContext => {
//           const list = await testContext.renderResult.findByRole("listbox");
//           expect(list.childNodes.length).toBe(1);
//         }
//       }
//     }
//   }
// });

// export const existingComponentMachine = Machine({
//   id: "downshiftTestCase",
//   context: {
//     selectedValue: ""
//   },
//   initial: "noSelection",
//   states: {
//     noSelection: {
//       entry: assign({
//         dropdownRef: spawn(dropdownMachine)
//       }),
//       on: {
//         SELECT: "hasSelection"
//       },
//       meta: {
//         test: async testContext => {
//           await testContext.renderResult.findByTestId("selectionOutput");
//         }
//       }
//     },
//     hasSelection: {
//       on: {
//         SELECT: "hasSelection",
//         CLEAR: "clearedSelection"
//       },
//       meta: {
//         test: async testContext => {
//           await testContext.renderResult.findByText("You selected apple");
//         }
//       }
//     },
//     clearedSelection: {
//       on: {
//         SELECT: "hasSelection"
//       },
//       meta: {
//         test: async testContext => {
//           await testContext.renderResult.findByText("Selection cleared");
//         }
//       }
//     }
//   },
//   meta: {
//     test: () => {
//       /* noop */
//     }
//   }
// });

const dropdownMachine = Machine({
  initial: "start",
  states: {
    start: {
      on: {
        SEARCH: "open"
      },
      meta: {
        test: async testContext => {
          await testContext.renderResult.findByText("Enter a fruit");
        }
      }
    },
    open: {
      on: {
        SELECT: {
          target: "start",
          actions: sendParent({
            type: "SELECT",
            selectedValue: "apple"
          })
        }
      },
      meta: {
        test: async testContext => {
          const list = await testContext.renderResult.findByRole("listbox");
          expect(list.childNodes.length).toBe(1);
        }
      }
    }
  }
});

export const existingComponentMachine = Machine({
  id: "downshiftTestCase",
  context: {
    selectedValue: ""
  },
  initial: "noSelection",
  states: {
    noSelection: {
      invoke: {
        src: dropdownMachine
      },
      on: {
        SELECT: "hasSelection"
      },
      meta: {
        test: async testContext => {
          await testContext.renderResult.findByTestId("selectionOutput");
        }
      }
    },
    hasSelection: {
      on: {
        SELECT: "hasSelection",
        CLEAR: "clearedSelection"
      },
      meta: {
        test: async testContext => {
          await testContext.renderResult.findByText("You selected apple");
        }
      }
    },
    clearedSelection: {
      on: {
        SELECT: "hasSelection"
      },
      meta: {
        test: async testContext => {
          await testContext.renderResult.findByText("Selection cleared");
        }
      }
    }
  },
  meta: {
    test: () => {
      /* noop */
    }
  }
});
