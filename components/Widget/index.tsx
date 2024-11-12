import { Listbox, Switch, Transition } from "@headlessui/react";
import clsx from "clsx";
import DropDownMenu from "components/DropDownMenu";
import { AppContext, AppContextProps } from "hooks/useApp";
import useSessionStorage from "hooks/useSessionStorage";
import * as React from "react";

interface IWidget {
  setLayer: (val: number) => void;
  layer: number;
}

const Widget: React.FC<IWidget> = ({ setLayer, layer }) => {
  const [linkSize, setLinkSize] = React.useState<number>(0);

  const {
    appTheme,
    setAppTheme,
    data,
    dataGroups,
    setSelectedGroupId,
    selectedGroupId,
    setCurrentFileName,
    setData,
    fileNames,
    currentFileName,
    setShowEdges,
    showEdges,
  } = React.useContext<AppContextProps>(AppContext);


  const [cachedData, setCachedData] = useSessionStorage<Record<string, any>>(
    "cachedData",
    {}
  );

  React.useEffect(() => {
    if (data && Object.keys(data).includes("links")) {
      let size = 0;
      data["links"].forEach((linkArr) => (size += linkArr.length));
      setLinkSize(size);
    }
  }, [data]);
  return (
    <div
      className={clsx('p-4 absolute top-0 right-0 2xl:right-40', appTheme === "dark" ? "bg-[#111A25] text-white" : "bg-gray-300 text-dark")}
    >
      <div className="flex flex-col items-end">
        {/* <div className="flex space-x-5 mr-4">
          {data && fileNames.length > 0 && (
            <DropDownMenu
              data={fileNames}
              selected={currentFileName}
              setSelected={(e) => {
                console.log(e);
                console.log(cachedData);
                if (cachedData[e]) {
                  const loaded = JSON.parse(cachedData[e]);
                  setData(loaded);
                } else {
                  alert("Sorry that data has been lost..");
                }
                setCurrentFileName(e);
              }}
            />
          )}
        </div> */}
        <div className="py-4">
          <Switch.Group>
            <div className="flex items-center mt-4">
              <Switch.Label
                className={clsx('mr-4 text-sm capitalize', appTheme === "dark" ? "text-white" : "text-black")}
              >
                {showEdges ? "Hide" : "Show"} Edges
              </Switch.Label>
              <Switch
                checked={showEdges}
                onChange={setShowEdges}
                className={clsx(showEdges ? "bg-teal-900" : "bg-white", 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75')}
              >
                <span className="sr-only">
                  {showEdges ? "Hide" : "Show"} Edges
                </span>
                <span
                  aria-hidden="true"
                  className={clsx(showEdges ? "translate-x-5 bg-white" : "translate-x-0 bg-teal-900", 'pointer-events-none inline-block h-4 w-4 mt-[2px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200')}
                />
              </Switch>
            </div>
          </Switch.Group>
          <Switch.Group>
            <div className="flex items-center mt-4">
              <Switch.Label
                className={clsx('mr-4 text-sm capitalize', appTheme === "dark" ? "text-white" : "text-black")}
              >
                {appTheme} Theme
              </Switch.Label>
              <Switch
                checked={appTheme === "dark"}
                onChange={() =>
                  appTheme === "dark"
                    ? setAppTheme("light")
                    : setAppTheme("dark")
                }
                className={clsx(appTheme === "dark" ? "bg-black" : "bg-white", 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75')}
              >
                <span className="sr-only">{appTheme} Theme</span>
                <span
                  aria-hidden="true"
                  className={clsx(appTheme === "dark" ? "translate-x-5 bg-white" : "translate-x-0 bg-black", 'pointer-events-none inline-block h-4 w-4 mt-[2px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200')}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>
        <div className="w-full mb-4">
          {data && Object.keys(data).includes("nodes") && (
            <div className="flex items-center justify-between">
              <p className={clsx('text-sm', appTheme === 'dark' ? 'text-gray-400' : 'text-black')}>Total Node Count: </p>
              <p>{data["nodes"].length}</p>
            </div>
          )}
          {data && Object.keys(data).includes("links") && (
            <div className="flex items-center justify-between">
              <p className={clsx('text-sm', appTheme === 'dark' ? 'text-gray-400' : 'text-black')}>Total Link Count: </p>
              <p>{linkSize}</p>
            </div>
          )}
          {data && Object.keys(data).includes("nodes") && (
            <div className="flex items-center justify-between">
              <p className={clsx('text-sm', appTheme === 'dark' ? 'text-gray-400' : 'text-black')}>
                Displayed Node Count:{" "}
              </p>
              <p>{
                data["nodes"].filter(
                  (node) =>
                    node.group.name === selectedGroupId ||
                    (node.group.id === selectedGroupId && node)
                ).length
              }</p>
            </div>
          )}
          {data && Object.keys(data).includes("links") && selectedGroupId && (
            <p>
              Displayed Links Count:{" "}
              {Number.isInteger(Number(selectedGroupId)) &&
                data["links"][Number(selectedGroupId)]
                ? data["links"][Number(selectedGroupId)].length
                : 0}
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p>Groups</p>
            <button className="text-blue-200 text-xs" onClick={() => {
              setSelectedGroupId(undefined)

            }}>Clear</button>
          </div>
          <DropDownMenu
            data={dataGroups}
            selected={selectedGroupId}
            setSelected={setSelectedGroupId}
          />
        </div>
      </div>
    </div>
  );
};
export default Widget;
