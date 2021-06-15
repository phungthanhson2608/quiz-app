import React, { FC } from 'react';
import { Card , Button } from 'antd';
import './QuizPage.css';

type Props = {
    id : any
    question: any;
    choices : any;
    handleChoice : any
  };

  export const QuizSheet: FC<Props> = props => {
    const submitAnswer = (e:any) =>{
      props.handleChoice(props.id, e.currentTarget.id);
    }
    const choices = Object.keys(props.choices);
    const answers = choices.map((choice) =>
    <div className= 'answer-button'>
    <Button id={choice} type="primary" shape="round" size="large" onClick={submitAnswer} >
        {choice}.  {props.choices[choice]}
    </Button>
    </div>
    )
    return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title={props.question} bordered={true} style={{ width: 600, margin :'auto' }}>
          {answers}
        </Card>
      </div>
    </>
    );
  }