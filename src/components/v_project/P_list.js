import { Layout} from 'antd';
import Card_view_b from '../../components/c_project/Card_view_b';
import Header_f from '../v_frame/Header_f';


const { Footer,Content } = Layout;

function P_list() {
    return (

        <>
        <Layout>
            <Content>
                <Card_view_b />
            </Content>
            <Footer>Footer</Footer>
        </Layout>
      </>
    )
}

export default P_list
