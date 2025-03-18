import { Button, Layout, Menu } from "antd";
import { css } from "goober";
import { useNavigate } from "react-router-dom";
import CreateOfferModal from "../components/offer/CreateOfferModal";

const { Header, Content, Footer } = Layout;

const items = [
  { label: "Features", key: "features" },
  { label: "Help", key: "help" },
  { label: "Pricing", key: "pricing" },
  { label: "Resources", key: "resources" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout
      className={css`
        min-height: 100vh;
      `}
    >
      <Header
        className={css`
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1;
          width: 100%;
          background: #001529;
        `}
      >
        <div
          className={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 200px;
            width: 100%;
          `}
        >
          <div
            className={css`
              width: 200px;
            `}
          >
            <span>Cloquetaro</span>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            items={items}
            className={css`
              flex: 1;
              min-width: 0;
            `}
          />
          <div
            className={css`
              display: flex;
              gap: 16px;
            `}
          >
            <Button onClick={() => navigate("/login")}>log in</Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </div>
        </div>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div className="content">
          <CreateOfferModal/>
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Home;
