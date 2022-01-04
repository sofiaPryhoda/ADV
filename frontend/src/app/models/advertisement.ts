import {User} from "./user";
import {Category} from "./category";

export class Advertisement {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  user: User | undefined
  category: Category | undefined;
  creationDate: Date | undefined;
}
