<<<<<<< HEAD
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
       // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
=======
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
       // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
>>>>>>> 7f3007c919d03d4d348fe35cb0144c5d64a0938e
  }