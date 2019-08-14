import dynamic from 'next/dynamic' // 组件懒加载
const Player = dynamic(import('../../components/player'),{
    ssr: false
});
import React from 'react'
import Head from 'next/head';
import '../../static/css/style.less';
export default class extends React.Component<any, any> {
    constructor (props) {
        super(props)
    }
    static async getInitialProps({req, query}) {
        let videoland: any = {};
        if(req) {
            // 只有服务端使用的在这里导入
            const fetch = require('isomorphic-unfetch');
            const res = await fetch(`https://haokan.baidu.com/v?vid=${query.vid}&_format=json`)
            const videoData = await res.json();
            videoland = videoData.data.apiData.curVideoMeta;
        } else {
            const clientResult = window['__NEXT_DATA__'].props.pageProps.videoland;
            videoland = clientResult;
        }
        return {videoland}
    }
    render() {
        return (
            <div className='home'>
                <Head>
                    <title>{this.props.videoland.seo_title}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content={this.props.videoland.seo_desc_title} />
                    <meta name="keywords" content={this.props.videoland.tags} />
                    <link rel="shortcut icon" href="https://vv.bdstatic.com/static/videoui/img/favicon-4_f4b9465.ico" type="image/x-icon"></link>
                </Head>
                <div className='player'>
                    <Player
                        videoData={this.props.videoland}
                    >
                    </Player>
                </div>
                <div className='test'>
                    {this.props.videoland.title}
                </div>
                <style>
                    {`
                    .home {
                        width: 1080px;
                        margin: 0 auto;
                    }
                    .player {
                        width: 100%;
                        min-height: 607px;
                        margin-top: 40px;
                        background: rgba(0,0,0,.87);
                        position: relative;
                    }
                    .test {
                        width: 1080px;
                        text-align: center;
                        font-weight: 600;
                        font-size: 18px;
                        padding: 30px 0;
                    }
                    `}
                </style>
            </div>
        )
    }
}