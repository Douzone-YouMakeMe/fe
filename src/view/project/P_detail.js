import { Layout } from 'antd';

import C_detail_p from '../../components/c_project/C_detail_p';

const { Footer, Content } = Layout;

function P_detail(props) {
  return (
    <>
      <Layout>
        <Content>
          <C_detail_p />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default P_detail;

/*
                    <Link to={{
                    pathname:"/card"
                }} >33222222</Link>
*/
