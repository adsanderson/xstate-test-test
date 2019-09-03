import React, { useState, Fragment } from "react";
import Downshift from "downshift";

const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" }
];

export function ExistingComponentTestCase() {
  const [selection, setSelection] = useState("");
  return (
    <Fragment>
      <h3>{selection}</h3>

      <Downshift
        onChange={selection =>
          setSelection(
            selection ? `You selected ${selection.value}` : "Selection Cleared"
          )
        }
        itemToString={item => (item ? item.value : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} data-testid="autocompleteInput" />
            <ul {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(
                      item => !inputValue || item.value.includes(inputValue)
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? "lightgray"
                                : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal"
                          }
                        })}
                      >
                        {item.value}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    </Fragment>
  );
}
