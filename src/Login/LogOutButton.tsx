import { Button } from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';

export const LogOutButton = () => {
    const history = useHistory();
    const logOut = () =>{
        localStorage.removeItem('user');
        history.push('/login');
    }

    return(
        <Button 
         type='primary' 
         onClick={logOut} 
         icon={<PoweroffOutlined />} 
         danger
        >
            Log out
        </Button>
    )
}