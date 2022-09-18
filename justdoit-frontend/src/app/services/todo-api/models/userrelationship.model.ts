import { User } from './user.model'
import { UserRelationshipId } from './userrelationshipid.model'

export interface UserRelationship {
  requestedAt: string;
  userRelationshipType: string;
  relatedUser: User;
  relatingUser: User;
  userRelationshipId: UserRelationshipId;
}
