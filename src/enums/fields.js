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
        BODY: "body",
        META_TITLE: '"metaTitle"',
        META_DESCRIPTION: '"metaDescription"',
        META_IMAGE: '"metaImage"',
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
    },

    COMMENTS: {
        ID: "id",
        USER_ID: '"userId"',
        POST_ID: '"postId"',
        BODY: "body",
        CREATED_AT: '"createdAt"'
    },

    SHARED: {
        ID: "id",
        USER_ID: '"userId"',
        POST_ID: '"postId"',
        CREATED_AT: '"createdAt"'
    }
})

export { FIELDS };