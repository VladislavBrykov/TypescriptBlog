export interface Users {
    login(phoneEmail: string, password: string): Promise<any>;

    registration(phoneEmail: string, password: string): Promise<any>;

    logout(token: string, all: string): Promise<any>;

    deleteUser(token: string): Promise<any>;

    deleteUserByAdmin(username: string): Promise<any>;

    passwordUpdate(
        phoneEmail: string,
        password: string,
        newPassword: string,
        token: string,
    ): Promise<any>;
}

export interface Posts {
    newPost(
        title: string,
        body: string,
        username: string
    ): Promise<any>;

    getPosts(page: number, sort: string): Promise<any>;

    getPostById(postId: number): Promise<any>;

    getPostCommentsLikesById(postId: number): Promise<any>;

    newComment(
        typeAction: string,
        id: number,
        token: string,
        comment: string,
    ): Promise<any>;

    uploadImage(
        id: string,
        image: string,
    ): Promise<any>;

    newLike(
        typeActionPostComment: string,
        idPostComment: number,
        token: string,
        phoneEmail: string,
        likeDislike: string,
    ): Promise<any>;

    deletePost(token: string, postId: number): Promise<any>;

    deleteComment(token: string, commentId: number): Promise<any>;
}
