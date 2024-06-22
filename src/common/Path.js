import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Path = ({title, paths}) => {
    const {t} = useTranslation()
    // console.log('paths: ', paths)
    return <div className="paths">
        {!!title && <h1>{t(title)}</h1>}
        <div>
            <Link to='/' className="home">{t('home')}<span className="gt">/</span></Link> 
            {paths?.map((path, index) => {
                return <>
                    {paths?.length-1 === index ? 
                        <span>{path?.name}</span> : 
                        <Link to={`/${path.href}`} state={path.state}>{path?.name} <span className="gt">/</span></Link>}
                </>
            })}
        </div>
    </div>
}
export default Path;