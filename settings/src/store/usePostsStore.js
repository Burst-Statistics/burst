import {create} from 'zustand';
import {getPosts} from '../utils/api';
const usePostsStore = create( ( set, get ) => ({
    postsLoaded: false,
    fetching: false,
    posts: [],
    search: '',
    maxPostCount: 100,
    fetchPosts: async( search = '' ) => {

        let previousSearch = get().search;

        //if we already have fetched posts and the search is less than 3 characters, we can return the posts we already have, because search will only start as of 3 chars.
        if ( get().postsLoaded && 3 >= search.length && 0 === search.indexOf( previousSearch ) ) {
            set({ fetching: false });
            let posts = get().posts;
            return posts.filter( post => post.value.toLowerCase().includes( search.toLowerCase() ) );
        }

        set({ search: search, fetching: true });
        if ( get().postsLoaded && 3 <= search.length && search === previousSearch ) {
            set({ fetching: false });
            let posts = get().posts;
            return posts.filter( post => post.value.toLowerCase().includes( search.toLowerCase() ) );
        }

        let sameSearch = false;
        if ( 0 === search.indexOf( previousSearch ) ) {

            //same string, but longer. Check if the posts count is below 100. If so, we don't need to do another query
            sameSearch = true;
        }

        if ( get().postsLoaded && get().posts.length <= get().maxPostCount && sameSearch ) {
            set({ fetching: false });
            let posts = get().posts;
            return posts.filter( post => post.value.toLowerCase().includes( search.toLowerCase() ) );
        }
        console.log( 'do new posts fetch' );
        const response = await getPosts( search );
        let maxPostsCount = response.max_post_count;

        // Map the response to the expected format
        let posts =  ( response || []).map( post => ({
            value: post.page_url,
            label: post.page_url,
            page_id: post.page_id,
            post_title: post.post_title,
            pageviews: post.pageviews
        }) );

        set({ posts: posts, postsLoaded: true, maxPostsCount: maxPostsCount, fetching: false });
        return posts;
    }
}) );

export default usePostsStore;
