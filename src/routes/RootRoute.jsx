import { useRoutes } from "react-router-dom";
import { Main, NotFound } from "@layouts";
import Component from "@pages/components/ComponentHome";
import {
  UtilHome,
  StringUtil,
  DateUtil,
  CommonUtil,
  ValidationUtil,
} from "@pageutils";
import { SamplePageHome } from "@samplePages";

import SamplePageCalendarPicker from "@pages/components/SamplePageCalendarPicker";
import SamplePageCheckbox from "@pages/components/SamplePageCheckbox";
import SamplePageTab from "@pages/components/SamplePageTab"; 
import SamplePageToggle from "@pages/components/SamplePageToggle"; 
import CommonAccList from "@pages/samplePages/CommonAccList"; 

const RootRoute = () => {
  const rootRoute = [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/SamplePage/*",
      element: <SamplePageHome />,
    },
    {
      path: "/SamplePageCalendarPicker/*",
      element: <SamplePageCalendarPicker />,
    },
    {
      path: "/Util/*",
      element: <UtilHome />,
    },
    {
      path: "/StringUtil/*",
      element: <StringUtil />,
    },
    {
      path: "/DateUtil/*",
      element: <DateUtil />,
    },
    {
      path: "/ValidationUtil/*",
      element: <ValidationUtil />,
    },
    {
      path: "/Component/*",
      element: <Component />,
    },
    {
      path: "/CommonUtil/*",
      element: <CommonUtil />,
    },
    {
      path: "/SamplePageCheckBox/*",
      element: <SamplePageCheckbox />,
    },
    {
      path: "/SamplePageTab/*",
      element: <SamplePageTab />,
    },
    {
      path: "/SamplePageToggle/*",
      element: <SamplePageToggle />,
    },
    {
      path: "/CommonAccList/*",
      element: <CommonAccList />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return useRoutes(rootRoute || []);
};
export default RootRoute;
