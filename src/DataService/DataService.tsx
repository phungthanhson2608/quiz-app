
export class DataService {
     static url = 'https://react14-contest-easy-quiz-app.herokuapp.com/quiz'
     static get = () =>{
        fetch(DataService.url).then(res => res.json())
        .then((rows) =>{
            console.log(rows);
        })
    }

}