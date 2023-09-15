import "./App.css";
import RandomMathFact from "./components/randomJoke";
import Header from "./components/Header";
import { ConfigProvider } from "antd";

const customTheme = {
  components: {
      Table: {
          headerBg: "rgb(158, 158, 158)",
          fontWeightStrong: 600,
      },
      Button: {
      }
  },
  token: {
      borderRadius: 100,
      colorPrimaryHover: 'rgb(129, 129, 129)',
      colorPrimary: 'rgb(129, 129, 129)'
  },
};

const App = () => {
    return (
        <div className="App">
            <Header />
            <ConfigProvider theme={customTheme}>
                <RandomMathFact />
            </ConfigProvider>
        </div>
    );
};

export default App;
