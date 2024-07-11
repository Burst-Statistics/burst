import {create} from 'zustand';
import {getPosts} from '../utils/api';
import {__} from '@wordpress/i18n';
const usePostsStore = create( ( set, get ) => ({
    postsLoaded: false,
    fetching: false,
    posts: [],
    search: '',
    maxPostCount: 100,
    filterPosts: ( posts, search ) => {
        return posts.filter(post => {
            return Object.values(post).some(value =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            );
        });
    },
    fetchPosts: async( search = '' ) => {
        let previousSearch = get().search;
        let resetQuery = false;
        //if the list is below 100, we already have all posts available for this search.
        let retrievedAllPosts = get().posts.length < get().maxPostCount;
        console.log("fetch posts with search ", search, "previous search ", previousSearch, 'postsLoaded', get().postsLoaded, 'retrievedAllPosts', retrievedAllPosts);

        //if there was a previous search, but now it's empty, we want to re-fetch
        if ( previousSearch.length>0 && search.length===0 ) {
            console.log("reset query");
            resetQuery = true;
        }

        if ( previousSearch.length> search.length ) {
            console.log("search is shorter, reset the query");
            resetQuery = true;
        }

        let sameSearch = false;
        if ( previousSearch.length>0 && search.indexOf( previousSearch )===0 ) {
            console.log("same search, but longer ");
            //same string, but longer. Check if the posts count is below 100. If so, we don't need to do another query
            sameSearch = true;
        }

        //if we already have fetched ALL posts, the search hasn't changed, we can return the posts we already have, because search will only start as of 3 chars.
        if ( !resetQuery && get().postsLoaded && sameSearch && retrievedAllPosts) {
            console.log("search within existing list");
            set({ fetching: false });
            return get().filterPosts(get().posts, search);
        }

        set({ search: search, fetching: true });

        if ( !resetQuery && get().postsLoaded && search === previousSearch ) {
            console.log("search is exactly same as previous search ");
            set({ fetching: false });
            return get().filterPosts(get().posts, search);
        }

        if ( !resetQuery && get().postsLoaded && search.length<3 && sameSearch ) {
            console.log("same search and <3 chars, filter within existing list");
            set({ fetching: false });
            return get().filterPosts(get().posts, search);
        }

        console.log( 'do new posts fetch', search);
        const response = await getPosts( search );
        console.log(response);
        // Map the response to the expected format
        let posts =  ( response || []).map( post => ({
            value: post.page_url,
            label: post.page_url,
            page_id: post.page_id,
            post_title: post.post_title.length>0 ? post.post_title : __('Untitled', 'burst-statistics'),
            pageviews: post.pageviews
        }) );

        set({ posts: posts, postsLoaded: true, maxPostsCount: response.max_post_count, fetching: false });
        return get().filterPosts(posts, search);
    }
}) );

export default usePostsStore;
