import { Layout } from 'antd';

import C_apply_p from '../../components/c_project/C_apply_p';

const { Footer, Content } = Layout;

function P_apply(props) {
  return (
    <>
      <Layout>
        <Content>
          <C_apply_p />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default P_apply;
