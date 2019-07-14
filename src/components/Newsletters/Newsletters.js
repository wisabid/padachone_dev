import React, {useState, useEffect} from 'react';
import Prismic from 'prismic-javascript';
import {Link, RichText, Date} from 'prismic-reactjs';
import {PRISMIC_TOKEN} from '../utils/constants';


const Newsletters = () => {
    const [state, setState] = useState({doc : null});
    console.log(state);
    useEffect(() => {
        const apiEndpoint = 'https://padachone.prismic.io/api/v2';
        Prismic.api(apiEndpoint, {accessToken: PRISMIC_TOKEN}).then(api => {
            api.query(Prismic.Predicates.at('document.type', 'newsletters')).then(response => {
            if (response) {
                setState({ doc: response.results[0] });
            }
            });
        });

    }, []);

    // Link Resolver
    const linkResolver = (doc) => {
        // Define the url depending on the document type
        if (doc.type === 'newsletters') {
            return '/newsletters/' + doc.uid;
        } else if (doc.type === 'blog_post') {
            return '/blog/' + doc.uid;
        }
    
        // Default to homepage
        return '/';
    }

    if (state.doc) {
        const document = state.doc.data;
        return (
          <div>
            <h1>{RichText.asText(document.title)}</h1>
            {/* <img alt="cover" src={document.image.url} /> */}
            {RichText.render(document.body, linkResolver)}
          </div>
        );
      }   
      else {
          return (
              <h3>Loading...</h3>
          )
      } 
}
export default Newsletters;