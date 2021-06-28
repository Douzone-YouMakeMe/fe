import React from 'react'
import { Layout} from 'antd';
import C_user_info from '../../components/c_user/C_user_info'


const { Footer,Content } = Layout;

function U_info(props) {
    return (
        <>
        <Layout>
            <Content>
                <C_user_info />
            </Content>
            <Footer>Footer</Footer>
        </Layout>
      </>
    )
}



export default U_info

