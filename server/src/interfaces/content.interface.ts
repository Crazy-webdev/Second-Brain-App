import { contentTypesEnum } from '../enums/contentType';

export interface ContentDTO {
  link: string;
  type: string;
  title: string;
  tags?: string[];
}

export interface UpdateContentDTO {
  link?: string;
  type?: string;
  title?: string;
  tags?: string[];
}

interface IUser {
  _id: string;
  username: string;
}

export interface IGetContent {
  _id: string;
  link: string;
  type: contentTypesEnum;
  title: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  user: IUser;
}
