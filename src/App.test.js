test("placeholder", () => expect(true).toBeTruthy());

// import React from "react";
// import { Machine, assign } from "xstate";
// import { createModel } from "@xstate/test";
// import { render, cleanup, fireEvent } from "@testing-library/react";
// import { App } from "./App";

// const toggleMachine = Machine({
//   id: "toggle",
//   initial: "one",
//   context: {
//     loops: 0
//   },
//   states: {
//     one: {
//       on: {
//         TOGGLE: "two"
//       },
//       initial: "subOne",
//       states: {
//         subOne: {
//           on: { SUB: "subTwo" },
//           meta: {
//             test: async x => {
//               await x.findByText("subOne", { exact: false });
//             }
//           }
//         },
//         subTwo: {
//           on: { SUB: "subOne" },
//           meta: {
//             test: async x => {
//               await x.findByText("subTwo", { exact: false });
//             }
//           }
//         }
//       },
//       meta: {
//         test: async x => {
//           await x.findByText("one", { exact: false });
//         }
//       }
//     },
//     two: {
//       on: {
//         TOGGLE: "three"
//       },
//       meta: {
//         test: async x => {
//           await x.findByText('"two"');
//         }
//       }
//     },
//     three: {
//       on: {
//         TOGGLE: "four"
//       },
//       meta: {
//         test: async x => {
//           await x.findByText('"three"');
//         }
//       }
//     },
//     four: {
//       on: {
//         TOGGLE: {
//           target: "one",
//           actions: assign({
//             loops: ctx => ctx.loops + 1
//           })
//         }
//       },
//       meta: {
//         test: async x => {
//           await x.findByText('"four"');
//         }
//       }
//     }
//   }
// });

// const toggleModel = createModel(toggleMachine, {
//   events: {
//     TOGGLE: {
//       exec: async x => {
//         await fireEvent.click(x.getByText("Toggle"));
//       }
//     },
//     SUB: {
//       exec: async x => {
//         await fireEvent.click(x.getByText("Sub toggle"));
//       }
//     }
//   }
// });

// afterEach(cleanup);

// describe("toggle", () => {
//   const testPlans = toggleModel.getShortestPathPlans({
//     filter: state => state.context.loops >= 0 && state.context.loops <= 2
//   });

//   testPlans.forEach(async plan => {
//     describe(`plan: ${plan.description}`, () => {
//       plan.paths.forEach(path => {
//         it(`path: ${path.description}`, async () => {
//           const x = render(<App />);

//           await path.test(x);
//         });
//       });
//     });
//   });

//   // const testPlansSimple = toggleModel.getSimplePathPlans();

//   // testPlansSimple.forEach(async plan => {
//   //   describe(`plan: ${plan.description}`, () => {
//   //     plan.paths.forEach(path => {
//   //       it(`path: ${path.description}`, async () => {
//   //         const x = render(<App />);

//   //         await path.test(x);
//   //       });
//   //     });
//   //   });
//   // });

//   it("should have full coverage", () => {
//     return toggleModel.testCoverage();
//   });
// });
