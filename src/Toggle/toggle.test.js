import React from "react";
import { Machine, assign } from "xstate";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Toggle } from "./Toggle";

const toggleMachine = Machine({
  id: "toggle",
  initial: "one",
  context: {
    loops: 0
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
            test: async renderResult => {
              await renderResult.findByText("subOne", { exact: false });
            }
          }
        },
        subTwo: {
          on: { SUB: "subOne" },
          meta: {
            test: async renderResult => {
              await renderResult.findByText("subTwo", { exact: false });
            }
          }
        }
      },
      meta: {
        test: async renderResult => {
          await renderResult.findByText("one", { exact: false });
        }
      }
    },
    two: {
      on: {
        TOGGLE: "three"
      },
      meta: {
        test: async renderResult => {
          await renderResult.findByText('"two"');
        }
      }
    },
    three: {
      on: {
        TOGGLE: "four"
      },
      meta: {
        test: async renderResult => {
          await renderResult.findByText('"three"');
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
        test: async renderResult => {
          await renderResult.findByText('"four"');
        }
      }
    }
  }
});

const toggleModel = createModel(toggleMachine, {
  events: {
    TOGGLE: {
      exec: async renderResult => {
        await fireEvent.click(renderResult.getByText("Toggle"));
      }
    },
    SUB: {
      exec: async renderResult => {
        await fireEvent.click(renderResult.getByText("Sub toggle"));
      }
    }
  }
});

afterEach(cleanup);

describe("toggle", () => {
  const testPlans = toggleModel.getShortestPathPlans({
    filter: state => state.context.loops >= 0 && state.context.loops <= 2
  });

  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const renderResult = render(<Toggle />);

          await path.test(renderResult);
        });
      });
    });
  });

  it("should have full coverage", () => {
    return toggleModel.testCoverage();
  });
});
