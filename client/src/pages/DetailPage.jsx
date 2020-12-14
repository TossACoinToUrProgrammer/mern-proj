import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hooks';
import {AuthContext} from '../context/authContext';
import Preloader from '../components/Preloader';
import LinkCard from '../components/LinkCard';

const DetailPage = (props) => {
    const {request, loading} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const {token} = useContext(AuthContext);

    const getLink = useCallback(async()=>{
        try {
            const fetched = await request('/api/link/'+linkId, 'GET', null, {
                Authorization: 'Bearer '+ token
            });
            setLink(fetched);
        } catch (e) {
        }
    }, [token, linkId, request]);

    useEffect(()=>{
        getLink();
    }, [getLink]);

    if(loading){
        return <Preloader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    );
};

export default DetailPage;