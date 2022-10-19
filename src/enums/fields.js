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
        DESCRIPTION: "posts.description",
        CREATED_AT: 'posts."createdAt"'
    },
    
    HASHTAGS: {
        ID: "hashtags.id",
        NAME: "hashtags.name"
    },
    
    POSTS_HASHTAGS: {
        ID: '"postsHashtags".id',
        POST_ID: '"postsHashtags"."postId"',
        HASHTAG_ID: '"postsHashtags"."hashtagId"'
    },
    
    LIKES: {
        ID: "likes.id",
        USER_ID: 'likes."userId"',
        POST_ID: 'likes."postId"',
    }
})

export { FIELDS }