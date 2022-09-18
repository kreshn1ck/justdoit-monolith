import { LinkRelation } from './linkrelation.model'

export interface Link {
  deprecation: string;
  href: string;
  hreflang: string;
  media: string;
  name: string;
  profile: string;
  title: string;
  type: string;
  rel: LinkRelation;
}
