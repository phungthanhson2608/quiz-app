import { Carousel, Button, Form, Modal, Tooltip, Progress } from 'antd';
import React, { createRef } from 'react';
import './QuizPage.css';
import { QuizSheet } from './QuizSheet';
import { DataService } from '../DataService/DataService';

type Props = {

};
type Answer = {
  id: number
  choice: string
}
type State = {
  listAnswer: Answer[],
  isModalVisible: boolean,
  percent:number
  result : string
}
export class QuizPage extends React.Component<Props, State> {
  private carouselRef: any;
  private questionList: any
  private quizSheetList: any

  constructor(props: any) {
    super(props);
    this.carouselRef = createRef();
    this.state = {
      listAnswer: [],
      isModalVisible: false,
      percent: 0,
      result :''
    }
  }


  componentDidMount = async () => {
    this.questionList = await this.getQuestionList();
    this.quizSheetList = this.questionList.map((question: any) =>
      <div>
        <QuizSheet
          id={question.id}
          question={question.question}
          choices={question.choices}
          handleChoice={this.handleChoice} />
      </div>
    );
    this.setState({ listAnswer: [] });
  }

  getQuestionList = async () => {
    return await DataService.get();
  }

  onChange = (a: any) => {
    
  };

  handleNext = async () => {
    if (this.state.listAnswer.length >= this.questionList.length) {
      const result = await DataService.postAnswer(this.state.listAnswer)
      if (result.status != 'P') {
        const percent =100 - Math.round((result.incorrectAnswers.length/this.questionList.length)*10000)/100;
        this.setState({ percent : percent });
        this.setState({result : (this.questionList.length-result.incorrectAnswers.length)+'/'+this.questionList.length })
      }else{
        this.setState({ percent : 100 })
        this.setState({result : this.questionList.length+'/'+ this.questionList.length})
      }
      this.setState({ isModalVisible: true })
      return;
    }
    this.carouselRef.current.next();
  }

  handlePrev = () => this.carouselRef.current.prev();

  handleChoice = (id: number, answer: string) => {
    this.setState({ listAnswer: [...this.state.listAnswer, { "id": id, "choice": answer }] }, this.handleNext)
  }

  handleRetry = () => {
    this.setState({ isModalVisible: false });
    this.setState({ listAnswer: [] }, this.handleNext)
  };

  render() {
    return (
      <div className="quiz-form">
        <Carousel 
          dotPosition="bottom" 
          afterChange={this.onChange} 
          ref={this.carouselRef} 
          dots={false}
          effect='fade'
        >
          {this.quizSheetList}
        </Carousel>
        <Modal
          title="Result"
          visible={this.state.isModalVisible}
          closable={false}
          footer={[
            <Button type='primary' onClick={this.handleRetry}>
              Retry
            </Button>
          ]}
        >
          <Tooltip  title={this.state.result} className='progress'>
            <Progress className='progress' percent={this.state.percent} type="circle"/>
          </Tooltip>
        </Modal>  
      </div>
        );
  }
}