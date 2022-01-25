// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

/**
 * 메인템플릿
 */
export type TemplateLayout = {
  id: number
  name: string
  content: any
}

/**
 * 재료
 */
export type Material = {
  id: number;
  name: string;
  amount?: number;
  unit?: string;
}

/**
 * 레시피 재료
 */
export type Recipe = {
  id: number;
  material_id: number;
  amount: number;
  unit: string;
  order: number;
  content?: string;
}