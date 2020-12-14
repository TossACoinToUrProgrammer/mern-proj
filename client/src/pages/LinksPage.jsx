import React, { useCallback, useContext, useEffect, useState } from 'react';
import LinksList from '../components/LinksList';
import Preloader from '../components/Preloader';
import { AuthContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hooks';

const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext( AuthContext );

    const fetchLinks = useCallback(async()=>{
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: 'Bearer '+token
            })
            setLinks(fetched);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks]);

    if(loading) return <Preloader />

    return (
        <div>
            {<LinksList links={links} />}
        </div>
    );
};

export default LinksPage;