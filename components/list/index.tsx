
import Link from 'next/link'
import './index.less';

export default (props: any) => {
    return (
        <ul className='infinite hkrecommend'>
            {
                props.list.map((v, i) =>
                    <li key={v.id}>
                        <Link href={`/v?vid=${v.id}`}>
                        <a>
                            <div className='hkrecommend-top skeleton'>
                                <div className='hkrecommend-mask'>
                                    <i className='hkrecommend-mask-icon'></i>
                                </div>
                                <img className='skeleton lazy' src={v.poster_pc} alt=''></img>
                                <span className='hkrecommend-top-date'>{v.duration}</span>
                            </div>
                            <div className='hkrecommend-bottom'>
                                <div className='hkrecommend-bottom-author'>
                                    <div className='author-cont'>
                                        <img className='author-icon' src={v.mthpic} alt='' />
                                    </div>
                                    <span>{v.source_name}</span>
                                </div>
                                <div className='warps textoverf hkrecommend-bottom-title'>
                                    <p className='text font-medium'>
                                        {v.title}
                                    </p>
                                </div>
                                <p className='hkrecommend-bottom-num'>
                                    {v.fmplaycnt}·{v.publish_time}
                                </p>
                            </div>
                        </a>
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}