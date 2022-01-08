import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Icon from "@material-tailwind/react/Icon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Select = ({
  options = [],
  selected = {},
  onSelect = () => undefined,
}) => {
  const renderSelectItem = (name, selectedField, active) => {
    return (
      <div className="flex justify-between p-0 m-0">
        <div className="flex items-center">
          <Icon name="list_alt" size="xl" color="dark" />
          <span className={classNames("ml-3 block truncate font-normal")}>
            {name}
          </span>
        </div>

        {selectedField ? <Icon name="check" size="xl" color="dark" /> : null}
      </div>
    );
  };
  return (
    <Listbox value={selected} onChange={onSelect}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {renderSelectItem(selected.name, false, false)}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.length > 0 &&
                  options.map((person, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) =>
                        renderSelectItem(person.name, selected, active)
                      }
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
export default Select;
