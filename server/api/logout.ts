import { checkAuth } from '../utils/checkAuth';

export default checkAuth(async (e) => {
  console.log('logout');
  deleteCookie(e, 'token');
});
