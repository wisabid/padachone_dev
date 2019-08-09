import React, {useContext} from 'react';
import {Link, RichText, Date} from 'prismic-reactjs';
import {UserContext} from '../../store/context/userContext';
import {PRISMIC_NEWSLETTER_DOC} from '../../utils/constants';

const Newsletters = () => {
    const {cmsContents} = useContext(UserContext)
    // Link Resolver
    const linkResolver = (doc) => {
        // Define the url depending on the document type
        // if (doc.type === 'page') {
        //     return '/page/' + doc.uid;
        // } else if (doc.type === 'blog_post') {
        //     return '/blog/' + doc.uid;
        // }
    
        // Default to homepage
        return '/';
    }
    if (cmsContents) {
        debugger;
        return (
            <>
                <h1>Newsletters</h1>
                {
                    cmsContents.data[PRISMIC_NEWSLETTER_DOC].edges.map((item, index) => {
                        return <div key={index}>
                            <h2>{RichText.asText(item.node.title)}</h2>
                            <div style={{textAlign:'left'}}><pre><RichText render={item.node.body} linkResolver={linkResolver} /></pre></div>
                        </div>
                    })
                }
            </>
        )
    }
    else {
        return (
            <h5>Loading...</h5>
        )
    }
}

export default Newsletters;