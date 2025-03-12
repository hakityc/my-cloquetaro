import { Modal } from "antd";
import ReactJson from "react-json-view";

export const handleError = (error: unknown) => {
  Modal.error({
    title: "出错啦",
    content: (
      <div style={{ maxHeight: "60vh", overflow: "auto" }}>
        <ReactJson
          src={errorToJson(error)}
          displayDataTypes={false}
          enableClipboard={false}
          style={{ fontSize: "14px" }}
        />
      </div>
    ),
  });
  console.error(error);
};

export const globalUnhandledRejection = () => {
  window.addEventListener("unhandledrejection", (event) => {
    event.preventDefault();
    handleError(event.reason);
  });
};

const errorToJson = (error: unknown): object => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  if (error && typeof error === "object") {
    return error;
  }
  return {
    name: "未知错误，请查看控制台",
  };
};
