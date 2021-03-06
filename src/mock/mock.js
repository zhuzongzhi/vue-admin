import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers } from './data/user'

export default {
    bootstrap () {
        let mock = new MockAdapter(axios);
        
        // mock success request
        mock.onGet('/api/success').reply(200, {
            msg: 'success'
        });

        // mock error request
        mock.onGet('/api/error').reply(500, {
            msg: 'failure'
        });

        // login
        mock.onPost('/api/login').reply(config => {
            let { username, password } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    const hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });

                    if (hasUser) {
                        resolve([200, { code: 200, msg: '请求成功!', user }]);
                    } else {
                        resolve([200, { code: 500, msg: '账号或密码错误' }]);
                    }
                }, 1000);
            })
        })
    }
}
