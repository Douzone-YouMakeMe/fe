import { Layout} from 'antd';

import C_detail_p from '../../components/c_project/C_detail_p';
import Header_f from '../../components/v_frame/Header_f';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const { Footer,Content } = Layout;

function P_detail(props) {
   console.log(props);
    return (
        <>
        <Layout>
            <Content>
                <C_detail_p />
            </Content>
            <Footer>Footer</Footer>
        </Layout>
      </>
    )
}

export default P_detail


/*
                    <Link to={{
                    pathname:"/card"
                }} >33222222</Link>
*/