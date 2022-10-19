const FIELDS = Object.freeze({
    USERS: {
        ID: "users.id",
        EMAIL: "users.email",
        PASSWORD: "users.password",
        NAME: "users.name",
        PICTURE_URL: 'users."pictureUrl"'
    },

    SESSIONS: {
        ID: "sessions.id",
        TOKEN: "sessions.token",
        ACTIVE: "sessions.active"
    },
    
    POSTS: {
        ID: "posts.id",
        USER_ID: 'posts."userId"',
        LINK: "posts.link",
        DESCRIPTION: "posts.description"
        
    },
    
    HASHTAGS: {
        ID: "hashtags.id",
        NAME: "hashtags.name"
    },
    
    POSTS_HASHTAGS: {
        ID: "posts_hashtags.id",
        POST_ID: 'posts_hashtags."postId"',
        HASHTAG_ID: 'posts_hashtags."hashtagId"'
    },
    
    LIKES: {
        ID: "likes.id",
        USER_ID: 'likes."userId"',
        POST_ID: 'likes."postId"',
    }
})

export { FIELDS }