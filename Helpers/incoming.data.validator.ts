import userRoot from '../Service/Posts/utils/root.user';
import idPostValidator from '../Service/Posts/utils/searchIdPost';
import idCommentValidator from '../Service/Posts/utils/searchIdComment';

async function authorizationValidator(password, login) {
  if (!password) {
    return { status: false, error: 'no password field' };
  }
  if (!login) {
    return { status: false, error: 'no login field' };
  }
  if (login.length < 4) {
    return { status: false, error: 'login is too short' };
  }
  if (password.length < 4) {
    return { status: false, error: 'password is too short' };
  }
  return { status: true };
}

async function tokenValidator(token) {
  if (!token) {
    return { status: false, error: 'no token field' };
  }

  if (token.length < 10) {
    return { status: false, error: 'token is too short' };
  }
  if (await userRoot.userRootByToken(token) === false) {
    return { status: false, error: 'token not valid' };
  }
  return { status: true };
}

async function pageSortValidator(page, sort) {
  if (!page) {
    return { status: false, error: 'no page field' };
  }
  if (!sort) {
    return { status: false, error: 'param sort not exists' };
  }
  if (sort !== 'standard' && sort !== 'revers') {
    return { status: false, error: 'please use sort standard or revers' };
  }
  if (page.length < 1) {
    return { status: false, error: 'page is too short' };
  }
  return { status: true };
}

async function postValidator(title, body, username, image, token) {
  if (!title) {
    return { status: false, error: 'no title field' };
  }
  if (!body) {
    return { status: false, error: 'no body field' };
  }
  if (!image) {
    return { status: false, error: 'no image field' };
  }
  if (title.length < 4) {
    return { status: false, error: 'title is too short' };
  }
  if (body.length < 4) {
    return { status: false, error: 'body is too short' };
  }
  if (username.length < 4) {
    return { status: false, error: 'username is too short' };
  }
  if (username.length < 4) {
    return { status: false, error: 'username is too short' };
  }
  if (image.filename.length < 1) {
    return { status: false, error: 'filename is too short' };
  }
  if (!image.filename) {
    return { status: false, error: 'image without filename' };
  }

  const tokenCorerct = await tokenValidator(token);
  if (tokenCorerct.status === false) {
    return { status: false, tokenCorerct };
  }
  if (!await userRoot.userRootById(username)) {
    return { status: false, error: 'not enough rights' };
  }

  return image.mimetype === 'image/jpeg' || image.mimetype === 'image/png'
    ? { status: true }
    : { status: false, error: 'error type file' };
}

async function commentValidator(typeAction: string, id: number, comment: string, token: string) {
  if (!typeAction) {
    return { status: false, error: 'type action exists' };
  }
  if (!id) {
    return { status: false, error: 'id action exists' };
  }
  if (!comment) {
    return { status: false, error: 'id action exists' };
  }
  if (id < 1) {
    return { status: false, error: 'id is too short' };
  }
  if (comment.length < 1) {
    return { status: false, error: 'comment is too short' };
  }
  if (comment.length > 300) {
    return { status: false, error: 'comment is too long' };
  }

  if (!await userRoot.userRootByToken(token)) {
    return { status: false, error: 'not enough rights' };
  }

  return (typeAction === 'post' || typeAction === 'comment')
    ? { status: true }
    : { status: false, error: 'error typeAction' };
}

async function likeValidator(
  typeActionPostComment: string,
  idPostComment: number,
  phoneEmail: string,
  likeDislike: string,
) {
  if (!typeActionPostComment) {
    return {
      status: false,
      error: 'typeActionPostComment action exists',
    };
  }
  if (!idPostComment) {
    return {
      status: false,
      error: 'idPostComment action exists',
    };
  }
  if (!phoneEmail) {
    return {
      status: false,
      error: 'phoneEmail action exists',
    };
  }
  if (!likeDislike) {
    return {
      status: false,
      error: 'likeDislike action exists',
    };
  }
  if (phoneEmail.length < 1) {
    return {
      status: false,
      error: 'phoneEmail is too short',
    };
  }
  if (!await userRoot.userRootById(phoneEmail)) {
    return { status: false, error: 'not enough rights' };
  }

  if (phoneEmail.length > 30) {
    return { status: false, error: 'phoneEmail is too long' };
  }
  if (typeActionPostComment === 'post') {
    const searchPostWithId = await idPostValidator(idPostComment);
    if (searchPostWithId === false) {
      return { status: false, error: 'id post dont exists' };
    }
  }
  if (typeActionPostComment === 'comment') {
    const searchPostWithId = await idCommentValidator(idPostComment);
    if (searchPostWithId === false) {
      return { status: false, error: 'id comment dont exists' };
    }
  }

  return (typeActionPostComment === 'post' || typeActionPostComment === 'comment')
    ? (likeDislike === 'like' || likeDislike === 'disLike'
      ? { status: true }
      : { status: false, error: 'error, used like and dislike' })
    : { status: false, error: 'error typeAction' };
}

async function deleteUserByAdminValidator(token: string, username: string) {
  const validToken = await tokenValidator(token);
  if (validToken.status === false) {
    return validToken;
  }
  if (!username) {
    return { status: false, error: 'no username field' };
  }
  if (username.length < 4) {
    return { status: false, error: 'username is too short' };
  }
  return { status: true };
}

async function passUpdateValidator(
  password: string,
  phoneEmail: string,
  newPassword: string,
  token: string,
) {
  const validToken = await tokenValidator(token);
  if (validToken.status === false) {
    return validToken;
  }
  const passLogin = await authorizationValidator(password, phoneEmail);
  if (passLogin.status === false) {
    return passLogin;
  }
  const newPassLogin = await authorizationValidator(password, phoneEmail);
  if (newPassLogin.status === false) {
    return newPassLogin;
  }
  return { status: true };
}

export {
  tokenValidator,
  authorizationValidator,
  pageSortValidator,
  postValidator,
  commentValidator,
  likeValidator,
  deleteUserByAdminValidator,
  passUpdateValidator,
};
