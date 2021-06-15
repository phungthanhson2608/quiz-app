
export class DataService {
     static get = async () =>{
        const url = 'https://react14-contest-easy-quiz-app.herokuapp.com/quiz'
        const res = await fetch(url);
        const data = await res.json();
        return data.result;
    }

     static postAnswer = async (listAnswer :any ) =>{
        const url = 'https://react14-contest-easy-quiz-app.herokuapp.com/quiz/answer'
        const res = await fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({listAnswer})
        });
        const data = await res.json();
        return data;
     }

}