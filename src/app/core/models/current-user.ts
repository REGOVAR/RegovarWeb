export class CurrentUser {
    constructor(
      private _login = '',
      private role: string = null,
      private _token = ''
    ) {}
  
    get token() {
      return this._token;
    }
  
    get login() {
      return this._login;
    }
  
    hasRole(roles: string[]) {
      if (this.role === null) {
        return null;
      }
      return roles.find(
        r => r.toLowerCase() === this.role.toString().toLowerCase()
      );
    }
  
    public hasToken(): boolean {
      return !!this.token;
    }
  }