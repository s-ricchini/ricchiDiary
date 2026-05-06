export type hex = `#${string}`

export interface Category {
  id:         string;
  name:       string;
  color:      hex;
  created_at: string;
}

export interface Diary {
  id:             string;
  title:          string;
  category_name:  string | null;
  isFav: boolean
  category_color: hex | null;
  created_at:     string;
}

export interface NewDiary{
  title:string
  category_id: string | null
}

export interface Entry {
  id:         string
  parent_id:  string
  title:      string
  content:    string
  created_at: Date
  updated_at: Date
}

export type NewEntry = Pick<Entry, 'parent_id'|"title"|"content">

export type FormState =
  | { success: true }
  | { error: string }
  | null