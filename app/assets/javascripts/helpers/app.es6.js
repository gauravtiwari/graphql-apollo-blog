// Generic app helpers

const documentDefined = typeof document !== 'undefined' ? true : false;

export default class App {
  loggedIn() {
    return documentDefined ?
      document.getElementsByName('logged_in')[0].authenticated : '';
  }
  csrfToken() {
    return documentDefined ?
      document.getElementsByName('csrf-token')[0].content : '';
  }

  authToken() {
    return documentDefined ?
      document.getElementsByName('auth-token')[0].content : '';
  }
}
