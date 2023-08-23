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
import SamplePageDropdown from "@pages/components/SamplePageDropdown";
import SamplePageTooltip from "@pages/components/SamplePageTooltip";
import SamplePageChartDoughnut from "@pages/components/SamplePageChartDoughnut";
import SamplePageChartLine from "@pages/components/SamplePageChartLine";
import CommonAccList from "@pages/samplePages/CommonAccList";
import SamplePageRadio from "@pages/components/SamplePageRadio";

import SamplePageTextArea from "@pages/components/SamplePageTextArea";
import SamplePageAccordion from "@pages/components/SamplePageAccordion";
import SamplePageSliders from "@pages/components/SamplePageSliders";
import SamplePageList from "@pages/components/SamplePageList";
import SamplePagePaging from "@pages/components/SamplePagePaging";

import MyAssetDiagnose from "@pages/samplePages/MyAssetDiagnose";
import HomeSetup from "@pages/samplePages/HomeSetup";

import CommonLogin from "@pages/samplePages/CommonLogin";
import CommonAccMngList from "@pages/samplePages/CommonAccMngList";
import WithdrawRegister from "@pages/samplePages/WithdrawRegister";

import SampleMain from "@pages/samplePages/SampleMain";
import SampleEvent from "@pages/samplePages/SampleEvent";
import SampleEventQuiz from "@pages/samplePages/SampleEventQuiz";
import InquiryOption from "@pages/samplePages/InquiryOption";
import SampleTransfer from "@pages/samplePages/SampleTransfer";

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
      path: "/SamplePageDropdown/*",
      element: <SamplePageDropdown />,
    },
    {
      path: "/SamplePageTooltip/*",
      element: <SamplePageTooltip />,
    },
    {
      path: "/SamplePageChartDoughnut/*",
      element: <SamplePageChartDoughnut />,
    },
    {
      path: "/SamplePageChartLine/*",
      element: <SamplePageChartLine />,
    },
    {
      path: "/SamplePageRadio/*",
      element: <SamplePageRadio />,
    },
    {
      path: "/SamplePageChartDoughnut/*",
      element: <SamplePageChartDoughnut />,
    },
    {
      path: "/SamplePageChartLine/*",
      element: <SamplePageChartLine />,
    },
    {
      path: "/SamplePageAccordion/*",
      element: <SamplePageAccordion />,
    },
    {
      path: "/SamplePageTextArea/*",
      element: <SamplePageTextArea />,
    },
    {
      path: "/SamplePageSliders/*",
      element: <SamplePageSliders />,
    },
    {
      path: "/CommonLogin/*",
      element: <CommonLogin />,
    },
    {
      path: "/CommonAccMngList/*",
      element: <CommonAccMngList />,
    },
    {
      path: "/SamplePageList/*",
      element: <SamplePageList />,
    },
    //내 자산진단
    {
      path: "/MyAssetDiagnose/*",
      element: <MyAssetDiagnose />,
    },
    {
      path: "/SamplePagePaging/*",
      element: <SamplePagePaging />,
    },
    {
      path: "/HomeSetup/*",
      element: <HomeSetup />,
    },
    {
      path: "/WithdrawRegister/*",
      element: <WithdrawRegister />,
    },
    {
      path: "/SampleMain/*",
      element: <SampleMain />,
    },
    {
      path: "/InquiryOption/*",
      element: <InquiryOption />,
    },
    {
      path: "SampleEvent",
      element: <SampleEvent />,
    },
    {
      path: "SampleEventQuiz",
      element: <SampleEventQuiz />,
    },
    {
      path: "SampleTransfer",
      element: <SampleTransfer />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return useRoutes(rootRoute || []);
};
export default RootRoute;
