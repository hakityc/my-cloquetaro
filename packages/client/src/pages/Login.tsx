import { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { css } from "goober";
import { useNavigate } from "react-router-dom";
import { client } from "../api";
import { tokenUtils } from "../utils/token";
interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const fetchUserInfo = async () => {
    const res = await client.users.info
    .$get()
    .then((res) => res.json());
    console.log(res)
  }
  const onFinish = async (values: LoginFormValues) => {
    console.log(values);
    // setLoading(true);
    const res = await client.auth.login
      .$post({
        json: {
          username: values.username, // 用户名
          password: values.password, // 密码
        },
      })
      .then((res) => res.json());
    
    tokenUtils.setToken(res.data?.token || "");
    console.log(res.data?.token);
    await fetchUserInfo()
    navigate("/");
  };

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
      `}
    >
      <Card
        className={css`
          width: 400px;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          background: #1f1f1f;
          border: 1px solid #303030;
        `}
      >
        <div
          className={css`
            text-align: center;
            padding: 24px 0;
            margin-bottom: 20px;
          `}
        >
          <h1
            className={css`
              color: #ffffff;
              font-size: 28px;
              font-weight: 600;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 2px;
            `}
          >
            Cloquetaro
          </h1>
        </div>

        <div
          className={css`
            padding: 0 24px 24px;
          `}
        >
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="用户名"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={css`
                  width: 100%;
                  height: 45px;
                  margin-top: 24px;
                  background: linear-gradient(90deg, #303030 0%, #424242 100%);
                  border: none;
                  font-weight: 600;
                  letter-spacing: 1px;
                  text-transform: uppercase;
                  transition: all 0.3s ease;

                  &:hover {
                    background: linear-gradient(90deg, #424242 0%, #505050 100%);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                  }
                `}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
}
