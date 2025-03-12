import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { globalUnhandledRejection } from "./common/handleError";
import { ConfigProvider, theme } from "antd";

globalUnhandledRejection();

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            // 主色调设置为深色系
            colorPrimary: "#1a1a1a",
            borderRadius: 4,

            // 整体配色为暗黑风格
            colorBgContainer: "#141414",
            colorBgElevated: "#1f1f1f",
            colorText: "#ffffff",
            colorTextSecondary: "#a6a6a6",

            // 边框和分割线采用深色
            colorBorder: "#303030",
            colorSplit: "#303030",

            // 悬浮和激活状态使用稍亮的色调
            colorBgTextHover: "#2a2a2a",
            colorBgTextActive: "#262626",

            // 控件相关配色
            controlOutline: "#424242",
            controlItemBgHover: "#2a2a2a",
            controlItemBgActive: "#262626",
          },
          algorithm: theme.darkAlgorithm // 启用算法以自动调整其他相关颜色
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  );
}
