import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Path = ({title, paths, setSearch}) => {
    const {t} = useTranslation()

    return <div className="d-flex align-items-center
    justify-content-between">
    <div className="paths">
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
    {(title === 'products' || title === 'categories') && <div>
        <input 
            type="text" 
            name='search'
            placeholder={t("Search")} 
            onChange={e=> setSearch(e.target.value)}
            style={{
                padding: '6px 16px',
                border: '1px solid #dedede',
                borderRadius: '8px',
                width: '18rem'
            
            }}
        />
    </div>}
    </div>
}
export default Path;