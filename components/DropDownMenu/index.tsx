import * as React from "react";
import { Listbox, Switch, Transition } from "@headlessui/react";
import { AppContextProps, AppContext } from "hooks/useApp";
import { CheckIcon, SelectorIcon, XIcon } from "@heroicons/react/solid";
import useCanvas, { CanvasContext, CanvasContextProps } from "hooks/useCanvas";

interface IDropDownMenu {
  data: Record<string, any> | string[];
  selected: any;
  setSelected: (val: any) => void;
}

const DropDownMenu: React.FC<IDropDownMenu> = ({
  data,
  selected,
  setSelected,
}) => {
  const { setEnableScroll, enableScroll } = React.useContext<AppContextProps>(AppContext)
  const isDataArray = Array.isArray(data);
  const graphData = isDataArray ? data : Object.entries(data);
  return (
    <div className="w-72">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
        }}
        //@ts-ignore
        onClick={(e) => setEnableScroll(!enableScroll)}
      >
        <div className="relative mt-1" onMouseEnter={() => {
          console.log("setEnableScroll: ", enableScroll)
          setEnableScroll(false);
        }}
          onMouseLeave={() => {
            setEnableScroll(true)
          }}
        >
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {graphData.map((group, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                  cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={isDataArray ? group : group[0]}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"
                          } block truncate`}
                      >
                        {isDataArray ? group : group[0]}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-amber-600" : "text-amber-600"
                            }
                        absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

    </div>
  );
};
export default DropDownMenu;
