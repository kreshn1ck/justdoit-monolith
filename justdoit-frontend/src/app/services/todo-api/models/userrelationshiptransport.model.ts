import { UserTransport } from './usertransport.model'

export interface UserRelationshipTransport {
  requestedAt: string;
  userRelationshipType: string;
  relatedUser: UserTransport;
}
