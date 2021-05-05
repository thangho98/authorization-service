export interface JwtPayload {
  sub: string; // subject
  username: string; // username
  ups: string[]; // user permissions
  roles: string[]; // user roles
  groups: string[]; // user groups
}
