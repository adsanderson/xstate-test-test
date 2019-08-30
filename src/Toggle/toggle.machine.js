import { Machine } from "xstate";

export const toggleMachine = Machine({
  id: "toggle",
  initial: "one",
  states: {
    one: {
      on: {
        TOGGLE: "two"
      },
      initial: "subOne",
      states: {
        subOne: {
          on: { SUB: "subTwo" }
        },
        subTwo: {
          on: { SUB: "subOne" }
        }
      }
    },
    two: {
      on: {
        TOGGLE: "three"
      }
    },
    three: {
      on: {
        TOGGLE: "fourT"
      }
    },
    fourT: {
      invoke: {
        src: () => new Promise(res => setTimeout(() => res("done"), 100)),
        onDone: "four"
      }
    },
    four: {
      on: {
        TOGGLE: "one"
      }
    }
  }
});
