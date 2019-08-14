import React from 'react'
import Head from 'next/head';
import List from '../../components/list';
import fetch from 'isomorphic-unfetch';
import '../../static/css/style.less';
export default class extends React.Component<any, any> {
    constructor (props) {
        super(props)
    }
    static async getInitialProps({req}) {
        let hlist = [];
        if(req) { // 服务端执行
            const result = await fetch('https://haokan.baidu.com/videoui/page/pc?debug=1');
            const json = await result.json();
            hlist = json.data.response.videos;
        } else { // 客户端执行
            const list = window['__NEXT_DATA__'].props.pageProps.hlist;
            hlist = list;
        }
        return {hlist}
    }
    render() {
        return (
            <div className='app'>
                <Head>
                    <title>好看视频-看见美好分享世界</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="shortcut icon" href="https://vv.bdstatic.com/static/videoui/img/favicon-4_f4b9465.ico" type="image/x-icon"></link>
                </Head>
                {this.props.hlist.length > 0 ?
                    <List list={this.props.hlist}></List>
                    : <div>暂无数据哦</div>
                }
            </div>
        )
    }
}