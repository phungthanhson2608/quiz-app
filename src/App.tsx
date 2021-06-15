import { FC , useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { LoginPage } from './Login/LoginPage';
import { QuizPage } from './QuizPage/QuizPage';
import { PageHeader } from 'antd';
import { LogOutButton } from './Login/LogOutButton';


const App:FC = () => {
  const [showLogOut, setShowLogOut] = useState<boolean>(false);
  const changeShowButton = (isShow:boolean) =>{
    setShowLogOut(isShow);
  }
  return (
    <Router>
      <PageHeader
        className="App-header"
        backIcon={false}
        title="QUIZ APP"
        subTitle="React"
        extra={showLogOut?[<LogOutButton></LogOutButton>]:null}
      />
      <Switch>
        <Route path="/quiz">
          <QuizPage />
        </Route>
        <Route path="/login">
          <LoginPage changeShowButton={changeShowButton} />
        </Route>
        <Route path="/">
          <LoginPage changeShowButton={changeShowButton} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
