import React from 'react'
import xgplayer from 'xgplayer';
export default class extends React.Component<any, any> {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        console.log(this.props.videoData);
        const props = this.props.videoData;
        let player = new xgplayer({
            id: 'mse',
            url: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/461b1dc0-c2e5-4bce-9c58-5ffea8f26c27.mp4',
            // autoplay: true,
            // autoplayMuted: true,
            volume: 0.6,
            poster: props.poster,
            pip: false, // 画中画
            cssFullscreen: false, // 网页全屏
            fluid: true, // 流式布局
            enterLogo: { // 视频加载页logo
                url: 'https://imgsa.baidu.com/normandy/pic/item/2fdda3cc7cd98d104ccc26b22f3fb80e7bec901c.jpg',
                width: 296,
                height: 66
            },
        });
    }
    render() {
        return (
            <>
                <div id='mse' className='player-inner'></div>
                <style>
                    {`
                    .player-inner {
                        width: 100%;
                        position: relative;
                    }
                    `}
                </style>
            </>
        )
    }
}