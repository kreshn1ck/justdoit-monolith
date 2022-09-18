import { TemplateVariable } from './templatevariable.model'

export interface UriTemplate {
  variableNames: string[];
  variables: TemplateVariable[];
}
