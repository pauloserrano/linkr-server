const FIELDS = Object.freeze({
    USERS: {
        ID: "id",
        EMAIL: "email",
        PASSWORD: "password",
        NAME: "name",
        PICTURE_URL: '"pictureUrl"'
    },
    
    SESSIONS: {
        ID: "id",
        TOKEN: "token",
        ACTIVE: "active"
    },
    
    POSTS: {
        ID: "id",
        USER_ID: '"userId"',
        LINK: "link",
        DESCRIPTION: "description",
        CREATED_AT: '"createdAt"'
    },
    
    HASHTAGS: {
        ID: "id",
        NAME: "name"
    },
    
    POSTS_HASHTAGS: {
        ID: 'id',
        POST_ID: '"postId"',
        HASHTAG_ID: '"hashtagId"'
    },
    
    LIKES: {
        ID: "id",
        USER_ID: '"userId"',
        POST_ID: '"postId"',
    }
})

export { FIELDS };