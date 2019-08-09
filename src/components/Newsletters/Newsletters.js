import React, {useContext} from 'react';
import {Link, RichText, Date} from 'prismic-reactjs';
import {UserContext} from '../../store/context/userContext';
import {PRISMIC_NEWSLETTER_DOC} from '../../utils/constants';
import './newsletters.css';

const Newsletter = ({cmsContents}) => {
    const linkResolver = (doc) => {        
        return '/';
    }
    return (
        <>
            <h1>Newsletters</h1>
            {
                cmsContents.data[PRISMIC_NEWSLETTER_DOC].edges.map((item, index) => {
                    return <div key={index}>
                        <h2>{RichText.asText(item.node.title)}</h2>
                        <div className="nl-body"><RichText render={item.node.body} linkResolver={linkResolver} /></div>
                    </div>
                })
            }
        </>
    )
}

const Newsletters = () => {
    const {cmsContents} = useContext(UserContext)
    
    if (cmsContents) {
        return (
            <Newsletter cmsContents={cmsContents}/>
        )
    }
    else {
        return (
            <h5>Loading...</h5>
        )
    }
}

export default Newsletters;