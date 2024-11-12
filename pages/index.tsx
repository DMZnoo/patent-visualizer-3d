import * as React from "react";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import CameraControls from "components/utils/CameraControls";
import StatsComponent from "components/utils/StatsComponent";
import Widget from "components/Widget";
import useCanvas, { CanvasContext } from "hooks/useCanvas";
import DropZone from "components/DropZone";
import { AppContext, AppContextProps } from "hooks/useApp";
import Loading from "components/Loading";
import BatchNodes3D from "components/GraphicsComponents/3D/BatchNodes3D";
import app from "next/app";
import Data from 'public/merged-data.json';

const Home: NextPage = () => {
  const context = useCanvas();
  const {
    loading,
    setLoading,
    dim,
    layer,
    setLayer,
    setDim,
    graphData,
    setGraphData,
    setCanvasTheme,
    groups,
    setGroups,
    setSelectedGroupId,
    setEnableScroll,
    setShowEdges,
  } = context;
  const appContext = React.useContext<AppContextProps>(AppContext);
  const {
    setCurrentFileName,
    setFileNames,
    setData,
  } = appContext;

  React.useEffect(() => {
    setLoading(true);
    setCurrentFileName("test-data");
    setFileNames(['test-data'])
    setData(Data);
    setGraphData(Data);
    setLoading(false);
  }, []);

  // if (appContext.loading) {
  //   return <Loading />;
  // }

  return (
    <div className="h-screen w-screen">
      {appContext.loading || loading ? (
        <Loading />
      ) : (
        <div className="absolute w-screen h-screen">
          <AppContext.Consumer>
            {(value) => {
              setCanvasTheme(value.appTheme);
              value.setDataGroups(groups);
              setGraphData(value.data);
              setEnableScroll(value.enableScroll);
              setShowEdges(value.showEdges);
              setSelectedGroupId(value.selectedGroupId);
              return (
                <Canvas camera={{ position: [100, 0, 0] }}>
                  <CanvasContext.Provider value={context}>
                    <ambientLight />
                    <pointLight position={[0, 0, 0]} />
                    <axesHelper />
                    <perspectiveCamera
                      aspect={window.innerWidth / window.innerHeight}
                      fov={75}
                      position={[100, 0, 0]}
                      // position={[10000000, 10000000, 2]}
                      near={0.1}
                      far={1000}
                    />
                    <BatchNodes3D />
                    <CameraControls dim={dim} />
                    <StatsComponent />
                  </CanvasContext.Provider>
                </Canvas>
              );
            }}
          </AppContext.Consumer>
          <Widget setLayer={setLayer} layer={layer} setDim={setDim} dim={dim} />
        </div>
      )}
      {/* <div className="absolute mt-20 w-60">
        <DropZone setGraphData={setGraphData} setDim={setDim} />
      </div> */}
    </div>
  );
};

export default Home;
