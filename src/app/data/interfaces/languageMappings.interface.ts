import {Language} from "./language.type";

export type LanguageMappings = {
  [language in Language]?: { [uuid: string]: string };
};
